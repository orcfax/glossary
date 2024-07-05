ROOT := `git rev-parse --show-toplevel`

xnpm := `[[ $(command -v pnpm) ]] && echo "pnpm" || echo "npm"`

# Get help
help:
  just -l

# Run on FIRST USE
setup:
  cd {{ROOT}}/builder; {{xnpm}} i # install builder dependencies
  pre-commit install --install-hooks # uninstall: `pre-commit uninstall`

# (Re-)build the glossary
build:
  node {{ROOT}}/builder/index.js --input ./content > {{ROOT}}/docs/index.html

# Run all pre-commit checks
all-checks:
  pre-commit run --all-files

# Run pre-commit spelling check
spell:
  pre-commit run codespell --all-files

# Run pre-commit makdown-lint
markdown:
  pre-commit run markdownlint --all-files
