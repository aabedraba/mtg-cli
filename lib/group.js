function groupBy(data, groupOptions) {
    const collection = {}
    data.map(item => {
        group(collection, item, groupOptions)
    })
    return collection
}

function group(collection, item, groupOptions) {
    const optionsLength = groupOptions.length
    let property = ""

    for (let i = 0; i < optionsLength; i++) {
        property = item[groupOptions[i]]  
        if (!collection[property]) {
            if (i == optionsLength - 1) collection[property] = []
            else collection[property] = {}
        }
    }
    
    property = groupOptions[optionsLength - 1]
    collection[item[property]].push(item.name) 
}

function group(collection, item, groupOptions) {
    if (groupOptions.length == 1) {
        const property = item[groupOptions[0]]
        if (!collection[property]) collection[property] = []
        collection[property].push(item.name)
        return
    }

    const property = item[groupOptions[0]]
    if (!collection[property]) collection[property] = {}
    group(collection[property], item, groupOptions.slice(1, groupOptions.length))
}

module.exports = groupBy