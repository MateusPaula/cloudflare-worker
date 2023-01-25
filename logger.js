
export async function postError(data){
    // send to sentry for example
    return fetch('mysentry.server.com', {
        method: 'POST',
        body: data
    })
}