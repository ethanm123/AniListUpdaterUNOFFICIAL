function matchTitle(title) {
    const titleArray = title.split(" ");
    return titleArray.slice(1, titleArray.length - 7).join(" ");
}

function getEpisode(url) {
    return url.substring(url.lastIndexOf("/") + 4, url.length);
}

browser.runtime.sendMessage({ "title": matchTitle(document.title), "episode": getEpisode(window.location.href) });
