# Angular Authentication Project

A modern Angular application showcasing clean architecture, authentication features, and best practices with standalone components, signals, and reactive forms.

## Features

### 🔐 Authentication System
- **Login** - Secure user authentication with form validation
- **Register** - User registration with strong password requirements
- **Protected Routes** - Route guards for authenticated and guest users
- **Auto Logout** - Token-based authentication with refresh mechanism

### 🏗️ Architecture & Design Patterns
- **Clean Architecture** - Organized folder structure with core, features, and shared modules
- **Standalone Components** - Modern Angular approach without NgModules
- **Signal-Based State** - Reactive state management using Angular signals
- **Reactive Forms** - Type-safe forms with custom validators
- **Dependency Injection** - Proper DI patterns with `inject()` function

### 🎨 UI/UX
- **Responsive Design** - Mobile-first responsive layouts
- **Custom Components** - Reusable form inputs and buttons
- **Loading States** - Visual feedback during async operations
- **Error Handling** - User-friendly error messages and validation

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
