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
            // Brevo ahora usa todos tus atributos personalizados como "Texto"
            // Por ende, ya no tenemos que pelearnos con el validador estricto del campo reservado `SMS` de Brevo.
            const attributes = {
                FULL_NAME: contactData.fullName || "",
                PHONE_NUMBER: contactData.sms || "", // Usamos tu atributo TEXTO en lugar del SMS oficial
                PROPERTY_TYPE: contactData.propertyType || "",
                VENTS_AMOUNT: contactData.ventsAmount || "",
                LAST_CLEAN: contactData.lastClean || "",
                ZIP_CODE: contactData.zipCode || "", // Ahora es de tipo texto, nada de parseInt()
                ISSUES: contactData.issues ? contactData.issues.join(', ') : ""
            };

            const bodyPayload = {
                email: contactData.email,
                attributes: attributes,
                listIds: [5],
                updateEnabled: true
            };

            const response = await fetch('https://api.brevo.com/v3/contacts', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Api-Key': import.meta.env.VITE_BREVO_API_KEY
                },
                body: JSON.stringify(bodyPayload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
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
