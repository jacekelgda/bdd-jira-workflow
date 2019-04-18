module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	rootDir: '../',
	testMatch: [
		'**/*.steps.ts'
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	setupFiles: [ './jest/jest-cucumber.config' ]
}
