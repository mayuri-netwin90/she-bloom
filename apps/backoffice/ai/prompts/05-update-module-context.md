# Prompt: Update Module Context

A module in this project has been updated.

Module Name: <module-name>

The module implementation has changed due to bug fixes or improvements.

Your task is to update the existing module context so it reflects the latest implementation.

---

Before updating, read the latest version file (highest version number) from:

ai/ai-context/<module-name>/

---

## Instructions

Analyze the recent changes made to the module and update the module context accordingly.

Identify updates such as:

* new APIs
* modified APIs
* database changes
* dependency changes
* workflow updates
* business rule updates

If implementation details are unclear, request necessary files before updating.

Do not assume missing information.

---

## Output Requirements

Follow the structure defined in:

ai/module-context-template.md

Do not remove valid existing sections. Only modify or extend sections where changes have occurred.

Do not include implementation code.

---

## Output Location

Generate the updated document suitable for saving in:

ai-context/<module-name>/v<next-version>.md

Determine the latest version and create the next version file.

If version information is unclear, ask the developer for existing versions before generating output.

Do not overwrite existing versions.