const setJestCucumberConfiguration = require('jest-cucumber').setJestCucumberConfiguration;

// run only open right now ( this means it will not run regression test)
setJestCucumberConfiguration({
  tagFilter: 'not @COMPLETED',
  scenarioNameTemplate: (vars) => {
      return JSON.stringify({ title: vars.scenarioTitle, tag: vars.scenarioTags[0] })
  }
});
