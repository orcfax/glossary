# How to contribute

## Overview

The glossary is an html page built from the collection of [turtle][ttl-1] files.

The builder, found in `./builder`, is written in node.

The turtle files follow [SKOS][skos-1].
The turtle files require a bit of getting used to.
If you have suggestions on editor support,
add them here.

[skos-1]: https://www.w3.org/TR/skos-primer/
[ttl-1]: https://www.w3.org/TR/turtle/

## Style guide

Definitions are recorded in turtle format, where the definition field supports
markdown.

One definition per file.

In certain places, use camel case names. Treat acronyms, such as `HTTP` or
`JSON`, as single words. Thus the camel case of HTTP exceptions is
`httpException` and not `HTTPException`.

Files are named `<camelCaseName>.ttl`.

Each turtle file must include the two namespace prefixes as follows

```ttl
@prefix : <http://glossary.orcfax.io/#> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
```

Use the template (look in `./templates`) to ensure these appear or copy and
paste from a good example.

The name of the entity is `:<camelCaseName>`, matching the filename.

Preferred labels are lower cased unless they never appear in lowercase form. For
example `domain`, and `ITN`.

## Adding a new definition

Open a new file `/content/<camelCaseName>.ttl`.

Use a template (`/templates/*`) or copy the content of another definition file
to bring in the correct prefixes.

Add the new definition. Use markdown for styling and links.

Add `skos:related` values as appropriate.

Rebuild the site.

Submit a PR.

Nominate a reviewer.
