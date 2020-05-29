const fs = require('fs')
const filter = require('./operation')

// user home dir, agnostic to platform
const homedir = require('os').homedir()
const configDirPath = homedir + '/mtg-cli'
const cachePath = configDirPath + '/cards_cache.json'

// TODO: use fs.stats
function cacheExists() {
  return fs.existsSync(cachePath)
}

function saveData(data) {
  if (!fs.existsSync(configDirPath)) fs.mkdirSync(configDirPath)

  console.log('\x1b[2m', 'Done. Savind data...')
  fs.writeFileSync(cachePath, data, (error) => {
    if (err) {
      console.error("Can't write data. ", error)
      return
    }
  })
}

function executeOperation(option, arguments) {
  fs.readFile(cachePath, 'utf-8', (err, res) => {
    if (err) {
      throw ('Error reading response file. ', err)
    }

    const data = JSON.parse(res)
    const result = filter(option, arguments, data)
    const filePath = './mtg-grouped.json'
    fs.writeFile(filePath, JSON.stringify(result), (err) => {
      if (err) {
        console.error('Error writing results into file. ', err)
        return
      }
      console.log('Results in file ', filePath)
    })
  })
}

module.exports = {
  saveData,
  executeOperation,
  cacheExists,
}
