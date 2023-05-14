module.exports = {
    rootDir: './tests',
    verbose: true,
    reporters: ['default', 'jest-stare'],
    testResultsProcessor: '../node_modules/jest-stare',
    coverageDirectory: '../test_coverage/',
    coverageReporters: ['html', 'text'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
}
