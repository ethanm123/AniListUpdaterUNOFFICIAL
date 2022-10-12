let button = document.getElementById("loginButton");

async function getAccessToken() {
    const urlReturned = await browser.identity.launchWebAuthFlow({
        url: 'https://anilist.co/api/v2/oauth/authorize?client_id=9749&response_type=token',
        interactive: true
    });
    let hash = new URL(urlReturned).hash;
    hash = hash.slice(14, hash.length - 38);
    await browser.storage.local.set({ access_token: hash });
}

button.addEventListener("click", async () => {
    try {
        const token = await browser.storage.local.get("access_token")
        if (token["access_token"]) {
            console.log(`already got token`);
            return;
        }
        getAccessToken()
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});
