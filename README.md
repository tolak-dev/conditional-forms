# Conditional Forms (Demo)

This is a demo monorepo project using [Nx](https://nx.dev) to demonstrate development, release, and publishing workflows in a multi-package setup.

It provides a dynamic form component for React using React Hook Form. The form is built from a JSON schema and supports conditional rendering, grouped fields, and validation.

**Live Demo:** [View the app on GitHub Pages](https://tolak-dev.github.io/react-forms/)

## Features

- Dynamic form component for React using [React Hook Form](https://react-hook-form.com)
- JSON-based form schema with:
  - Conditional rendering (AND/OR/NOT logic)
  - Grouped field layouts
  - Validation and dynamic field states (visibility, read-only, required)
- Unit tests with Vitest and Testing Library
- Uses Nx for monorepo structure, build, test, and publish workflows

## Packages

- `@conditional-forms/react` – Reusable dynamic form builder components
- `@conditional-forms/theme` – Theme configuration for form rendering
- `@conditional-forms/demo-app` – App to showcase all conditional form features

## Getting Started

```bash
pnpm install
pnpm nx run-many --target=build --all
pnpm nx serve demo-app
```


## Installation (for testing only)

```bash
npm install @conditional-forms/react react-hook-form
```

or

```bash
yarn add @conditional-forms/react react-hook-form
```

## Example Usage

```tsx
import { ConditionalForm } from '@conditional-forms/react';

const schema = {
  title: 'Demo Form',
  groups: [
    { name: 'basic', label: 'Basic Info' },
  ],
  fields: [
    { name: 'firstName', label: 'First Name', type: 'text', group: 'basic' },
    { name: 'subscribe', label: 'Subscribe?', type: 'checkbox', group: 'basic' },
  ],
};

export default function App() {
  return (
    <ConditionalForm
      schema={schema}
      onSubmit={(data) => console.log(data)}
    />
  );
}
```

## Note

> This is a demo project and **not intended for production use**.
