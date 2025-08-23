// React Universal Toast Demo Implementation
const { useState, useEffect, useRef } = React;

// Mock Toast Store (simplified version of your actual implementation)
class ToastStore {
    constructor() {
        this.toasts = [];
        this.subscribers = [];
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    show(message, options = {}) {
        const id = Date.now().toString();
        const toast = {
            id,
            message,
            type: options.type || 'default'
        };
        
        this.toasts.push(toast);
        this.notifySubscribers();
        return id;
    }

    remove(id) {
        this.toasts = this.toasts.filter(toast => toast.id !== id);
        this.notifySubscribers();
    }

    clear() {
        this.toasts = [];
        this.notifySubscribers();
    }

    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.toasts));
    }
}

const toastStore = new ToastStore();

// Toast Context
const ToastContext = React.createContext();

// Toast Provider Component
function ToastProvider({ children, placement = 'top-right' }) {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const unsubscribe = toastStore.subscribe(setToasts);
        return unsubscribe;
    }, []);

    const contextValue = {
        show: (message, options) => toastStore.show(message, options),
        remove: (id) => toastStore.remove(id),
        clear: () => toastStore.clear()
    };

    return React.createElement(ToastContext.Provider, { value: contextValue },
        children,
        React.createElement(ToastContainer, { toasts, placement })
    );
}

// Toast Container Component
function ToastContainer({ toasts, placement }) {
    const handleToastClick = (id) => {
        toastStore.remove(id);
    };

    return React.createElement('div', {
        className: `toast-container ${placement}`
    }, 
    toasts.map(toast =>
        React.createElement('div', {
            key: toast.id,
            className: `toast toast-${toast.type}`,
            onClick: () => handleToastClick(toast.id)
        }, toast.message)
    ));
}

// useToast Hook
function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

// Toast Utility
const toast = {
    success: (message) => toastStore.show(message, { type: 'success' }),
    error: (message) => toastStore.show(message, { type: 'error' }),
    info: (message) => toastStore.show(message, { type: 'info' }),
    show: (message) => toastStore.show(message, { type: 'default' }),
    clear: () => toastStore.clear()
};

// Demo App Component
function DemoApp() {
    const [currentPlacement, setCurrentPlacement] = useState('top-right');

    // Button event handlers
    useEffect(() => {
        const successBtn = document.getElementById('success-btn');
        const errorBtn = document.getElementById('error-btn');
        const infoBtn = document.getElementById('info-btn');
        const defaultBtn = document.getElementById('default-btn');
        const multipleBtn = document.getElementById('multiple-btn');
        const clearBtn = document.getElementById('clear-btn');

        const handleSuccess = () => toast.success('🎉 Success! Operation completed successfully.');
        const handleError = () => toast.error('❌ Error! Something went wrong. Please try again.');
        const handleInfo = () => toast.info('ℹ️ Info: Here\'s some useful information for you.');
        const handleDefault = () => toast.show('💬 This is a default toast message.');
        
        const handleMultiple = () => {
            toast.info('🚀 Starting process...');
            setTimeout(() => toast.success('✅ Step 1 completed'), 500);
            setTimeout(() => toast.success('✅ Step 2 completed'), 1000);
            setTimeout(() => toast.success('🎯 All done!'), 1500);
        };
        
        const handleClear = () => toast.clear();

        // Add event listeners
        if (successBtn) successBtn.addEventListener('click', handleSuccess);
        if (errorBtn) errorBtn.addEventListener('click', handleError);
        if (infoBtn) infoBtn.addEventListener('click', handleInfo);
        if (defaultBtn) defaultBtn.addEventListener('click', handleDefault);
        if (multipleBtn) multipleBtn.addEventListener('click', handleMultiple);
        if (clearBtn) clearBtn.addEventListener('click', handleClear);

        // Placement buttons
        const placementBtns = document.querySelectorAll('.placement-btn');
        placementBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const placement = e.target.dataset.placement;
                setCurrentPlacement(placement);
                
                // Update button styles
                placementBtns.forEach(b => b.classList.remove('bg-blue-600'));
                e.target.classList.add('bg-blue-600');
                
                toast.info(`📍 Placement changed to ${placement.replace('-', ' ')}`);
            });
        });

        // Cleanup
        return () => {
            if (successBtn) successBtn.removeEventListener('click', handleSuccess);
            if (errorBtn) errorBtn.removeEventListener('click', handleError);
            if (infoBtn) infoBtn.removeEventListener('click', handleInfo);
            if (defaultBtn) defaultBtn.removeEventListener('click', handleDefault);
            if (multipleBtn) multipleBtn.removeEventListener('click', handleMultiple);
            if (clearBtn) clearBtn.removeEventListener('click', handleClear);
        };
    }, []);

    return React.createElement(ToastProvider, { placement: currentPlacement });
}

// Render the demo app
const container = document.getElementById('toast-provider-container');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(DemoApp));
}

// Add some demo interactions
document.addEventListener('DOMContentLoaded', () => {
    // Welcome toast
    setTimeout(() => {
        toast.info('👋 Welcome to React Universal Toast demo! Try the buttons below.');
    }, 1000);
});
