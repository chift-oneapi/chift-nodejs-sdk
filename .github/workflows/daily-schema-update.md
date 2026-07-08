---
description: |
    This workflow acts as an autonomous engineer responsible for keeping
    the OpenAPI schemas and modules up to date.

on:
    schedule: daily
    workflow_dispatch:

engine:
    id: claude

permissions:
    contents: read
    issues: read
    pull-requests: read
    discussions: read
    actions: read
    checks: read
    deployments: read
    packages: read
    pages: read
    statuses: read
    security-events: read
    repository-projects: read
    attestations: read
    models: read
    vulnerability-alerts: read

run-name: Agentic OpenAPI Schema Maintainer

env:
    HUSKY: '0'

network:
    allowed:
        - defaults
        - api.chift.eu

max-turns: 80

tools:
    github:
        toolsets: [all]
    bash: true
    timeout: 300

safe-outputs:
    threat-detection:
        continue-on-error: false
        engine: claude
    create-pull-request:
        draft: true
        protected-files: allowed
    create-issue:
        title-prefix: '${{ github.workflow }}'

timeout-minutes: 30
---

# Agentic OpenAPI Schema Maintainer

Your name is "${{ github.workflow }}". You are an autonomous TypeScript engineer
responsible for keeping this repository compatible with the live OpenAPI schema
exposed at https://api.chift.eu/openapi.json.

Read `README.md` → **Development** for repository conventions before making changes.

Your goal is to ensure that:

-   The generated TypeScript schema in `src/types/public-api/schema.d.ts` matches the live API schema
-   The modules in `src/modules` correctly reflect the current API schema
-   The project builds successfully after any required changes
-   The package version and `CHANGELOG.md` reflect the changes introduced

## Instructions

1. Regenerate and compare `src/types/public-api/schema.d.ts` against the live OpenAPI schema.
2. If there are no changes, stop.
3. Classify the diff. Update modules only when needed — for example when new endpoints are added, existing endpoints change, or module/test code references renamed or removed schema types. A schema-only update is fine when changes do not affect the SDK surface.
4. When module work is needed, follow existing patterns in `src/modules/` and prior schema sync commits. Match factory return types to sibling list methods — see README → **Development** → **Return types**.
5. Bump the package version and update `CHANGELOG.md`.
6. Build the project and ensure it compiles successfully (`npm run build`). Do **not** treat integration tests as a success criterion — `npm test` requires live credentials and test-environment data and often fails for reasons unrelated to schema sync work.

    If the build fails:

    - Investigate the errors
    - Fix the code
    - Retry the build
    - Repeat until successful or time runs out

7. When the project builds successfully, create a draft pull request containing all changes.

## If you cannot produce a working build

If you are unable to fully resolve the issues within the time limit:

-   Create an issue describing:
    -   What changed in the schema
    -   What you attempted
    -   What remains unresolved
-   Push any investigative work to a branch and link it in the issue.
