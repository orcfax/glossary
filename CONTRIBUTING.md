# How to contribute

## Overview

The glossary is collections

## Style guide

Definitions are recorded in turtle format.

One definition per file.

In certain places, use the camel case names.
Treat acronyms, such as `HTTP` or `JSON`, as single words.
Thus the camel case of HTTP exceptions is `httpException` and not `HTTPException`.

Files are named `<camelCaseName>.ttl`.

Each turtle file must include the two prefixes as follows

```ttl
@prefix : <http://glossary.orcfax.io/#> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
```
Use the template to ensure these appear.

The name of the entity is `:<camelCaseName>`, matching the filename.

Preferred labels are lower cased unless they never appear in lowercase form.
For example `domain`, and `ITN`.

## Adding a new definition

Open a new file `/content/<camelCaseName>.ttl`.

Use a template (`/templates/*`)
or copy the content of another definition file
to bring in the correct prefixes.

Add the new definition.

Rebuild the site.

Submit a PR.
