# load-dotenv

This action allows reading environment variables from a `.env` file.

[![build-test](https://github.com/aarcangeli/load-dotenv/actions/workflows/test.yml/badge.svg?branch=main&event=push)](https://github.com/aarcangeli/load-dotenv/actions/workflows/test.yml?query=branch%3Amain)

## Usage

<!-- start usage -->
```yaml
- uses: aarcangeli/load-dotenv@v1.0.0
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

## Example

```yaml
- name: Load .env file
  uses: aarcangeli/load-dotenv@v1.0.0
  with:
    path: 'backend/new'
    filenames: |
      .env
      .env.test
    quiet: false
    if-file-not-found: error
```

## Contributing

Any contributions are welcome and appreciated.

If you find a bug in the source code or a mistake in the documentation, you can [submit an issue](https://github.com/aarcangeli/load-dotenv/issues/new) to the GitHub Repository.
Even better, you can [submit a Pull Request](https://github.com/aarcangeli/load-dotenv/pulls) with a fix.

**Build from source**

```shell
# Get source code
git clone git@github.com:aarcangeli/load-dotenv.git && cd load-dotenv
# Install dependencies
npm install
# Reformat, build, package and update documentation
# Always run before a commit.
npm run pre-commit
```

**Memo before release**

- Update version number in `generate-docs.ts`
- Update version number on this readme
- run locally `npm run pre-commit`
- push everything
