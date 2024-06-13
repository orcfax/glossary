# How to contribute

## Revise existing glossary term
   * To make a comment or revision suggestion to an existing term, find its corresponding [Issue](https://github.com/orcfax/glossary/issues) in this Github repo.
   * Each term has its own Issue with the term as the title.
   * Search for your term and add your comments and revision suggestions.
   * Check that there is not an existing Issue for this term that has been closed, if so, re-open the issue and add your comments.
   * Change the label to "revision"
   * Ping other repo members for review of your comment or revision request.
   * Once consensus is reached, the current version of the [glossary file](https://github.com/orcfax/glossary/blob/main/docs/index.html) can be updated by the repo owner. The repo branch protection requires updates via Pull Request with approval from one reviewer.

## Add new glossary term
   * To add a new term to the glossary, create a new [Issue](https://github.com/orcfax/glossary/issues) in this Github repo.
   * Create an Issue with the term's preferred label as the only text in the Issue title.
   * Add the label "proposed"
   * In the Issue's comment section add your proposed definitions and/or comments about the new term.
   * Ping other repo members for review of your comment or revision request.
   * Once consensus is reached, the current version of the [glossary file](https://github.com/orcfax/glossary/blob/main/docs/index.html) can be updated by the repo owner. The repo branch protection requires updates via Pull Request with approval from one reviewer.

## Glossary fields
* This glossary is marked up using the [SKOS](https://www.w3.org/TR/skos-primer/) ontology. You can propose values for the following SKOS properties:
   * preferred label
   * definition
   * alternate label
   * broader term
   * narrower term
   * related term
  
# About
This [glossary](https://glossary.orcfax.io) contains terms and definitions for the entities and concepts in the Orcfax domain.

Orcfax is an oracle software system that publishes data about real-world events to the Cardano blockchain network.

![Orcfax domain](assets/orcfax-concept-june2024.png)

This glossary is [reference](https://diataxis.fr/reference/) documentation that is intended to guide Orcfax design and development.
That means the glossary terms must be comprehensive, unambigous, as well as semantically and logically consistent with all other terms in the glossary.

The Orcfax docs site contains more detailed [explainer](https://docs.orcfax.io) documentation that is better meant for stakeholders to understand Orcfax concepts and objectives.
