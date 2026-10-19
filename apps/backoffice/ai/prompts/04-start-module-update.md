# Prompt: Start Existing Module Modification

We are going to modify an existing module in this project.

Module Name: <module-name>

---

## Step 1 — Load Module Context

Read the module documentation from:

ai/ai-context/<module-name>/

Always read the latest version file (highest version number) from the module folder.

If no module context folder or version files exist:
Notify the developer to generate module context first using:
ai/prompts/03-generate-module-context.md

---

If module context or implementation details are unclear, ask the developer for clarification before proceeding.

Do not assume missing information.

---

## Step 2 — Understand Current Implementation

Summarize:

- module purpose
- APIs
- database tables
- workflows
- dependencies

---

## Step 3 — Validate with Current Code

Verify that module context matches current implementation.

If implementation details are missing, request:

- controllers
- routes
- models
- migrations
- services

If inconsistencies are found:
Notify the developer that module context may be outdated.

---

## Step 4 — Confirmation

Explain your understanding of the module.

Also ask the developer to describe the intended changes before proceeding.

Wait for instructions before making any changes.

Do not generate code yet.