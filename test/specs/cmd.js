const assert = require('assert');

const parseCmdArgs = require('../../lib/cmd');

describe('parseCmdArgs', () => {

    it('parseCmdArgs with all valid arguments', () => {

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

    it('parseCmdArgs with all valid arguments and directory', () => {

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

    it('parseCmdArgs with both valid and invalid arguments', () => {

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

    it('parseCmdArgs with no arguments', () => {

        const args = parseCmdArgs();

        assert.deepEqual(args, {
            'flags': {},
            'input': `${process.cwd()}/test/specs`
        });

    });

});
