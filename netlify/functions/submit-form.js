export const handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body);
        const { email, sms, fullName, propertyType, ventsAmount, lastClean, zipCode, issues } = body;

        const BREVO_API_KEY = process.env.BREVO_API_KEY;

        if (!BREVO_API_KEY) {
            console.error('Missing BREVO_API_KEY in environment variables.');
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Server Configuration Error' })
            };
        }

        const payload = {
            email: email,
            updateEnabled: true,
            attributes: {
                FULL_NAME: fullName || "",
                SMS: sms || "",
                PROPERTY_TYPE: propertyType || "",
                VENTS_AMOUNT: ventsAmount || "",
                LAST_CLEAN: lastClean || "",
                ZIP_CODE: zipCode ? parseInt(zipCode, 10) : 0,
                ISSUES: issues ? issues.join(', ') : ""
            }
        };

        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'api-key': BREVO_API_KEY
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error('Brevo API Error:', data);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data.message || 'Failed to submit contact to CRM.' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        console.error('Netlify Function Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
