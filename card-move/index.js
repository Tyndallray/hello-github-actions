const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
    
      // `who-to-greet` input defined in action metadata file
      const to = core.getInput('TO_COLUMN_ID');
      const token = core.getInput('REPOSITORY_TOKEN');
      const cardId = core.getInput('CARD_ID');
      console.log(cardId, to, token);
    
      const octokit = github.getOctokit(token);
      const result = await octokit.projects.moveCard({
          card_id: Number(cardId),
          position: 'top',
          column_id: Number(to)
      });
    
      core.setOutput('response', result);
      // Get the JSON webhook payload for the event that triggered the workflow
      const payload = JSON.stringify(github.context.payload, undefined, 2)
      console.log(`The event payload: ${payload}`);
      console.log(`The github context: ${github.context}`);
    } catch (error) {
      core.setFailed(error.message);
    }
}

run()