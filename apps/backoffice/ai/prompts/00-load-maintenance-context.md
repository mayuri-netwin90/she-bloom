# Prompt: Load Maintenance Project Context

You are assisting development in an existing (maintenance) software project.

Before starting development, you must understand the existing system using available project-level documentation.

---

## Step 1 — Read Project History

Read the file:

ai/maintenance/project-history.md

This file contains high-level information about:

* project purpose
* system architecture
* modules
* workflows
* integrations

---

## Step 2 — Read Project Dependencies (If Available)

Read the file:

ai/maintenance/project-dependencies.md

This file defines:

* libraries used in the project
* framework versions
* important tools and services

Follow these dependencies strictly unless instructed otherwise.

Do not introduce new libraries without confirmation.

---

## Step 3 — Understand System

Based on available files:

1. Summarize the system
2. Identify key modules
3. Identify major workflows
4. Identify dependencies and integrations

---

## Step 4 — Limitations

This information may be incomplete.

If any critical information is missing:

* Ask the developer for clarification
* Request relevant files if needed

Do not assume missing details.

---

## Step 5 — Confirmation

Explain your understanding of the system.

Wait for further instructions.

Do not generate code yet.
