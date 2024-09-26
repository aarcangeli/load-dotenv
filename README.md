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

    # If true, expand variables in the .env file. For example, if the .env file
    # contains `FOO=bar` and `BAR=$FOO`, the value of `BAR` will be `bar`.
    # Default: false
    expand: ''
```
<!-- end usage -->

## Examples

### Load a single `.env` file

Load a single `.env` file from the root directory.

The parsing is done using [dotenv](https://github.com/motdotla/dotenv)

```yaml
- name: Load .env file
  uses: aarcangeli/load-dotenv@v1.0.0
```

```.dotenv
# .env
# The variable FOO will be exported with the value bar
FOO=bar
```

### Load multiple `.env` files

```yaml
- name: Load .env file
  uses: aarcangeli/load-dotenv@v1.0.0
  with:
    filenames: |
      .env
      .env.test
```

```.dotenv
# .env
FOO=bar
```

```dotenv
# .env.test
# The variable FOO will be exported with the value test
FOO=test
```

### Expand variables

```yaml
- name: Load .env file
  uses: aarcangeli/load-dotenv@v1.0.0
  with:
    quiet: false
```

```.dotenv
# .env
ENVIROMENT=stage
DOMAIN=example.com
# URL will be https://api-stage.example.com
URL=https://api-${ENVIROMENT}.${DOMAIN}
# GET_ASSETS will be https://api-stage.example.com/assets
GET_ASSETS=$URL/assets
```

### Expand variables with multiple files

When multiple filenames are provided, all the options are merged to a single object and then expanded.

The expansion is performed using [dotenv-expand](https://github.com/motdotla/dotenv-expand)

```yaml
- name: Load .env file
  uses: aarcangeli/load-dotenv@v1.0.0
  with:
    filenames: |
      .env
      .env.test
    quiet: false
```

```.dotenv
# .env
ENVIROMENT=stage
DOMAIN=example.com
URL=https://api-${ENVIROMENT}.${DOMAIN}
GET_ASSETS=$URL/assets
```

```dotenv
# production.dotenv
# URL will be https://api-prod.example.com
# GET_ASSETS will be https://api-prod.example.com/assets
ENVIROMENT=prod
```

### Ignore if file not found

It is possible to ignore or warn if the file is not found.

```yaml
- name: Load .env file
  uses: aarcangeli/load-dotenv@v1.0.0
  with:
    if-file-not-found: 'ignore'
```

# Specify a different path

```yaml
- name: Load .env file
  uses: aarcangeli/load-dotenv@v1.0.0
  with:
    path: 'backend/new'
    quiet: false
```

### All options with default values

```yaml
- name: Load .env file
  uses: aarcangeli/load-dotenv@v1.0.0
  with:
    path: '.'
    filenames: '.env'
    quiet: 'false'
    if-file-not-found: 'error'
    expand: 'false'
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
yarn install
# Reformat, build, package and update documentation
# Always run before a commit.
yarn all
```

**Memo before release**

- Update version number in `generate-docs.ts`
- Update version number on this readme
- run locally `yarn all`
- push everything
