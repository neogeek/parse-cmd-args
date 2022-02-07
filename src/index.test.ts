import assert from 'assert';

import parseCmdArgs from './index';

describe('parseCmdArgs', () => {
    beforeEach(() => {
        process.argv = [];
    });

    it('parseCmdArgs with flags', () => {
        const args = parseCmdArgs([
            '-f',
            'no-reply@test.com',
            '-t',
            'no-reply@test.com',
            '-s',
            'Test email'
        ]);

        assert.deepStrictEqual(args, {
            flags: {
                '-f': 'no-reply@test.com',
                '-s': 'Test email',
                '-t': 'no-reply@test.com'
            },
            inputs: [process.cwd()]
        });
    });

    it('parseCmdArgs with flags and user input', () => {
        const args = parseCmdArgs([
            './src',
            '-f',
            'no-reply@test.com',
            '-t',
            'no-reply@test.com',
            '-s',
            'Test email'
        ]);

        assert.deepStrictEqual(args, {
            flags: {
                '-f': 'no-reply@test.com',
                '-s': 'Test email',
                '-t': 'no-reply@test.com'
            },
            inputs: ['./src']
        });
    });

    it('parseCmdArgs with flags and multiple user input', () => {
        const args = parseCmdArgs([
            './src',
            './lib',
            '-f',
            'no-reply@test.com',
            '-t',
            'no-reply@test.com',
            '-s',
            'Test email'
        ]);

        assert.deepStrictEqual(args, {
            flags: {
                '-f': 'no-reply@test.com',
                '-s': 'Test email',
                '-t': 'no-reply@test.com'
            },
            inputs: ['./src', './lib']
        });
    });

    it('parseCmdArgs with flags and non-value flags', () => {
        const args = parseCmdArgs([
            '--flag',
            '-f',
            'no-reply@test.com',
            '-t',
            'no-reply@test.com',
            '-s',
            'Test email',
            '--title'
        ]);

        assert.deepStrictEqual(args, {
            flags: {
                '--flag': true,
                '--title': true,
                '-f': 'no-reply@test.com',
                '-s': 'Test email',
                '-t': 'no-reply@test.com'
            },
            inputs: [process.cwd()]
        });
    });

    it('parseCmdArgs with help flag', () => {
        const args = parseCmdArgs(['--help']);

        assert.deepStrictEqual(args, {
            flags: {
                '--help': true
            },
            inputs: [process.cwd()]
        });
    });

    it('parseCmdArgs with version flag', () => {
        const args = parseCmdArgs(['--version']);

        assert.deepStrictEqual(args, {
            flags: {
                '--version': true
            },
            inputs: [process.cwd()]
        });
    });

    it('parseCmdArgs with no flags or user input', () => {
        const args = parseCmdArgs();

        assert.deepStrictEqual(args, {
            flags: {},
            inputs: [process.cwd()]
        });
    });

    it('parseCmdArgs with no flags or user input (requireUserInput option enabled)', () => {
        const args = parseCmdArgs([], {
            requireUserInput: true
        });

        assert.deepStrictEqual(args, {
            flags: {},
            inputs: []
        });
    });

    it('parseCmdArgs with a flag and no user input (requireUserInput option enabled)', () => {
        const args = parseCmdArgs(['--version'], {
            requireUserInput: true
        });

        assert.deepStrictEqual(args, {
            flags: {
                '--version': true
            },
            inputs: []
        });
    });

    it('parseCmdArgs with no flags and user input (requireUserInput option enabled)', () => {
        const args = parseCmdArgs(['test.js'], {
            requireUserInput: true
        });

        assert.deepStrictEqual(args, {
            flags: {},
            inputs: ['test.js']
        });
    });
});
