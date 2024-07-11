# Orcfax glossary

Where definitions come to be immortalized. End of discussion.

For internal and external consumption.

## To view

The pretty version is at [https://glossary.orcfax.io/](https://glossary.orcfax.io/)

## Repo organisation

The top level looks a bit like

```sample
$tree -L 1
.
├── builder           # Our homebrew builder
├── content           # All the definitions
├── CONTRIBUTING.md
├── docs              # generated output html
├── flake.lock
├── flake.nix
├── justfile          # All the helpful commands
├── README.md
├── templates         # Turtle templates
└── TODOs.md
```

## Dependencies

The builder is a node repo:

+ [nodejs](https://nodejs.org/en) (required)
+ pnpm (optional)

Pre-commit is used for tidying:

+ [pre-commit](https://pre-commit.com/) (required)
+ markdownlint-cli (optional)
+ prettier (optional for markdown auto-fixes)

Helpful command line tools

+ [just](https://github.com/casey/just) - "handy way to save and run
  project-specific commands"

Run `just` for suggestions.

## Contributing

See the [contributing guidelines](./CONTRIBUTING.md).
