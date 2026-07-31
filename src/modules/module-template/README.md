# Module Template

Use this folder as a blueprint when creating a new business module.

## Required subfolders

- ui: module-specific presentational components.
- model: state, selectors, and view model logic.
- api: query/mutation functions and repository interfaces.
- routes: route registration and route-level guards.
- types: module-only types.
- lib: internal helpers not shared outside the module.

## Public API

Only export from index.ts.
Do not import from another module's internal files.
