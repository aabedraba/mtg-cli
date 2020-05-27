// const fs = require('fs')
// fs.readFile('response.js', (err, data) => {
//     if (err)
//         throw console.err(err)

//     const info = data
//     console.log(info)
// })

// const fs = require('fs')
// const { getData } = require('./lib/data')
// 
// getData('https://api.magicthegathering.io/v1/cards').then(res => {
//     fs.appendFile('./response.json', JSON.stringify(res), function (err) {
//         if (err) throw err;
//         console.log('Saved!');
//     });
// })

const fs = require('fs')
const { groupBySet, groupBySetAndRarity } = require('./lib/filters')

fs.readFile('./response.json', 'utf-8', (err, res) => {
    if (err) console.error('Error reading response file. ' + err)
    const data = JSON.parse(res)
    console.log(data.length)
    
    const groupedBySet = groupBySet(data, card => card.set)
    console.log(Object.keys(groupedBySet).length)
    fs.writeFile('./groupedBySet.json', JSON.stringify(groupedBySet), (err) => {
        if (err) console.error('Error writing grouped set. ' + err)
        console.log('Grouped set added to file groupedBySet.json')
    })

    const groupedBySetAndRarity = groupBySetAndRarity(data, card => card.set, card => card.rarity)
    console.log(Object.keys(groupedBySetAndRarity).length)
    fs.writeFile('./setAndRarity.json', JSON.stringify(groupedBySetAndRarity), (err) => {
        if (err) console.error('Error writing grouperd set and rarity. ', err)
        console.log('Grouped set and rarity added to file groupedBySetAndRarity.json ')
    })
})

