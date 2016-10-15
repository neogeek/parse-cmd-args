'use strict';

const path = require('path');

const PROCESS_CMD_LINE_ARGS_LENGTH = 2;
const FLAG_REGEX_PATTERN = /^-{1,2}/;

/**
 * Returns an object containing the path and flags parsed from process.argv
 *
 *     console.log(parseCmdArgs());
 *     console.log(parseCmdArgs(['--version']));
 *     console.log(parseCmdArgs(['-s', 'Test email']));
 *     console.log(parseCmdArgs(['./src/', '-s', 'Test email']));
 *
 * @param {Array} [args] Arguments to parse through.
 * @param {Object} [options] Options object.
 * @param {Object} [options.requireUserInput] Require user defined input through process.argv removing default of current directory.
 * @return {Object} Object with keys for both the input and flags parsed out of arguments array.
 * @public
 */

const parseCmdArgs = (args, options) => {

    let input = null;

    if (!options) {

        options = {};

    }

    if (!options.requireUserInput) {

        input = process.cwd();

    }

    const flags = {};

    let key = null;
    let value = null;

    if (!args) {

        args = process.argv.slice(PROCESS_CMD_LINE_ARGS_LENGTH);

    }

    if (args.length && !args[0].match(FLAG_REGEX_PATTERN)) {

        input = path.resolve(args.shift());

    }

    while (args.length) {

        if (args.length && args[0].match(FLAG_REGEX_PATTERN)) {

            key = args.shift();

        }

        if (args.length && !args[0].match(FLAG_REGEX_PATTERN)) {

            value = args.shift();

        } else {

            value = true;

        }

        flags[key] = value;

    }

    return {
        flags,
        input
    };

};

module.exports = parseCmdArgs;
