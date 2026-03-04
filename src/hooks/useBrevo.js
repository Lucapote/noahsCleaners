import { useState } from 'react';

const BREVO_API_URL = 'https://api.brevo.com/v3/contacts';

export function useBrevo(apiKey) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const submitContact = async (contactData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const payload = {
                email: contactData.email,
                updateEnabled: true,
                attributes: {
                    FULL_NAME: contactData.fullName || "",
                    SMS: contactData.sms || "",
                    PROPERTY_TYPE: contactData.propertyType || "",
                    VENTS_AMOUNT: contactData.ventsAmount || "",
                    LAST_CLEAN: contactData.lastClean || "",
                    ZIP_CODE: contactData.zipCode ? parseInt(contactData.zipCode, 10) : 0,
                    ISSUES: contactData.issues ? contactData.issues.join(', ') : ""
                }
            };

            const response = await fetch(BREVO_API_URL, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'api-key': apiKey
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Brevo API Error:', errorData);
                throw new Error(errorData.message || 'Error submitting to Brevo');
            }

            return { success: true };
        } catch (error) {
            console.error('useBrevo Error:', error);
            setSubmitError(error.message);
            return { success: false, error: error.message };
        } finally {
            setIsSubmitting(false);
        }
    };

    return { submitContact, isSubmitting, submitError, setSubmitError };
}
