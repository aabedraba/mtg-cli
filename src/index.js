#!/usr/bin/env node

const option = process.argv[2]
const commandArguments = process.argv.slice(3, process.argv.length)
const argsLength = process.argv.length

const fileHandle = require('./lib/fileHandle')
const getData = require('./lib/data')

const options = ['-h', '--group', '--filter', '--update']

if (argsLength == 2) {
  console.log("Need options to execute. Check the help docs with 'mtg-cli -h'")
  return
}

if (!options.includes(option)) {
  console.log("Unrecognized options. Check the help docs with 'mtg-cli -h'")
  return
}

if (option == '-h') {
  console.log(
    'Use: ',
    '\n mtg-cli --group [properties] (groups in order)',
    '\n mtg-cli --filer [property=values]',
    '\n \nExample of use: ',
    '\n mtg-cli --group set rarity name',
    '\n mtg-cli --filter types=Creature subtypes=Human,Creature set=KTK colors=Red,Blue'
  )
  return
}

if (option == '--update') {
  getData('https://api.magicthegathering.io/v1/cards').then((data) => {
    fileHandle.saveData(JSON.stringify(data))
    console.log('\x1b[2m', 'Data cached.')
  })
  return
}

if (commandArguments == 0) {
  console.log('Option ' + option + ' needs at least one argument.')
  return
}

try {
  if (!fileHandle.cacheExists()) {
    getData('https://api.magicthegathering.io/v1/cards')
      .then((data) => {
        fileHandle.saveData(JSON.stringify(data))
        console.log('\x1b[2m', 'Data cached.')
      })
      .then(() => {
        console.log('\x1b[0m') // Reset color to cli messages
        fileHandle.executeOperation(option, commandArguments)
      })
  } else {
    console.log('Using cached data.')
    fileHandle.executeOperation(option, commandArguments)
  }
} catch (err) {
  console.error(err)
}
