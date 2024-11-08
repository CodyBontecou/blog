import jsonp from 'jsonp'

export function addToMailchimp(email: string) {
    const emailEncoded = encodeURIComponent(email)

    const dataCenter = 'gmail'
    const userId = 'cd437705ede047b78169e4337'
    const listId = 'c7dcc86f21'
    const endpoint = `https://${dataCenter}.us10.list-manage.com/subscribe/post?u=${userId}&amp;id=${listId}&amp;f_id=00b0bbe3f0&EMAIL=${emailEncoded}`

    const url = endpoint.replace(/\/post/g, '/post-json')

    return new Promise((resolve, reject) =>
        jsonp(url, { param: 'c', timeout: 3500 }, (err, data) => {
            if (err) {
                console.log('Request failed', err)
                reject(err)
            }
            if (data) {
                console.log('Request success', data)
                resolve(data)
            }
        })
    )
}
