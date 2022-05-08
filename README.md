# load-dotenv

This action allows reding environment variables from a `.env` file.

[![build-test](https://github.com/aarcangeli/load-dotenv/actions/workflows/test.yml/badge.svg?branch=main&event=push)](https://github.com/aarcangeli/load-dotenv/actions/workflows/test.yml)

## Usage

<!-- start usage -->
```yaml
- uses: aarcangeli/load-dotenv@v3
  with:
    # The directory to find the '.env' file.
    # Relative paths are resolved inside the workspace directory
    # Default: .
    path: ''

    # If true, don't print variables
    # Default: false
    quiet: ''
```
<!-- end usage -->
