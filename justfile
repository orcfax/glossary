ROOT := `git rev-parse --show-toplevel`

help:  # default
  just -l 

list-dependencies:
  echo "Manual list of dependencies:"
  echo "just, nodejs, pnpm"
  echo "Make sure these are installed"

install-builder:
  cd {{ROOT}}/builder; pnpm i

build: 
  node {{ROOT}}/builder/index.js --input ./content > {{ROOT}}/docs/index.html
