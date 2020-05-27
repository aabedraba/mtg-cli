#!/usr/bin/env node

const option = process.argv[2]
const arguments = process.argv.slice(3, process.argv.length)
const argsLength = process.argv.length

const fileHandle = require('./lib/fileHandle')
const getData = require('./lib/data')

if (argsLength == 2) {
    console.log('Need options to execute. Check the help docs with \'mtg-cli\ -h\'')
    return
}
else if (option != '--filter' && option != '--group'){
    console.log('Unrecognized options. Check the help docs with \'mtg-cli\ -h\'')
    return
}
    
else if (arguments.length == 0) {
    console.log('Option ' + option + ' needs at least one argument.')
    return
}

// TODO: handle exceptions
if (!fileHandle.cacheExists) {
    getData('https://api.magicthegathering.io/v1/cards')
        .then((data) => {
            fileHandle.saveData(JSON.stringify(data))
        })
        .then(() => {
            fileHandle.executeOperation(option, arguments)
        })
} 
else {
    fileHandle.executeOperation(option, arguments)
}
