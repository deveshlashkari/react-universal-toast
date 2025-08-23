import React from 'react';
import { ToastProvider, useToast, toast } from 'react-toast';
import 'react-toast/dist/styles.css';
import './App.css';

// Component using Hook API
function HookTest() {
  const { show, remove } = useToast();

  const handleSuccess = () => {
    console.log('Button clicked - showing success toast');
    const id = show('Hook Success Toast! 🎉', { type: 'success' });
    console.log('Toast ID:', id);
  };

  const handleError = () => {
    console.log('Button clicked - showing error toast');
    show('Hook Error Toast! ❌', { type: 'error' });
  };

  const handleInfo = () => {
    console.log('Button clicked - showing info toast');
    show('Hook Info Toast! ℹ️', { type: 'info' });
  };

  const handleDefault = () => {
    console.log('Button clicked - showing default toast');
    show('Hook Default Toast! 👋');
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px', borderRadius: '8px' }}>
      <h2>Hook API Test</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={handleSuccess} style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Success Toast
        </button>
        <button onClick={handleError} style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Error Toast
        </button>
        <button onClick={handleInfo} style={{ padding: '10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Info Toast
        </button>
        <button onClick={handleDefault} style={{ padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Default Toast
        </button>
      </div>
    </div>
  );
}

// Component using Utility API  
function UtilityTest() {
  const handleUtilitySuccess = () => {
    console.log('Utility success button clicked');
    toast.success('Utility Success Toast! ✨');
  };

  const handleUtilityError = () => {
    console.log('Utility error button clicked');
    toast.error('Utility Error Toast! 💥');
  };

  const handleUtilityInfo = () => {
    console.log('Utility info button clicked');
    toast.info('Utility Info Toast! 💡');
  };

  const handleMultiple = () => {
    console.log('Multiple toasts button clicked');
    toast.success('First toast! 🚀');
    setTimeout(() => toast.error('Second toast! 💥'), 200);
    setTimeout(() => toast.info('Third toast! 💡'), 400);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px', borderRadius: '8px' }}>
      <h2>Utility API Test</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={handleUtilitySuccess} style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          toast.success()
        </button>
        <button onClick={handleUtilityError} style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          toast.error()
        </button>
        <button onClick={handleUtilityInfo} style={{ padding: '10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          toast.info()
        </button>
        <button onClick={handleMultiple} style={{ padding: '10px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Multiple Toasts
        </button>
        <button onClick={() => toast.clear()} style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Clear All
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ToastProvider placement="top-right">
      <div className="App">
        <header className="App-header" style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
          <h1>🍞 React Toast Package Test</h1>
          <p>Testing the toast package with both Hook API and Utility API</p>
        </header>
        
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <HookTest />
          <UtilityTest />
          
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3>Debug Instructions:</h3>
            <ul>
              <li>Open browser console (F12) to see debug logs</li>
              <li>Click buttons to test different toast types</li>
              <li>Look for red border around toast container</li>
              <li>Check if yellow debug info appears</li>
              <li>Click on toasts to dismiss them</li>
            </ul>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
