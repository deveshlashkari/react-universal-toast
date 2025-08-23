# Testing Your React Toast Package Locally

## Method 1: Quick Demo (Recommended)

1. Open the `index.html` file in your browser:
   ```bash
   # Navigate to your project directory
   cd "c:\Users\deves\Desktop\Projects\react-toast"
   
   # Open in browser (or double-click index.html)
   start index.html
   ```

2. You'll see a complete demo with:
   - Success, Error, Info, and Default toast types
   - Hook API and Utility API examples
   - Different placement options
   - Auto-dismiss functionality

## Method 2: Test with a Real React Project

### Step 1: Pack your package locally
```bash
cd "c:\Users\deves\Desktop\Projects\react-toast"
npm pack
```
This creates a `.tgz` file like `react-toast-1.0.0.tgz`

### Step 2: Create a test React app
```bash
# Create a new React app
npx create-react-app test-toast-app
cd test-toast-app

# Install your local package
npm install ../react-toast/react-toast-1.0.0.tgz
```

### Step 3: Use in your test app
Replace `src/App.js` with:

```jsx
import React from 'react';
import { ToastProvider, useToast, toast } from 'react-toast';
import './App.css';

function ToastDemo() {
  const { show } = useToast();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Testing React Toast Package</h1>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '20px 0' }}>
          <button onClick={() => show("Success message!", { type: "success" })}>
            Success Toast
          </button>
          <button onClick={() => show("Error message!", { type: "error" })}>
            Error Toast
          </button>
          <button onClick={() => show("Info message!", { type: "info" })}>
            Info Toast
          </button>
          <button onClick={() => show("Default message!")}>
            Default Toast
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '20px 0' }}>
          <button onClick={() => toast.success("Utility Success!")}>
            toast.success()
          </button>
          <button onClick={() => toast.error("Utility Error!")}>
            toast.error()
          </button>
          <button onClick={() => toast.info("Utility Info!")}>
            toast.info()
          </button>
          <button onClick={() => toast.clear()}>
            Clear All
          </button>
        </div>

        <p>Click any toast to dismiss it!</p>
      </header>
    </div>
  );
}

function App() {
  return (
    <ToastProvider placement="top-right">
      <ToastDemo />
    </ToastProvider>
  );
}

export default App;
```

### Step 4: Run the test app
```bash
npm start
```

## Method 3: Test in Next.js

```bash
# Create Next.js app
npx create-next-app@latest test-toast-nextjs
cd test-toast-nextjs

# Install your package
npm install ../react-toast/react-toast-1.0.0.tgz
```

Replace `pages/_app.js` or `app/layout.js`:
```jsx
import { ToastProvider } from 'react-toast'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider placement="top-right">
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
```

## Method 4: Test in Vite

```bash
# Create Vite app
npm create vite@latest test-toast-vite -- --template react-ts
cd test-toast-vite
npm install

# Install your package
npm install ../react-toast/react-toast-1.0.0.tgz

# Run dev server
npm run dev
```

## What to Test:

✅ **Basic Functionality:**
- [ ] Toasts appear when triggered
- [ ] Different types show correct colors
- [ ] Click-to-dismiss works
- [ ] Multiple toasts stack properly

✅ **API Testing:**
- [ ] `useToast()` hook works in components
- [ ] `toast.success()`, `toast.error()`, etc. work
- [ ] `toast.clear()` removes all toasts
- [ ] Error handling when hook used outside provider

✅ **Placement Testing:**
- [ ] All 6 placement positions work correctly
- [ ] Toasts appear in the right location

✅ **TypeScript Testing:**
- [ ] IntelliSense works for all APIs
- [ ] No type errors when using the package
- [ ] Proper type checking for toast types

## Troubleshooting:

If you encounter issues:
1. Make sure to build the package: `npm run build`
2. Re-pack the package: `npm pack`
3. Reinstall in test project: `npm install ../path/to/react-toast-1.0.0.tgz`
4. Clear npm cache if needed: `npm cache clean --force`
