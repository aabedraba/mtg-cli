const fetch = require('isomorphic-unfetch')

function fetcher(url) {
    return fetch(url)
            .then(res => res.json())
}


function splitToChunks(items, chunkSize) {
    const result = []
    for (let i = 0; i < items.length; i += chunkSize) {
        result.push(items.slice(i, i + chunkSize))
    }
    return result
}

module.exports = {
    fetcher,
    splitToChunks
}