# mtg-cli
Little CLI app to fetch data from  https://api.magicthegathering.io/v1/cards with filtering and grouping.

## Installation
You need NPM and Node installed. 

```sh
npm -g install  mtg-cli
```

To uninstall delete the folder `mtg-cli` from your home directory and execute
```sh
npm -g uninstall mtg-cli
```

## Use

To group in order
```sh
mtg-cli --group set rarity
```

To filter by properties
```sh
mtg-cli --filter colors=Red,Blue
```

Data is cached in first use, but if you need to udpate it use
```sh
mtg-cli --update
```

