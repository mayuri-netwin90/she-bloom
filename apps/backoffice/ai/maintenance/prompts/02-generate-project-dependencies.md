# Prompt: Generate Project Dependencies

This project does not have a project-dependencies.md file or it needs to be updated.

Your task is to analyze the project and generate a dependency summary.

If dependency files (e.g., composer.json) are available in the project, read them to identify dependencies.

---

## Step 1 — Identify Project Type

Determine the project technology based on available files or developer input.

Examples:

- Laravel (PHP) → composer.json
- Java / Spring Boot → pom.xml, build.gradle
- Node / React → package.json
- .NET → .csproj
- Android → build.gradle
- iOS → Podfile, Package.swift

If project type is already provided by the developer:
Use that information instead of detecting from files.

---

## Step 2 — Extract Dependencies

Identify the following:

1. Language and runtime version
2. Framework(s) used
3. Important libraries and packages
4. Database technology
5. External services (if visible)

Focus only on important and commonly used dependencies.

Do not include every minor package.

---

## Step 3 — Request Missing Information (If Needed)

If required files are not available:

- Ask the developer to provide:
  - dependency files (e.g., package.json, pom.xml, etc.)
  - or manually share key libraries

Do not assume missing information.

---

## Step 4 — Generate Output

Create a structured document suitable for saving in:

ai/project-context/project-dependencies.md

---

## Output Format

Follow this structure:

# Project Dependencies

## Platform / Stack

- Backend:
- Frontend:
- Mobile:
- Database:

---

## Core Technologies

- Language:
- Framework:
- Runtime:

---

## Key Libraries

### Backend
- <library-name>: <version>

### Frontend
- <library-name>: <version>

### Mobile (if applicable)
- <library-name>: <version>

---

## Tools & Services

- Authentication:
- Messaging:
- Storage:
- CI/CD:

---

## Rules

- Prefer existing libraries already used in the project
- Do not upgrade versions unless explicitly requested
- Ask before introducing new libraries