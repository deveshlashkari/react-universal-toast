# React Universal Toast

[![npm version](https://badge.fury.io/js/react-universal-toast.svg)](https://badge.fury.io/js/react-universal-toast)
[![npm downloads](https://img.shields.io/npm/dm/react-universal-toast.svg)](https://www.npmjs.com/package/react-universal-toast)
[![Build Status](https://github.com/deveshlashkari/react-universal-toast/actions/workflows/ci.yml/badge.svg)](https://github.com/deveshlashkari/react-universal-toast/actions)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-universal-toast)](https://bundlephobia.com/package/react-universal-toast)
[![React](https://img.shields.io/badge/React-%5E17.0.0%20%7C%7C%20%5E18.0.0%20%7C%7C%20%5E19.0.0-blue)](https://reactjs.org/)

A lightweight, customizable toast notification system for React applications with TypeScript support.

## 🚀 [Live Demo & Documentation](https://deveshlashkari.github.io/react-universal-toast)

Try the interactive demo, explore examples, and find answers to common questions on our GitHub Pages site.

---

## Quick Stats

- 📦 **Bundle Size**: < 5KB gzipped
- 🚀 **Zero Dependencies**: No external runtime dependencies
- ⚛️ **React Support**: Works with React 17, 18, and 19
- 🔧 **TypeScript**: 100% TypeScript with full type definitions
- 🎯 **Framework Agnostic**: Next.js, Vite, CRA compatible

---

## Table of Contents

- [Quick Stats](#quick-stats)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Customization](#customization)
- [Framework Compatibility](#framework-compatibility)
- [TypeScript Support](#typescript-support)
- [Links & Resources](#links--resources)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🎯 **Dual API Design**: Hook-based (`useToast`) and utility-based (`toast.*`) approaches
- 🎨 **6 Placement Options**: Top/bottom + left/center/right positioning
- 🎭 **4 Toast Types**: Success, error, info, and default variants
- 🖱️ **Click to Dismiss**: Manual dismissal support
- 🧹 **Batch Operations**: Clear all toasts at once
- 📱 **Responsive Design**: Works seamlessly on all screen sizes
- 🎨 **Fully Customizable**: Easy CSS override system
- ⚡ **Lightweight**: Minimal bundle size with zero dependencies
- 🔧 **TypeScript First**: Complete type safety and IntelliSense support
- ⚛️ **React Compatible**: Supports React 17, 18, and 19

## Installation

```bash
npm install react-universal-toast
```

## Quick Start

### 1. Setup ToastProvider

First, wrap your app with the `ToastProvider` and import the CSS styles:

```jsx
import React from 'react';
import { ToastProvider } from 'react-universal-toast';
import 'react-universal-toast/dist/styles.css';

function App() {
  return (
    <ToastProvider placement="top-right">
      {/* Your app components */}
    </ToastProvider>
  );
}
```

### 2. Hook API Usage

Use the `useToast` hook for component-level toast management:

```jsx
import { useToast } from 'react-universal-toast';

function MyComponent() {
  const { show, remove, clear } = useToast();

  const handleSuccess = () => {
    const id = show('Success! Operation completed.', { type: 'success' });
    // Optionally remove after 3 seconds
    setTimeout(() => remove(id), 3000);
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={clear}>Clear All</button>
    </div>
  );
}
```

### 3. Utility API Usage

Use the global `toast` utility for quick, one-line toast notifications:

```jsx
import { toast } from 'react-universal-toast';

function MyComponent() {
  const handleActions = () => {
    toast.success('Operation successful!');
    toast.error('Something went wrong!');
    toast.info('Here\'s some info!');
    toast.clear(); // Clear all toasts
  };

  return <button onClick={handleActions}>Trigger Toasts</button>;
}
```

## API Reference

### ToastProvider

The main provider component that manages toast state and rendering.

```jsx
<ToastProvider placement="top-right">
  {/* Your app */}
</ToastProvider>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `Placement` | `"top-right"` | Position of the toast container |
| `children` | `ReactNode` | - | Your app components |

#### Placement Options

- `"top-left"`, `"top-center"`, `"top-right"`
- `"bottom-left"`, `"bottom-center"`, `"bottom-right"`

### useToast Hook

```typescript
const { show, remove, clear } = useToast();

// Show a toast
const id = show('Message', { type: 'success' });

// Remove specific toast
remove(id);

// Clear all toasts
clear();
```

### Toast Utility

```typescript
import { toast } from 'react-universal-toast';

toast.success('Success message');
toast.error('Error message');
toast.info('Info message');
toast.show('Default message');
toast.clear(); // Clear all toasts
```

### Toast Types

- `"success"` - Green background
- `"error"` - Red background  
- `"info"` - Blue background
- `"default"` - Dark gray background

## Customization

Override CSS classes to customize appearance:

```css
.toast {
  background: #your-color;
  border-radius: 12px;
  /* Your custom styles */
}

.toast-success { background: #10B981; }
.toast-error { background: #EF4444; }
.toast-info { background: #3B82F6; }
.toast-default { background: #374151; }
```

## Framework Compatibility

Works with Next.js, Vite, Create React App, and other React frameworks. See the [demo site](https://deveshlashkari.github.io/react-universal-toast) for specific setup examples.

## TypeScript Support

Full TypeScript support with complete type definitions:

```typescript
import { ToastType, Placement } from 'react-universal-toast';

const placement: Placement = 'top-left';
const type: ToastType = 'success';
```

## Links & Resources

[![npm](https://img.shields.io/badge/npm-react--universal--toast-red)](https://www.npmjs.com/package/react-universal-toast)
[![GitHub](https://img.shields.io/badge/GitHub-deveshlashkari%2Freact--universal--toast-blue)](https://github.com/deveshlashkari/react-universal-toast)
[![Demo](https://img.shields.io/badge/Demo-Live%20Site-green)](https://deveshlashkari.github.io/react-universal-toast)
[![Docs](https://img.shields.io/badge/Docs-GitHub%20Pages-blue)](https://deveshlashkari.github.io/react-universal-toast)

- 🚀 [**Live Demo & Examples**](https://deveshlashkari.github.io/react-universal-toast) - Interactive demo with code examples
- 📦 [**npm Package**](https://www.npmjs.com/package/react-universal-toast) - Install via npm
- 🐙 [**GitHub Repository**](https://github.com/deveshlashkari/react-universal-toast) - Source code and issues
- ❓ [**FAQ & Documentation**](https://deveshlashkari.github.io/react-universal-toast#faq) - Common questions answered
- 📊 [**Bundle Analysis**](https://bundlephobia.com/package/react-universal-toast) - Package size analysis
- 🔧 [**TypeScript Definitions**](https://www.npmjs.com/package/react-universal-toast?activeTab=code) - View type definitions

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/deveshlashkari/react-universal-toast.git
cd react-universal-toast

# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build

# Run tests with coverage
npm run test:coverage
```

### Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build the package for production |
| `npm test` | Run the test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run release:patch` | Release a patch version |
| `npm run release:minor` | Release a minor version |
| `npm run release:major` | Release a major version |

## Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🔧 **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. ✅ **Make** your changes and add tests
4. 🧪 **Test** your changes: `npm test`
5. 📝 **Commit** your changes: `git commit -m 'Add amazing feature'`
6. 🚀 **Push** to the branch: `git push origin feature/amazing-feature`
7. 🎉 **Open** a Pull Request

### Guidelines

- Write tests for new features
- Follow the existing code style
- Update documentation as needed
- Add appropriate TypeScript types

[![Contributors](https://img.shields.io/github/contributors/deveshlashkari/react-universal-toast)](https://github.com/deveshlashkari/react-universal-toast/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/deveshlashkari/react-universal-toast)](https://github.com/deveshlashkari/react-universal-toast/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## License

MIT © [Devesh Lashkari](https://github.com/deveshlashkari)

This project is licensed under the MIT License - see the [LICENSE](https://github.com/deveshlashkari/react-universal-toast/blob/main/LICENSE) file for details.