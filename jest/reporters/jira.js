const axios = require('axios')
require('dotenv').config()

class SlackReporter {
	constructor(globalConfig, options) {
		this._globalConfig = globalConfig
		this._options = options
		this.STATUS_PASSED = 'passed'
		this.STATUS_FAILED = 'failed'
	}

	sendNotification(issues) {
		if (!process.env.JIRA_WH_45_URL) {
			return
		}

		axios.post(
			process.env.JIRA_WH_45_URL,
			{ issues },
			{
				headers: { 'Content-type': 'application/json' }
			}
		)
	}

	transformTagToIssueKey(tag) {
		return tag.replace('@','').toUpperCase()
	}

	onTestResult(test, testResult) {
		const { skipped, testResults } = testResult

		if (!skipped) {
			testResults.forEach(result => {
				if (result.status === this.STATUS_PASSED) {
					const { tag } = JSON.parse(result.title)
					const issueKey = this.transformTagToIssueKey(tag)
					this.sendNotification([issueKey])
				}
			})
		}
	}
}

module.exports = SlackReporter
