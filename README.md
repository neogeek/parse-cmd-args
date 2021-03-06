# parse-cmd-args

> Returns an object containing the path and flags parsed from process.argv

[![Build Status](https://travis-ci.org/neogeek/parse-cmd-args.svg?branch=master)](https://travis-ci.org/neogeek/parse-cmd-args)
[![codecov](https://img.shields.io/codecov/c/github/neogeek/parse-cmd-args/master.svg)](https://codecov.io/gh/neogeek/parse-cmd-args)
[![Known Vulnerabilities](https://snyk.io/test/npm/parse-cmd-args/badge.svg)](https://snyk.io/test/npm/parse-cmd-args)
[![NPM Version](http://img.shields.io/npm/v/parse-cmd-args.svg?style=flat)](https://www.npmjs.org/package/parse-cmd-args)
[![Latest Documentation](https://doxdox.org/images/badge-flat.svg)](https://doxdox.org/neogeek/parse-cmd-args)

## Install

```bash
$ npm install parse-cmd-args --save
```

## Usage

```javascript
const args = require('parse-cmd-args')();

if (args.flags['--version'] || args.flags['-v']) {
    process.stdout.write(`${require('../package').version}\n`);
    process.exit();
} else if (args.flags['--help'] || args.flags['-h']) {
    process.stdout.write('Usage: \n');
    process.exit();
}

const output = args.flags['--output'] || args.flags['-o'] || null;

console.log(output);
```

## Documentation

View full documentation [here](https://doxdox.org/neogeek/parse-cmd-args).
