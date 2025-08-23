# React Universal Toast

A lightweight, customizable toast notification system for React applications with TypeScript support.

## 🚀 [Live Demo & Documentation](https://deveshlashkari.github.io/react-universal-toast)

Try the interactive demo, explore examples, and find answers to common questions on our GitHub Pages site.

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

## Links

- 🚀 [Live Demo & Examples](https://deveshlashkari.github.io/react-universal-toast)
- 📦 [npm Package](https://www.npmjs.com/package/react-universal-toast)
- 🐙 [GitHub Repository](https://github.com/deveshlashkari/react-universal-toast)
- ❓ [FAQ & Documentation](https://deveshlashkari.github.io/react-universal-toast#faq)

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT © [Devesh Lashkari](https://github.com/deveshlashkari)