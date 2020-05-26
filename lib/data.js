const fetch = require('isomorphic-unfetch')
const {splitToChunks, fetcher} = require('./helpers')

async function processByChunks(items, chunkSize = 50) {
    const chunks = splitToChunks(items, chunkSize)
    const result = []
    for (let i = 0; i < chunks.length; i++) {
        const urls = chunks[i].map(url => fetcher(url).then(data => (data.cards)))
        await Promise.all(urls)
                .then(res => result.push(...res))
                .catch(err => console.error('Error fetching pages chunk. ' + err))
    }

    return result
}

async function getData(url) {
    console.log('Fetchind API info...')
    const res = await fetch(url, { method: 'HEAD' })
                        .catch(err => console.error('Error fetching data HEAD parameter. ' + err))

    const elementsByPage = res.headers.get('page-size')
    const totalElements = res.headers.get('total-count')
    const totalPagesToFetch = Math.ceil(totalElements / elementsByPage)
    console.log('Done.\n')

    const urls = []
    for (let i = 0; i < totalPagesToFetch; i++)
        urls.push(url + `?page=${i}`)

    console.log('Fetching data...')
    const data = processByChunks(urls, 50)
    
    // return flattened/merged array
    return [].concat.apply([], await data)
}

module.exports = {
    getData,
}