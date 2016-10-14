# parse-cmd-args

> Returns an object containing the path and flags parsed from process.argv

## Install

```bash
$ npm install parse-cmd-args --save
```

## Usage

```javascript
const args = require('parse-cmd-args')();

if (args.flags['--help']) {

    process.stdout.write('Usage: ');
    process.stdout.write('\n');
    process.exit();

} else if (args.flags['--version'] || args.flags['-v']) {

    process.stdout.write(`${require('../package').version}\n`);
    process.exit();

}

const output = args.flags['--output'] || args.flags['-o'] || null;

console.log(output);
```

## Documentation

View full documentation [here](DOCUMENTATION.md).
