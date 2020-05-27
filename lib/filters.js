function groupBySet(data, keyGetter) {
    const collection = {}
    data.map((item) => {
        const key = keyGetter(item)
        if (!collection[key]) {
            collection[key] = [item]
        } else {
            collection[key].push(item)
        }
    });
    return collection
}

function groupBySetAndRarity(data, setGetter, rarityGetter) {
    const collection = {}
    data.map(item => {
        const set = setGetter(item)
        const rarity = rarityGetter(item)
        if (!collection[set]) {
            collection[set] = {}
        }
        if (!collection[set][rarity]){
            collection[set][rarity] = []
        }
        collection[set][rarity].push(item)
    })
    return collection
}

module.exports = {
    groupBySet,
    groupBySetAndRarity
}