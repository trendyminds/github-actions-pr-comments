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

    // Get all the comments from the issue
    const currentComments = await octokit.issues.listComments({
      ...context.repo,
      issue_number: pull_request_number
    });

    // Check if this comment had already been posted
    const botComments = currentComments.data.filter(
      comment => comment.type === "Bot" && comment.body === body
    );

    if (botComments.length > 0) {
      console.log(
        "This comment has already been posted by our bot. Skipping this process."
      );
    }

    // If this comment has not been made then add it
    if (botComments.length === 0) {
      octokit.issues.createComment({
        ...context.repo,
        issue_number: pull_request_number,
        body
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
