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
let data
fs.readFile('./response.json', 'utf-8', (err, res) => {
    if (err) console.error('Error reading response file. ' + err)
    data = JSON.parse(res)
    console.log(data[0])
})
