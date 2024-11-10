import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event)
    const { email } = body

    if (!email) {
        throw createError({
            statusCode: 400,
            message: 'Email is required',
        })
    }

    try {
        const config = useRuntimeConfig()
        const AUDIENCE_ID = config.mailchimpAudienceId
        const API_KEY = config.mailchimpApiKey
        const DATACENTER = config.mailchimpApiServer

        const data = {
            email_address: email,
            status: 'subscribed',
        }

        const response = await fetch(
            `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    Authorization: `apikey ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        if (!response.ok) {
            throw createError({
                statusCode: 400,
                message:
                    "There was an error subscribing to the newsletter. Hit me up peter@peterlunch.com and I'll add you the old fashioned way :(.",
            })
        }

        return { error: '' }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: error.message || 'An unexpected error occurred',
        })
    }
})
