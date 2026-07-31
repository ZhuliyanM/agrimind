# Supabase Integration Layer

This folder is the only allowed place for Supabase SDK usage.

## Subfolders

- client: browser client factory and session-safe usage.
- server: server-side client factory for privileged operations.
- repositories: domain-oriented data access wrappers.
- mappers: conversion between DB rows and domain types.
- policies: policy references and authorization notes.
- realtime: subscriptions and channel handlers.
- storage: bucket operations and file metadata flows.
- types: generated database types.

## Rules

- UI components must not call Supabase directly.
- Modules use repositories instead of raw SDK calls.
- Service role keys must never be exposed in client bundles.
