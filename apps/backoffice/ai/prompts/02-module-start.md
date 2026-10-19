# Prompt: Start Module Development

We are starting development of a module in this project.

Module Name: <module-name>

Example:
Module Name: User Management

---

## Context Check

If a module context folder exists in:

ai/ai-context/<module-name>/

Always read the latest version file (highest version number) from the module folder.

Example:
If v1.md and v2.md exist → read v2.md

If no module context exists:
Proceed with development as a new module.

Read the module context and summarize the module.

Then verify if the module context still matches the current implementation.

If inconsistencies are found, notify the developer that the module context may need to be updated.

---

If module context or implementation details are unclear, ask the developer for clarification before proceeding.

Do not assume missing information.

---

## Development

Assist with development tasks such as:

* creating database migrations
* implementing APIs
* writing controllers or services
* fixing bugs
* improving validation
* optimizing queries
* updating database structure

Follow existing project architecture and patterns.

No documentation generation is required at this stage.

After the module implementation is completed, we will generate or update the module context documentation.