# AgriMind SaaS Architecture Blueprint

This document defines the long-term frontend architecture for AgriMind.
The goal is safe growth: new modules can be added without rewriting the core.

## Architectural goals

- Keep business domains isolated by module.
- Separate server state from client state.
- Use a single integration boundary for Supabase.
- Keep UI primitives reusable and domain-agnostic.
- Allow teams to work in parallel with low merge conflicts.

## Recommended folder structure

```text
src/
  app/
    providers/
    router/
    layouts/
    guards/
    config/
  modules/
    module-template/
      ui/
      model/
      api/
      routes/
      types/
      lib/
      index.ts
  entities/
    user/
    farm/
    field/
    subscription/
  features/
    auth/
    notifications/
    file-upload/
  widgets/
    topbar/
    sidebar/
    dashboard-shell/
  shared/
    ui/
    lib/
    hooks/
    types/
    constants/
    validation/
    styles/
  integrations/
    supabase/
      client/
      server/
      repositories/
      mappers/
      policies/
      realtime/
      storage/
      types/
  processes/
    onboarding/
    billing-lifecycle/
  pages/
    public/
    app/
```

## Layer responsibilities

- app: global composition (providers, route tree, layout shells, access guards).
- modules: business capabilities with their own UI, state, API contract and routes.
- entities: stable domain models reused by many modules.
- features: reusable business actions used across modules.
- widgets: page sections composed from entities and features.
- shared: design system and utilities with no domain coupling.
- integrations/supabase: single gateway to Supabase SDK and policies.
- processes: cross-module business flows.
- pages: route-level composition only.

## Component architecture

- Primitive components live in shared/ui.
- Domain-specific components live in modules/*/ui.
- Containers connect module model state to UI.
- Pages should orchestrate modules/widgets, not implement business logic.

## State management strategy

- Server state: TanStack Query (queries, mutations, cache, invalidation).
- Client UI state: per-module Zustand stores.
- Form state: React Hook Form + schema validation in shared/validation.
- URL state: filtering/sorting/pagination in query params.

Do not call Supabase directly from UI components.

## Supabase integration contract

- Keep all Supabase clients inside integrations/supabase/client and server.
- Access data through repositories in integrations/supabase/repositories.
- Use mappers to convert DB rows to domain types.
- Keep realtime subscriptions inside integrations/supabase/realtime.
- Keep storage logic inside integrations/supabase/storage.
- Keep generated DB types in integrations/supabase/types.
- Enforce authorization with RLS policies and app guards.

## Module contract for future additions

Every new module must provide:

- ui/ for visual module components.
- model/ for selectors and local state logic.
- api/ for module data access interfaces.
- routes/ for module route definitions.
- types/ for module-specific types.
- lib/ for module-only helpers.
- index.ts as the only public export surface.

## Dependency rules

- modules can depend on shared, entities, features, integrations.
- modules cannot import from other modules internals.
- features cannot import module internals.
- shared cannot import from modules, features, entities, or integrations.

## Initial scaffold status

This repository now includes the folder scaffold matching this blueprint.
No business functionality is added in this step.
