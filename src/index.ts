import { Flags, Options, RawFlags } from './types.js';

const PROCESS_CMD_LINE_ARGS_LENGTH = 2;
const FLAG_REGEX_PATTERN = /^-{1,2}/;

/**
 * Returns an object containing the path and flags parsed from process.argv
 *
 *     console.log(parseCmdArgs());
 *     console.log(parseCmdArgs(process.argv.slice(2)));
 *
 *     console.log(parseCmdArgs(['--version']));
 *     console.log(parseCmdArgs(['-s', 'Test email']));
 *     console.log(parseCmdArgs(['./src/', '-s', 'Test email']));
 *
 *     console.log(parseCmdArgs(null, {'requireUserInput': true}));
 *
 * @param {array?} [args] Arguments to parse through.
 * @param {object?} [options] Options object.
 * @param {boolean} [options.requireUserInput] Require user defined input through process.argv removing default of current directory.
 * @return {object} Object with keys for both the input and flags parsed out of arguments array.
 * @public
 */

const parseCmdArgs = (
  args?: string[] | null,
  options: Options = {}
): {
  flags: Flags;
  raw: RawFlags;
  inputs: string[];
} => {
  const inputs: string[] = [];

  const flags: Flags = {};

  const raw: RawFlags = [];

  if (!args) {
    args = process.argv.slice(PROCESS_CMD_LINE_ARGS_LENGTH);
  }

  while (args.length) {
    if (!args[0].match(FLAG_REGEX_PATTERN)) {
      inputs.push(args.shift() as string);
    } else if (args[0].match(FLAG_REGEX_PATTERN)) {
      const key = args.shift() as string;

      const value =
        args.length && !args[0].match(FLAG_REGEX_PATTERN)
          ? (args.shift() as string)
          : true;

      flags[key] = value;

      raw.push([key, value]);
    }
  }

  if (!inputs.length && !options.requireUserInput) {
    inputs.push(process.cwd());
  }

  return {
    flags,
    raw,
    inputs
  };
};

export default parseCmdArgs;
