browser.runtime.onMessage.addListener(update);
async function update(message) {
    const getIdAndEps = await request({
        body: {
            query: `
                query ($search: String) {
                    Media (search: $search, type: ANIME) {
                        id
                        episodes
                    }
                }
            `,
            variables: {
                search: message.title,
            },
        },
    });
    const unpackedIdAndEps = getIdAndEps["data"]["Media"];
    // const applyUpdate = await request({ 
    //     headers: { "Authorization": "Bearer " + await browser.storage.local.get("authCode") },
    // })
}

async function request({ url = "https://graphql.anilist.co", method = "POST", headers = {}, body }) {
    const options = {
        method,
        headers: {
            ...headers,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(body),
    };
    try {
        const res = await fetch(url, options);
        return await res.json();
    } catch (error) {
        console.log(`error: ${error}`)
    }
}