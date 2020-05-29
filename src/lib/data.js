const fetch = require('isomorphic-unfetch')

function fetcher(url) {
  return fetch(url).then((res) => res.json())
}

function splitToChunks(items, chunkSize) {
  const result = []
  for (let i = 0; i < items.length; i += chunkSize) {
    result.push(items.slice(i, i + chunkSize))
  }
  return result
}

// Create fetch requests and process in parallel by chunks
async function processByChunks(items, chunkSize = 50) {
  const chunks = splitToChunks(items, chunkSize)
  const result = []
  for (let i = 0; i < chunks.length; i++) {
    const urls = chunks[i].map((url) => fetcher(url).then((data) => data.cards))
    await Promise.all(urls)
      .then((res) => result.push(...res))
      .catch((err) => console.error('Error fetching pages chunk. ' + err))
  }

  return result
}

async function getData(url) {
  console.log(
    'Caching data.',
    '\nTo update cards data from API use mtg-cli --update'
  )
  console.log('\x1b[2m', 'Fetchind API info...')
  const res = await fetch(url, { method: 'HEAD' }).catch((err) => {
    throw 'Error fetching data HEAD parameter. ' + err
  })

  // Check number of elements to fetch
  const elementsByPage = res.headers.get('page-size')
  const totalElements = res.headers.get('total-count')
  const totalPagesToFetch = Math.ceil(totalElements / elementsByPage)
  console.log('\x1b[2m', 'Done.')

  const urls = []
  for (let i = 0; i < totalPagesToFetch; i++) urls.push(url + `?page=${i}`)

  console.log(
    '\x1b[2m',
    'Fetching data. This might take a while (~2 minutes)...'
  )
  const data = processByChunks(urls, 50)

  // return flattened/merged array
  return [].concat.apply([], await data)
}

module.exports = getData
