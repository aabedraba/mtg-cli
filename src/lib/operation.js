function filter(operation, arguments, data) {
  if (operation == '--group') {
    console.log('Grouping, in order, by:', arguments.join(', '))
    const collection = {}
    data.map((item) => {
      groupBy(collection, item, arguments)
    })
    return collection
  } else if (operation == '--filter') {
    console.log('Filtering by:', arguments)
    return filterBy(data, arguments)
  }
}

function groupBy(collection, item, groupOptions) {
  if (groupOptions.length == 1) {
    const property = item[groupOptions[0]]
    if (!collection[property]) collection[property] = []
    collection[property].push(item.name)
    return
  }

  const property = item[groupOptions[0]]
  if (!collection[property]) collection[property] = {}
  groupBy(
    collection[property],
    item,
    groupOptions.slice(1, groupOptions.length)
  )
}

function filterBy(data, filterOptions) {
  const options = []
  for (let i = 0; i < filterOptions.length; i++) {
    const property = filterOptions[i].split('=')[0]
    const value = filterOptions[i].split('=')[1].split(',')
    options.push({ property, value })
  }

  return data.filter((card) => {
    return options.every((op) => {
      if (!Array.isArray(card[op.property]))
        card[op.property] = [card[op.property]]

      return op.value.every((val) => card[op.property].includes(val))
    })
  })
}

module.exports = filter
