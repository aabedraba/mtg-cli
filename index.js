const fs = require('fs')
const groupBy = require('./lib/group')

fs.readFile('./response.json', 'utf-8', (err, res) => {
    if (err) console.error('Error reading response file. ' + err)
    const data = JSON.parse(res)
    console.log(data.length)
    
    // if (groupRarity) console.log("Grouping by set and rarity")
    // else console.log("Grouping by set.")

    const groupOptions = ["set", "rarity", "name"] 
    const filtered = groupBy(data, groupOptions)
    const filePath = './newFiltered.json'
    fs.writeFile(filePath, JSON.stringify(filtered), err => {
        if (err) console.error('Error writing results into file. ', err)
        console.log('Results in file ', filePath)
    })
}) 

