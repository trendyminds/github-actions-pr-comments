# PR Comment Action

This is just a test message!

And here's another one to confirm we don't get duplicate PR comments!

Adds a comment to a given Pull Request

## Required arguments

| Argument        | Description                            |
|-----------------|----------------------------------------|
| `body`          | The message of your comment            |
| `github_token`  | The GitHub token of the repository     |

## Example usage

```yml
name: Say Hello

on: pull_request

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v1

      - name: Say hello in a PR comment
        uses: trendyminds/github-actions-pr-comments@master
        with:
          body: "Hello, there!"
          github_token: ${{secrets.GITHUB_TOKEN}}
```
