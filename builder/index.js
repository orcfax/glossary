#!/usr/bin/env node

import { readFileSync, promises } from "fs";
import { basename, join } from "path";
import * as commander from "commander";
import { Parser } from 'n3';
import process from 'process';

const { Command } = commander

function cli() {
  let program = new Command()
  program
    .version("0.0.1")
    .description("build glossary")
    .option("-i, --input <input>", "Input directory")
  return program.parse()
}

async function app() {
  let opts = cli().opts();
  const parser = new Parser();
  const entities = {}
  for await (const fp of walk(opts.input)) {
    try {
      entities[basename(fp, '.ttl')] = parseTtl(parser, fp)
    } catch (err) {
      console.error(`ERROR IN THE FILE : ${fp}`)
      throw err
    }
  }
  const content = Object.entries(entities)
  content.sort((x,y) =>  x[0].toLowerCase() > y[0].toLowerCase() ? 1 : -1 )
  return page(content.map(tup => Concept.fromQuads(tup[0], tup[1]).emit()))
}

const SKOS_PREFIX = "http://www.w3.org/2004/02/skos/core"

class Concept {
  _name
  _prefLabel
  _definition
  _additional
  constructor(name, prefLabel, definition, additional) {
    this._name = name
    this._prefLabel = prefLabel
    this._definition = definition
    this._additional = additional
  }
  static fromQuads(name, quads) {
    const prefLabelQuad = quads.find(PrefLabel.isQuad)
    const definitionQuad = quads.find(Definition.isQuad)
    const skosQuads = quads.filter(AdditionalSkos.isQuad)
    return new Concept(
      name,
      PrefLabel.fromQuad(prefLabelQuad),
      Definition.fromQuad(definitionQuad),
      skosQuads.map(AdditionalSkos.fromQuad),
    )
  }
  attr() {
    return {
      class:"term-container" ,
      id: this._name,
      typeof:"skos:Concept",
    }
  }
  emit () {
    return div(
      this.attr(), [
        this._prefLabel.emit(),
        this._definition.emit(),
      ].concat(this._additional.map(x => x.emit())))
  }
}

class PrefLabel {
  static label="prefLabel"
  _body
  _lang
  constructor(body, lang) {
    this._body = body
    this._lang = lang
  }

  static isQuad(quad) {
    return quad.predicate.id == `${SKOS_PREFIX}#${PrefLabel.label}`
  }

  static fromQuad(quad) {
    const body = quad.object.value
    const lang = quad.object.lang
    return new PrefLabel(body, lang)
  }

  attr() {
    return {
      class:"col-12 mt" ,
      lang: (this._lang ? this._lang : "en"),
      property:"skos:prefLabel",
    }
  }
  emit () {
    return dt(
      this.attr(), [
        this._body,
        ]
    )
  }
}

class Definition {
  static label="definition"
  _body
  _lang
  constructor(body, lang) {
    this._body = body
    this._lang = lang
  }

  static isQuad(quad) {
    return quad.predicate.id == `${SKOS_PREFIX}#${Definition.label}`
  }

  static fromQuad(quad) {
    const body = quad.object.value
    const lang = quad.object.lang
    return new Definition(body, lang)
  }

  attr() {
    return {
      class:"col-12" ,
      lang: (this._lang ? this._lang : "en"),
      property:"skos:definition",
    }
  }
  emit () {
    return dd(
      this.attr(), [
        this._body,
        ]
    )
  }
}

class AdditionalSkos {
  _label
  _body
  _lang
  constructor(label, body, lang) {
    this._label = label
    this._body = body
    this._lang = lang
  }

  static isQuad(quad) {
    return quad.predicate.id.startsWith(SKOS_PREFIX) &&
        (!PrefLabel.isQuad(quad)) &&
        (!Definition.isQuad(quad))
  }

  static fromQuad(quad) {
    const label = quad.predicate.value.split("#")[1]
    const body = quad.object.value
    const lang = quad.object.lang
    return new AdditionalSkos(label, body, lang)
  }

  attr() {
    return {
      class:"col-12 alt-label" ,
      lang: (this._lang ? this._lang : "en"),
      property:`skos:${this._label}`,
    }
  }
  emit () {
    return dd(
      this.attr(), [
        this._body,
        ]
    )
  }
}

