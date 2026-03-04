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

            // Mapear exactamente las keys de la imagen provista
            const bodyPayload = {
                email: contactData.email,
                attributes: {
                    FULL_NAME: contactData.fullName || "",
                    SMS: formattedPhone,
                    PROPERTY_TYPE: contactData.propertyType || "",
                    VENTS_AMOUNT: contactData.ventsAmount || "",
                    LAST_CLEAN: contactData.lastClean || "",
                    ZIP_CODE: contactData.zipCode ? parseInt(contactData.zipCode, 10) : 0,
                    ISSUES: contactData.issues ? contactData.issues.join(', ') : ""
                },
                listIds: [BREVO_LIST_ID],
                updateEnabled: true
            };

            const response = await fetch('https://api.brevo.com/v3/contacts', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Api-Key': BREVO_API_KEY
                },
                body: JSON.stringify(bodyPayload)
            });

            if (response.ok) {
                setIsSuccess(true);
                return { success: true };
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error("Error de Brevo", errorData);

                if (errorData.code === 'invalid_parameter' && errorData.message?.includes('phone')) {
                    setMessage("El número de teléfono no es válido. Por favor, revisa que esté correcto.");
                } else {
                    setMessage("Hubo un error al enviar el formulario. Por favor, intenta de nuevo.");
                }
                setIsSuccess(false);
                return { success: false, error: errorData };
            }
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
