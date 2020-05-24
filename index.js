const fetch = require('isomorphic-unfetch')
const links = [
    'https://api.magicthegathering.io/v1/cards?page=1',
    'https://api.magicthegathering.io/v1/cards?page=2',
    'https://api.magicthegathering.io/v1/cards?page=3',
    ,'https://api.magicthegathering.io/v1/cards?page=4'
]

async function getData(links){
    const data = await processByChunks(links, 2)
    console.log(data)
}

async function processByChunks(items, chunkSize = 50){
    const chunks = splitToChunks(items, chunkSize)
    return await processInSeries(chunks)
}

function splitToChunks(items, chunkSize) {
    const result = []
    for (let i = 0; i < items.length; i += chunkSize) {
        result.push(items.slice(i, i + chunkSize))
    }
    return result
}

function processInSeries(items) {
    const promises = items.map(item => fetch(item).then(res => res.json()))
    return Promise.all(promises).then(data => result.push(data))
}

getData(links)