function parseTtl(parser, fp) {
  return parser.parse(readFileSync(fp, 'utf8'))
}

function attrOne2Str(tup) {
  return `${tup[0]}="${tup[1].toString()}"`
}

function attr2Str(attr) {
  return Object.entries(attr).map(attrOne2Str).join(" ")
}

function elem(tag) {
  return  (attr, children) => {
  const inner = (typeof children === "string") ? children : children.join(" ")
  return `<${tag} ${attr2Str(attr)}>${inner}</${tag}>`
  }
}

const div = elem("div")
const dt = elem("dt")
const dd = elem("dd")

async function* walk(dir) {
  for await (const d of await promises.opendir(dir)) {
    const entry = join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}


async function main() {
  process.exitCode = 1;
  const i = setInterval(() => {
    /* do nothing but prevent node process from exiting */
  }, 1000);
  try {
    app().then(console.log);
  } finally {
    clearInterval(i);
  }
  process.exitCode = 0;
}

function page(content) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orcfax Glossary</title>
    <style>
        /* Font settings with fallback fonts */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

        body {
            background-color: #f8f9fa;
            font-family: 'Roboto', Arial, sans-serif;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            margin: 0; /* Ensure no default margin */
        }

        .container {
            margin-top: 3rem; /* Margin for the container */
            margin-bottom: 3rem; /* Margin for the container */
            width: 100%;
            padding-right: 1rem; /* Adjusted padding */
            padding-left: 1rem;  /* Adjusted padding */
            max-width: 1140px; /* Constrain width */
            margin-right: auto;
            margin-left: auto;
            box-sizing: border-box; /* Ensure padding is included in the element's total width and height */
        }

        .text-center {
            text-align: center;
        }

        .mb-4 {
            margin-bottom: 1.5rem;
        }

        .mt-5 {
            margin-top: 3rem;
        }

        .row {
            margin-right: -0.75rem; /* Negative margin to offset padding */
            margin-left: -0.75rem; /* Negative margin to offset padding */
        }

        .col-12 {
            padding-right: 0.75rem;
            padding-left: 0.75rem;
        }

        .mt-3 {
            margin-top: 1rem;
        }

        .content-wrapper {
            background-color: #ffffff;
            border: 1px solid #dee2e6;
            border-radius: 0.5rem;
            padding: 2rem;
            box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
            box-sizing: border-box;
        }

        .alt-label {
            font-style: italic;
            color: #6c757d;
            margin-top: 0.5rem;
        }

        .term-container {
            width: 100%; /* Ensure full width for each term container */
            margin-bottom: 1rem; /* Space between terms */
        }

        dt[property="skos:prefLabel"] {
            font-weight: bold;
        }

    </style>
    <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "CreativeWork",
      "additionalType": "Glossary",
      "name": "Orcfax Glossary",
      "description": "This glossary contains terms and definitions for the entities and concepts in the Orcfax domain. Orcfax is an oracle software system that publishes data about real-world events to the Cardano blockchain network. This glossary is reference documentation that is intended to guide Orcfax design and development. That means the glossary terms must be comprehensive, unambigous, as well as semantically and logically consistent with all other terms in the glossary.",
      "author": {
        "@type": "Organization",
        "name": "Orcfax development team"
      },
      "inLanguage": "en",
      "url": "https://glossary.orcfax.io",
      "version": 0.1.1
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": {
        "skos": "http://www.w3.org/2004/02/skos/core#",
        "xsd": "http://www.w3.org/2001/XMLSchema#"
      }
    }
    </script>
</head>
<body>
    <div class="container">
        <div class="content-wrapper">
            <h1 class="text-center mb-4">Orcfax Glossary</h1>
            <p class="text-center">This glossary contains terms and definitions for the entities and concepts in the <a href="https://orcfax.io">Orcfax</a> domain.</p>
            <p class="text-center"><a href="https://github.com/orcfax/glossary">How to contribute</a></p>
            <hr>
            <dl class="row">
              ${content.join("\n\n")}
            </dl>
        </div>
    </div>
</body>
</html>
`
}

main();
