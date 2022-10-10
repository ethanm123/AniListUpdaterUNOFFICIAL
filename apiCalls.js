function getData(message) {
    const variables = {
        search: message.title
    };

    const findIDAndEpisodes = `
        query ($search: String) {
            Media (search: $search, type: ANIME) {
                id
                episodes
            }
        }
    `;

    let url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: findIDAndEpisodes,
                variables: variables
            })
        };

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json.data.Media: Promise.reject(json);
        });
    }

    function handleData (data) {
        console.log(data);
    }

    function handleError(error) {
        console.log("error in console");
        console.log(error);
    }

    fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError); 
}

browser.runtime.onMessage.addListener(getData);
