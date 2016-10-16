const assert = require('assert');

const parseCmdArgs = require('../../lib/cmd');

describe('parseCmdArgs', () => {

    it('parseCmdArgs with flags', () => {

        const args = parseCmdArgs([
            '-f',
            'no-reply@test.com',
            '-t',
            'no-reply@test.com',
            '-s',
            'Test email'
        ]);

        assert.deepEqual(args, {
            'flags': {
                '-f': 'no-reply@test.com',
                '-s': 'Test email',
                '-t': 'no-reply@test.com'
            },
            'input': process.cwd()
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

        assert.deepEqual(args, {
            'flags': {
                '-f': 'no-reply@test.com',
                '-s': 'Test email',
                '-t': 'no-reply@test.com'
            },
            'input': `${process.cwd()}/src`
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

        assert.deepEqual(args, {
            'flags': {
                '-f': 'no-reply@test.com',
                '-s': 'Test email',
                '-t': 'no-reply@test.com'
            },
            'input': `${process.cwd()}/src`
        });

    });

    it('parseCmdArgs with flags and multiple user input (allowMultipleInputs option enabled)', () => {

        const args = parseCmdArgs([
            './src',
            './lib',
            '-f',
            'no-reply@test.com',
            '-t',
            'no-reply@test.com',
            '-s',
            'Test email'
        ], {
            'allowMultipleInputs': true
        });

        assert.deepEqual(args, {
            'flags': {
                '-f': 'no-reply@test.com',
                '-s': 'Test email',
                '-t': 'no-reply@test.com'
            },
            'inputs': [
                `${process.cwd()}/src`,
                `${process.cwd()}/lib`
            ]
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

        assert.deepEqual(args, {
            'flags': {
                '--flag': true,
                '--title': true,
                '-f': 'no-reply@test.com',
                '-s': 'Test email',
                '-t': 'no-reply@test.com'
            },
            'input': process.cwd()
        });

    });

    it('parseCmdArgs with help flag', () => {

        const args = parseCmdArgs([
            '--help'
        ]);

        assert.deepEqual(args, {
            'flags': {
                '--help': true
            },
            'input': process.cwd()
        });

    });

    it('parseCmdArgs with version flag', () => {

        const args = parseCmdArgs([
            '--version'
        ]);

        assert.deepEqual(args, {
            'flags': {
                '--version': true
            },
            'input': process.cwd()
        });

    });

    it('parseCmdArgs with no flags or user input', () => {

        const args = parseCmdArgs();

        assert.deepEqual(args, {
            'flags': {},
            'input': `${process.cwd()}/test/specs`
        });

    });

    it('parseCmdArgs with no flags or user input (requireUserInput option enabled)', () => {

        const args = parseCmdArgs([], {
            'requireUserInput': true
        });

        assert.deepEqual(args, {
            'flags': {},
            'input': null
        });

    });

    it('parseCmdArgs with a flag and no user input (requireUserInput option enabled)', () => {

        const args = parseCmdArgs(['--version'], {
            'requireUserInput': true
        });

        assert.deepEqual(args, {
            'flags': {
                '--version': true
            },
            'input': null
        });

    });

    it('parseCmdArgs with no flags and user input (requireUserInput option enabled)', () => {

        const args = parseCmdArgs(['test.js'], {
            'requireUserInput': true
        });

        assert.deepEqual(args, {
            'flags': {},
            'input': `${process.cwd()}/test.js`
        });

    });

});
