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
    let access_token = await browser.storage.local.get("access_token");
    access_token = access_token["access_token"]
    const applyUpdate = await request({ 
        headers: { "Authorization": "Bearer " +  access_token},
        body: {
            query: `
            mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
                SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
                    id
                    status
                    progress
                }
            }`,
            variables: {
                mediaId: unpackedIdAndEps["id"],
                status: ((unpackedIdAndEps["episodes"] != null && unpackedIdAndEps["episodes"] == message["episode"]) ? "COMPLETED" : "CURRENT"),
                progress: message["episode"]
            }
        }
    });
    console.log(applyUpdate);
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