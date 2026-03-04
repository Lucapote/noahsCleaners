import { useState } from "react";

export const useBrevo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const formatPhoneNumber = (phone) => {
        if (!phone) return "";
        const cleanPhone = phone.replace(/\D/g, '');

        if (cleanPhone.startsWith('1')) {
            return `+${cleanPhone}`;
        }

        if (cleanPhone.length === 10) {
            return `+1${cleanPhone}`;
        }

        if (phone.startsWith('+')) {
            return phone;
        }

        return `+1${cleanPhone}`;
    };

    const submitContact = async (contactData) => {
        setIsLoading(true);
        setMessage("");
        setIsSuccess(false);

        try {
            const formattedPhone = formatPhoneNumber(contactData.sms);

            const attributes = {
                FULL_NAME: contactData.fullName || "",
                PROPERTY_TYPE: contactData.propertyType || "",
                VENTS_AMOUNT: contactData.ventsAmount || "",
                LAST_CLEAN: contactData.lastClean || "",
                ZIP_CODE: contactData.zipCode ? parseInt(contactData.zipCode, 10) || 0 : 0,
                ISSUES: contactData.issues ? contactData.issues.join(', ') : ""
            };

            if (formattedPhone && formattedPhone.length > 5) {
                attributes.SMS = formattedPhone;
            }

            const bodyPayload = {
                email: contactData.email,
                attributes: attributes,
                listIds: [5],
                updateEnabled: true
            };

            let response = await fetch('https://api.brevo.com/v3/contacts', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Api-Key': import.meta.env.VITE_BREVO_API_KEY
                },
                body: JSON.stringify(bodyPayload)
            });

            if (!response.ok) {
                let errorData = await response.json().catch(() => ({}));

                // Si Brevo rechaza específicamente el teléfono (por ser falso en las pruebas o malformado),
                // reintentamos inmediatamente sin el teléfono para no perder al cliente.
                if (errorData.code === 'invalid_parameter' && errorData.message?.toLowerCase().includes('phone')) {
                    console.warn("Retrying without SMS due to strict validation: ", errorData.message);
                    delete bodyPayload.attributes.SMS;

                    response = await fetch('https://api.brevo.com/v3/contacts', {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Api-Key': import.meta.env.VITE_BREVO_API_KEY
                        },
                        body: JSON.stringify(bodyPayload)
                    });

                    if (!response.ok) {
                        errorData = await response.json().catch(() => ({}));
                    }
                }

                // Si incluso después del reintento falló, devolvemos el error al usuario
                if (!response.ok) {
                    console.error("Error de Brevo definitivo", errorData);

                    if (errorData.code === 'invalid_parameter' && errorData.message?.includes('phone')) {
                        setMessage("El número de teléfono no es válido.");
                    } else if (errorData.code === 'duplicate_parameter') {
                        setMessage("Este correo ya ha sido registrado recientemente.");
                    } else {
                        setMessage("Hubo un error al enviar el formulario. Intenta de nuevo.");
                    }
                    setIsSuccess(false);
                    return { success: false, error: errorData };
                }
            }

            setIsSuccess(true);
            return { success: true };
        } catch (error) {
            console.error("Error de conexión: ", error);
            setMessage("Error de conexión. Verifica tu internet e intenta nuevamente.");
            setIsSuccess(false);
            return { success: false, error };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        message,
        isSuccess,
        submitContact
    };
};
