const { useState, useEffect, useContext, createContext, createElement: e } = React;
const { createRoot } = ReactDOM;

// Toast Store Implementation
class ToastStore {
  constructor() {
    this.toasts = [];
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.toasts);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this.toasts));
  }

  show(message, opts = {}) {
    const id = Math.random().toString(36).slice(2);
    this.toasts.push({ 
      id, 
      message, 
      type: opts.type || 'default' 
    });
    this.notify();
    return id;
  }

  remove(id) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }

  clear() {
    this.toasts = [];
    this.notify();
  }
}

const toastStore = new ToastStore();

// Toast Context
const ToastContext = createContext(null);

// Toast Provider Component
function ToastProvider({ children, placement = 'top-right' }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsub = toastStore.subscribe(setToasts);
    return unsub;
  }, []);

  const contextValue = {
    show: toastStore.show.bind(toastStore),
    remove: toastStore.remove.bind(toastStore)
  };

  return e(ToastContext.Provider, { value: contextValue },
    children,
    e('div', 
      { className: `toast-container toast-${placement}` },
      toasts.map(t => 
        e('div', {
          key: t.id,
          className: `toast toast-${t.type}`,
          onClick: () => toastStore.remove(t.id)
        }, t.message)
      )
    )
  );
}

// useToast Hook
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

// Toast utility
const toast = {
  show: (msg, opts) => toastStore.show(msg, opts),
  success: (msg) => toastStore.show(msg, { type: 'success' }),
  error: (msg) => toastStore.show(msg, { type: 'error' }),
  info: (msg) => toastStore.show(msg, { type: 'info' }),
  remove: (id) => toastStore.remove(id),
  clear: () => toastStore.clear()
};

// Demo components
function HookDemo() {
  const { show, remove } = useToast();

  const showSuccessToast = () => {
    show("✅ Success! Operation completed successfully!", { type: "success" });
  };

  const showErrorToast = () => {
    show("❌ Error! Something went wrong!", { type: "error" });
  };

  const showInfoToast = () => {
    show("ℹ️ Info: Here's some useful information", { type: "info" });
  };

  const showDefaultToast = () => {
    show("👋 Hello from React Toast!");
  };

  const showAutoRemoveToast = () => {
    const id = show("🔄 This will auto-remove in 3 seconds", { type: "info" });
    setTimeout(() => remove(id), 3000);
  };

  return (
    <div style={{ padding: '20px', borderBottom: '2px solid #eee' }}>
      <h2>Hook API Demo</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button onClick={showSuccessToast} style={buttonStyle('success')}>
          Success Toast
        </button>
        <button onClick={showErrorToast} style={buttonStyle('error')}>
          Error Toast
        </button>
        <button onClick={showInfoToast} style={buttonStyle('info')}>
          Info Toast
        </button>
        <button onClick={showDefaultToast} style={buttonStyle('default')}>
          Default Toast
        </button>
        <button onClick={showAutoRemoveToast} style={buttonStyle('warning')}>
          Auto-Remove Toast
        </button>
      </div>
    </div>
  );
}

function UtilityDemo() {
  const showMultipleToasts = () => {
    toast.success("First toast! 🚀");
    setTimeout(() => toast.error("Second toast! 💥"), 200);
    setTimeout(() => toast.info("Third toast! 💡"), 400);
    setTimeout(() => toast.show("Fourth toast! 🎉"), 600);
  };

  return (
    <div style={{ padding: '20px', borderBottom: '2px solid #eee' }}>
      <h2>Utility API Demo</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button onClick={() => toast.success("Utility Success! 🎉")} style={buttonStyle('success')}>
          toast.success()
        </button>
        <button onClick={() => toast.error("Utility Error! 💥")} style={buttonStyle('error')}>
          toast.error()
        </button>
        <button onClick={() => toast.info("Utility Info! 💡")} style={buttonStyle('info')}>
          toast.info()
        </button>
        <button onClick={showMultipleToasts} style={buttonStyle('special')}>
          Show Multiple Toasts
        </button>
        <button onClick={() => toast.clear()} style={buttonStyle('clear')}>
          Clear All Toasts
        </button>
      </div>
    </div>
  );
}

function PlacementDemo() {
  const placements = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
  const [currentPlacement, setCurrentPlacement] = useState('top-right');

  return (
    <div style={{ padding: '20px' }}>
      <h2>Placement Demo</h2>
      <p>Current placement: <strong>{currentPlacement}</strong></p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {placements.map(placement =>
          <button
            key={placement}
            onClick={() => setCurrentPlacement(placement)}
            style={{
              ...buttonStyle('placement'),
              backgroundColor: placement === currentPlacement ? '#0f766e' : '#14b8a6'
            }}
          >
            {placement}
          </button>
        )}
      </div>
      <button 
        onClick={() => toast.success(`Toast from ${currentPlacement}! 📍`)}
        style={buttonStyle('success')}
      >
        Test Current Placement
      </button>
    </div>
  );
}

function App() {
  const [placement, setPlacement] = useState('top-right');

  return (
    <ToastProvider placement={placement}>
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', minHeight: '100vh' }}>
        <header style={{ padding: '30px 20px', textAlign: 'center', background: '#f8fafc', borderBottom: '3px solid #e2e8f0' }}>
          <h1 style={{ margin: 0, color: '#1e293b', fontSize: '2.5rem' }}>🍞 React Toast Package Demo</h1>
          <p style={{ margin: '10px 0 0 0', color: '#64748b', fontSize: '1.1rem' }}>
            Test all the features of your toast notification system!
          </p>
        </header>
        
        <div style={{ padding: '20px', background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
          <h3>Global Placement Settings</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].map(p =>
              <button
                key={p}
                onClick={() => setPlacement(p)}
                style={{
                  ...buttonStyle('placement'),
                  backgroundColor: placement === p ? '#0f766e' : '#14b8a6'
                }}
              >
                {p}
              </button>
            )}
          </div>
          <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem', color: '#64748b' }}>
            Current: <strong>{placement}</strong>
          </p>
        </div>
        
        <HookDemo />
        <UtilityDemo />
        <PlacementDemo />
        
        <footer style={{ padding: '30px 20px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderTop: '2px solid #e2e8f0' }}>
          <p><strong>💡 Tip:</strong> Click on any toast to dismiss it manually</p>
          <p>This demo shows both Hook API and Utility API usage</p>
        </footer>
      </div>
    </ToastProvider>
  );
}

function buttonStyle(type) {
  const styles = {
    success: { backgroundColor: '#10b981', color: 'white' },
    error: { backgroundColor: '#ef4444', color: 'white' },
    info: { backgroundColor: '#3b82f6', color: 'white' },
    default: { backgroundColor: '#6b7280', color: 'white' },
    warning: { backgroundColor: '#f59e0b', color: 'white' },
    special: { backgroundColor: '#8b5cf6', color: 'white' },
    clear: { backgroundColor: '#64748b', color: 'white' },
    placement: { backgroundColor: '#14b8a6', color: 'white' }
  };

  return {
    ...(styles[type] || { backgroundColor: '#6b7280', color: 'white' }),
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  };
}

// Auto-render when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(React.createElement(App));
  }
});
