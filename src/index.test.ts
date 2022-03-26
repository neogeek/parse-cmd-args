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

        expect(args).toEqual(
            expect.objectContaining({
                flags: {
                    '-f': 'no-reply@test.com',
                    '-s': 'Test email',
                    '-t': 'no-reply@test.com'
                },
                inputs: [process.cwd()]
            })
        );
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

        expect(args).toEqual(
            expect.objectContaining({
                flags: {
                    '-f': 'no-reply@test.com',
                    '-s': 'Test email',
                    '-t': 'no-reply@test.com'
                },
                inputs: ['./src']
            })
        );
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

        expect(args).toEqual(
            expect.objectContaining({
                flags: {
                    '-f': 'no-reply@test.com',
                    '-s': 'Test email',
                    '-t': 'no-reply@test.com'
                },
                inputs: ['./src', './lib']
            })
        );
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

        expect(args).toEqual(
            expect.objectContaining({
                flags: {
                    '--flag': true,
                    '--title': true,
                    '-f': 'no-reply@test.com',
                    '-s': 'Test email',
                    '-t': 'no-reply@test.com'
                },
                inputs: [process.cwd()]
            })
        );
    });

    it('parseCmdArgs with help flag', () => {
        const args = parseCmdArgs(['--help']);

        expect(args).toEqual(
            expect.objectContaining({
                flags: {
                    '--help': true
                },
                inputs: [process.cwd()]
            })
        );
    });

    it('parseCmdArgs with version flag', () => {
        const args = parseCmdArgs(['--version']);

        expect(args).toEqual(
            expect.objectContaining({
                flags: {
                    '--version': true
                },
                inputs: [process.cwd()]
            })
        );
    });

    it('parseCmdArgs with no flags or user input', () => {
        const args = parseCmdArgs();

        expect(args).toEqual(
            expect.objectContaining({
                flags: {},
                inputs: [process.cwd()]
            })
        );
    });

    it('parseCmdArgs with no flags or user input (requireUserInput option enabled)', () => {
        const args = parseCmdArgs([], {
            requireUserInput: true
        });

        expect(args).toEqual(
            expect.objectContaining({
                flags: {},
                inputs: []
            })
        );
    });

    it('parseCmdArgs with a flag and no user input (requireUserInput option enabled)', () => {
        const args = parseCmdArgs(['--version'], {
            requireUserInput: true
        });

        expect(args).toEqual(
            expect.objectContaining({
                flags: {
                    '--version': true
                },
                inputs: []
            })
        );
    });

    it('parseCmdArgs with no flags and user input (requireUserInput option enabled)', () => {
        const args = parseCmdArgs(['test.js'], {
            requireUserInput: true
        });

        expect(args).toEqual(
            expect.objectContaining({
                flags: {},
                inputs: ['test.js']
            })
        );
    });

    it('parseCmdArgs with multiple flags with the same name', () => {
        const args = parseCmdArgs(['-c', 'key=a', '-c', 'key=b'], {
            requireUserInput: true
        });

        expect(args).toEqual(
            expect.objectContaining({
                raw: [
                    ['-c', 'key=a'],
                    ['-c', 'key=b']
                ],
                inputs: []
            })
        );
    });
});
