let button = document.getElementById("loginButton");
// console.log(browser.identity.getRedirectURL());
button.addEventListener("click", () => {
    if (browser.storage.local.get('authCode')) {
        console.log("already got token");
        return;
    }
    browser.identity.launchWebAuthFlow({
        url: 'https://anilist.co/api/v2/oauth/authorize?client_id=9749&response_type=token',
        interactive: true
    })
    .then(urlReturned => {
        const urlParams = URLSearchParams(urlReturned);
        if (urlParams.has('access_token')) {
            browser.storage.local.set({ authCode: urlParams.get('access_token') })
            .then(() => { console.log("auth code set" )})
            .catch(err => { console.log(`error setting auth code in storage: ${err}`) });
        } else {
            console.log('error getting auth code');
        }
    })
    .catch(err => {
        console.log("error in login call");
    });
});