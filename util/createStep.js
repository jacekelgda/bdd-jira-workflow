const fs = require('fs')
// import { argv as args } from 'yargs'

// const exportModules = ({ directory }) => {
//     const MAIN_EXPORT_FILENAME = 'index.js'
//     const files = fs.readdirSync(directory)
//     const exportModules = files
//         .filter(name => name !== MAIN_EXPORT_FILENAME)
//         .map(name => name.split('.').slice(0, -1).join('.'))
//         .map(name => `exports.${name} = require('./${name}')`)
//         .join().replace(/,/g, '\n')



const listFeatures = (dirname) => {
	const dirents = fs.readdirSync(dirname, { withFileTypes: true })
	return dirents
		.filter(dirent => !dirent.isDirectory())
		.map(dirent => dirent.name)
}

const getMissingSteps = () => {
	const featureFiles = listFeatures('./features')
	const stepFiles = listFeatures('./features/steps')

	const missing = []

	featureFiles.forEach(feature => {
		const stepName = feature.replace('.feature', '.steps.ts')
		if (!stepFiles.includes(stepName)) {
			missing.push({ stepName, feature})
		}
	})

	return missing
}

const getStepTemplate = (feature) => `import { defineFeature, loadFeature } from 'jest-cucumber'
\nconst feature = loadFeature('./features/${feature}')
\ndefineFeature(feature, test => {})\n`

const writeStepFile = (directory) => {
	const missingSteps = getMissingSteps()

	if (Array.isArray(missingSteps) && missingSteps.length < 1) {
		return null
	}

	const { stepName, feature} = missingSteps[0]
	fs.writeFile(
		`${directory}${stepName}`,
		getStepTemplate(feature),
		err => {
			if (err) {
				throw err
			}
		}
	)
}

writeStepFile('./features/steps/')