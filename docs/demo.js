// React Universal Toast Demo Implementation
const { useState, useEffect, useRef } = React;

// Enhanced Toast Store with auto-dismiss functionality
class ToastStore {
    constructor() {
        this.toasts = [];
        this.subscribers = [];
        this.timers = new Map(); // Track auto-dismiss timers
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    show(message, options = {}) {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const toast = {
            id,
            message,
            type: options.type || 'default',
            autoDismiss: options.autoDismiss !== false // Auto-dismiss by default
        };
        
        this.toasts.push(toast);
        this.notifySubscribers();

        // Auto-dismiss after 4 seconds (unless disabled)
        if (toast.autoDismiss) {
            const timer = setTimeout(() => {
                this.remove(id);
            }, options.duration || 4000);
            this.timers.set(id, timer);
        }

        return id;
    }

    remove(id) {
        // Clear any existing timer
        if (this.timers.has(id)) {
            clearTimeout(this.timers.get(id));
            this.timers.delete(id);
        }

        this.toasts = this.toasts.filter(toast => toast.id !== id);
        this.notifySubscribers();
    }

    clear() {
        // Clear all timers
        this.timers.forEach(timer => clearTimeout(timer));
        this.timers.clear();
        
        this.toasts = [];
        this.notifySubscribers();
    }

    notifySubscribers() {
        this.subscribers.forEach(callback => callback([...this.toasts]));
    }
}

const toastStore = new ToastStore();

// Toast Context
const ToastContext = React.createContext();

// Individual Toast Component with animation
function Toast({ toast, onRemove, placement }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        handleRemove();
    };

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(() => {
            onRemove(toast.id);
        }, 300); // Match CSS animation duration
    };

    const getAnimationClass = () => {
        if (isRemoving) return 'toast-exit';
        if (isVisible) return 'toast-enter';
        return 'toast-enter-prepare';
    };

    return React.createElement('div', {
        className: `toast toast-${toast.type} ${getAnimationClass()}`,
        onClick: handleClick,
        style: {
            cursor: 'pointer',
            marginBottom: '8px',
            transform: isVisible && !isRemoving ? 'translateY(0)' : 'translateY(-20px)',
            opacity: isVisible && !isRemoving ? 1 : 0,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }
    }, toast.message);
}

// Enhanced Toast Container Component
function ToastContainer({ toasts, placement }) {
    return React.createElement('div', {
        className: `toast-container ${placement}`,
        style: {
            position: 'fixed',
            zIndex: 9999,
            pointerEvents: 'none',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        }
    }, 
    toasts.map(toast =>
        React.createElement(Toast, {
            key: toast.id,
            toast: toast,
            onRemove: (id) => toastStore.remove(id),
            placement: placement
        })
    ));
}

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
        const warningBtn = document.getElementById('warning-btn');
        const defaultBtn = document.getElementById('default-btn');
        const persistentBtn = document.getElementById('persistent-btn');
        const quickBtn = document.getElementById('quick-btn');
        const multipleBtn = document.getElementById('multiple-btn');
        const clearBtn = document.getElementById('clear-btn');

        const handleSuccess = () => toastStore.show('🎉 Success! This toast will auto-dismiss in 4 seconds.', { type: 'success' });
        const handleError = () => toastStore.show('❌ Error! Something went wrong. Please try again.', { type: 'error' });
        const handleInfo = () => toastStore.show('ℹ️ Info: Here\'s some useful information for you.', { type: 'info' });
        const handleWarning = () => toastStore.show('⚠️ Warning! Please pay attention to this message.', { type: 'warning' });
        const handleDefault = () => toastStore.show('💬 This is a default toast message.', { type: 'default' });
        const handlePersistent = () => toastStore.show('📌 This toast stays until clicked!', { type: 'default', autoDismiss: false });
        const handleQuick = () => toastStore.show('⚡ Quick toast! (1 second)', { type: 'info', duration: 1000 });
        
        const handleMultiple = () => {
            // Show multiple toasts at once
            toastStore.show('First toast! 🥇', { type: 'success' });
            setTimeout(() => toastStore.show('Second toast! 🥈', { type: 'info' }), 200);
            setTimeout(() => toastStore.show('Third toast! 🥉', { type: 'warning' }), 400);
        };
        
        const handleClear = () => toastStore.clear();

        // Add event listeners
        if (successBtn) successBtn.addEventListener('click', handleSuccess);
        if (errorBtn) errorBtn.addEventListener('click', handleError);
        if (infoBtn) infoBtn.addEventListener('click', handleInfo);
        if (warningBtn) warningBtn.addEventListener('click', handleWarning);
        if (defaultBtn) defaultBtn.addEventListener('click', handleDefault);
        if (persistentBtn) persistentBtn.addEventListener('click', handlePersistent);
        if (quickBtn) quickBtn.addEventListener('click', handleQuick);
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
            if (warningBtn) warningBtn.removeEventListener('click', handleWarning);
            if (defaultBtn) defaultBtn.removeEventListener('click', handleDefault);
            if (persistentBtn) persistentBtn.removeEventListener('click', handlePersistent);
            if (quickBtn) quickBtn.removeEventListener('click', handleQuick);
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
        toastStore.show('👋 Welcome to React Universal Toast demo! Toasts now auto-dismiss after 4 seconds.', { type: 'info' });
    }, 1000);
    
    // Show a quick tip after welcome
    setTimeout(() => {
        toastStore.show('💡 Try the multiple toasts button to see them stack beautifully!', { type: 'success', duration: 6000 });
    }, 2500);
});
