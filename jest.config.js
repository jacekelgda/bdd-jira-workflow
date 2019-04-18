module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: [
		'**/*.steps.ts'
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	setupFiles: [ './jest-cucumber.config' ]
}
  