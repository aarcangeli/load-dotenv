# load-dotenv

This action allows reding environment variables from a `.env` file.

[![build-test](https://github.com/aarcangeli/load-dotenv/actions/workflows/test.yml/badge.svg?branch=main&event=push)](https://github.com/aarcangeli/load-dotenv/actions/workflows/test.yml?query=branch%3Amain)

## Usage

<!-- start usage -->
```yaml
- uses: aarcangeli/load-dotenv@v3
  with:
    # The directory to find the '.env' file.
    # Relative paths are resolved inside the workspace directory
    # Default: .
    path: ''

    # Override the name of the file to load. Multiple files are allowed.
    # Default: .env
    filenames: ''

    # If true, don't print variables to log
    # Default: false
    quiet: ''

    # The desired behavior if the .env is not found using the provided path. Available
    # Options:
    #  warn: Output a warning but do not fail the action
    #  error: Fail the action with an error message
    #  ignore: Do not output any warnings or errors, the action does not fail
    # Default: error
    if-file-not-found: ''
```
<!-- end usage -->

## Examples

```yaml
- uses: aarcangeli/load-dotenv@v3
  with:
    path: 'backend/new'
    filenames:
      .env
      .env.test
    quiet: false
    if-file-not-found: error
```

## Contribution

```shell
# Get source code
git clone git@github.com:aarcangeli/load-dotenv.git && cd load-dotenv
# Install dependencies
npm install
# Always before a commit
npm run package
```
