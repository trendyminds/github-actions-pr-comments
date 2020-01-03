const core = require("@actions/core");
const github = require("@actions/github");

(async () => {
  try {
    const body = core.getInput("body");
    const github_token = core.getInput("github_token");
    const context = github.context;

    if (context.payload.pull_request == null) {
      core.setFailed("No pull request found.");
      return;
    }

    const pull_request_number = context.payload.pull_request.number;
    const octokit = new github.GitHub(github_token);

    const currentComments = await octokit.issues.listComments({
      ...context.repo,
      issue_number: pull_request_number
    });

    console.log(currentComments);

    currentComments.data.forEach(comment => {
      console.log(comment.user, comment.body);
    });

    octokit.issues.createComment({
      ...context.repo,
      issue_number: pull_request_number,
      body
    });
  } catch (error) {
    core.setFailed(error.message);
  }
})();
