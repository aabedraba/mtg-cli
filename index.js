const fetch = require('node-fetch')

function groupBySet(data, keyGetter) {
    const map = new Map();
    data.cards.map((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

async function getUsers() {
    const data = await fetch('https://api.magicthegathering.io/v1/cards ')
        .then(res => res.json())

    // const dataNames = data.cards.map(element => element.name);

    const grouped = groupBySet('10E', card => card.set);
    console.log(grouped)
}

getUsers()