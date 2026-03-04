export const handler = async (event) => {
    // Solo permitir solicitudes POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    // Usar la lista con ID 5 según lo requerido por el usuario
    const listId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID, 10) : 5;

    if (!brevoApiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Brevo API Key not configured' }),
        };
    }

    try {
        const data = JSON.parse(event.body);

        // Brevo requires strict international format. Dummy numbers (e.g., "12345") will be hard-rejected by Brevo.
        let rawPhone = data.sms ? data.sms.trim() : '';
        let formattedPhone = '';
        if (rawPhone) {
            const numericPhone = rawPhone.replace(/\D/g, '');
            if (numericPhone) {
                if (rawPhone.startsWith('+')) {
                    formattedPhone = '+' + numericPhone;
                } else if (numericPhone.length === 10) {
                    formattedPhone = '+1' + numericPhone; // Assume US/Canada
                } else if (numericPhone.length > 10 && numericPhone.startsWith('1')) {
                    formattedPhone = '+' + numericPhone;
                } else {
                    formattedPhone = '+' + numericPhone;
                }
            }
        }

        // Mapear los datos al formato que espera Brevo
        const payload = {
            email: data.email,
            listIds: [listId],
            updateEnabled: true,
            attributes: {
                FULL_NAME: data.fullName || '',
                PROPERTY_TYPE: data.propertyType || '',
                VENTS_AMOUNT: data.ventsAmount || '',
                LAST_CLEAN: data.lastClean || '',
                ZIP_CODE: data.zipCode ? parseInt(data.zipCode, 10) : 0,
                ISSUES: data.issues ? data.issues.join(', ') : '',
            },
        };

        if (formattedPhone) {
            payload.attributes.SMS = formattedPhone;
        }

        console.log("Payload sent to Brevo:", JSON.stringify(payload));

        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': brevoApiKey,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Error from Brevo API:', errorData);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Failed to submit contact to Brevo', details: errorData }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Contact successfully added to Brevo list' }),
        };
    } catch (error) {
        console.error('Server error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error', message: error.message }),
        };
    }
};
