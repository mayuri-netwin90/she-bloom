# Prompt: Load Project Context

You are assisting development in a software project.

Before generating any code, you must understand the project context.

---

## Step 1 — Read Project Structure

Read the file:

ai/project-structure.md

This file describes the technology stack and folder structure of the project.

---

## Step 2 — AI Development Workflow

This project uses AI-assisted development.

Important rules:

* Developers may use AI tools to generate code.
* Important module knowledge must be stored inside the repository.
* AI chat history is not considered project documentation.

---

## Step 3 — Module Context Storage

Module documentation is stored in:

ai/ai-context/

Example files:

ai/ai-context/user/v1.md
ai/ai-context/user/v2.md
ai/ai-context/product/v1.md
ai/ai-context/order/v1.md

These files describe implemented modules.

Each module has its own folder.

Each update creates a new version file:
v1.md, v2.md, v3.md, etc.

Always use the latest version (highest version number) of the module context.

---

## Step 4 — Confirmation

After reading the project structure and workflow:

1. Summarize the system architecture.
2. Confirm you understand the project structure.
3. Wait for module development instructions.

Do not generate code yet.
