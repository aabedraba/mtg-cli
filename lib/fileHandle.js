const fs = require('fs')
const filter = require('./operation')

const homedir = require('os').homedir()
const configDirPath = homedir + '/mtg-cli'
const cachePath = configDirPath + '/cards_cache.json'

function cacheExists() {
    return fs.existsSync(cachePath)
}

function saveData(data) {
    if (!fs.existsSync(configDirPath))
        fs.mkdirSync(configDirPath)
    fs.writeFileSync(cachePath, data, (error) => {
        if (error) {
            throw 'Can\'t write data. ' + error
        }

        console.log('Cards data cached for immediate use. Retrieval update will occur when executed in 1 hour.')
    })
}

function executeOperation(option, arguments) {
    fs.readFile(cachePath, 'utf-8', (err, res) => {
        if (err) {
            throw 'Error reading response file. ', err
        }

        const data = JSON.parse(res)
        const result = filter(option, arguments, data)
        const filePath = './mtg-grouped.json'
        fs.writeFile(filePath, JSON.stringify(result), err => {
            if (err) console.error('Error writing results into file. ', err)
            console.log('Results in file ', filePath)
        })
    })
}

module.exports = {
    saveData,
    executeOperation,
    cacheExists
}
