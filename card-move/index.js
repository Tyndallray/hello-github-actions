const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const from = core.getInput('FROM_COLUMN_ID');
  const to = core.getInput('TO_COLUMN_ID');
  const token = core.getInput('REPOSITORY_TOKEN');
  
  core.setOutput('message', 'Success');
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  console.log(`The github context: ${github.context}`);
} catch (error) {
  core.setFailed(error.message);
}