// ========================================
// MODERN TOAST NOTIFICATION SYSTEM
// ========================================
// Replaces old-school alert() with beautiful toast notifications

class ToastNotification {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        // Create toast container if it doesn't exist
        if (!document.getElementById('toast-container')) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
            this.injectStyles();
        } else {
            this.container = document.getElementById('toast-container');
        }
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
                pointer-events: none;
            }

            .toast {
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                padding: 16px 20px;
                display: flex;
                align-items: flex-start;
                gap: 12px;
                min-width: 300px;
                max-width: 400px;
                animation: slideIn 0.3s ease-out;
                pointer-events: auto;
                border-left: 4px solid #667eea;
                position: relative;
                overflow: hidden;
            }

            .toast::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                height: 4px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                animation: progress linear;
            }

            .toast.success {
                border-left-color: #4caf50;
            }

            .toast.success::before {
                background: #4caf50;
            }

            .toast.error {
                border-left-color: #f44336;
            }

            .toast.error::before {
                background: #f44336;
            }

            .toast.warning {
                border-left-color: #ff9800;
            }

            .toast.warning::before {
                background: #ff9800;
            }

            .toast.info {
                border-left-color: #2196f3;
            }

            .toast.info::before {
                background: #2196f3;
            }

            .toast-icon {
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }

            .toast-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .toast-title {
                font-weight: 600;
                font-size: 14px;
                color: #333;
                margin: 0;
            }

            .toast-message {
                font-size: 13px;
                color: #666;
                margin: 0;
                line-height: 1.5;
                white-space: pre-line;
            }

            .toast-close {
                flex-shrink: 0;
                background: none;
                border: none;
                color: #999;
                cursor: pointer;
                font-size: 20px;
                line-height: 1;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: color 0.2s ease;
            }

            .toast-close:hover {
                color: #333;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            @keyframes progress {
                from {
                    width: 100%;
                }
                to {
                    width: 0%;
                }
            }

            .toast.removing {
                animation: slideOut 0.3s ease-out forwards;
            }

            @media (max-width: 768px) {
                .toast-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }

                .toast {
                    min-width: auto;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    show(options) {
        const {
            type = 'info',
            title = '',
            message = '',
            duration = 5000,
            closable = true
        } = options;

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        // Icon based on type
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        // Build toast HTML
        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                ${message ? `<div class="toast-message">${message}</div>` : ''}
            </div>
            ${closable ? '<button class="toast-close" aria-label="Close notification">&times;</button>' : ''}
        `;

        // Add progress animation
        if (duration > 0) {
            toast.style.setProperty('--duration', `${duration}ms`);
            toast.querySelector('::before')?.style.setProperty('animation-duration', `${duration}ms`);
        }

        // Add to container
        this.container.appendChild(toast);

        // Close button handler
        if (closable) {
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => this.remove(toast));
        }

        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => this.remove(toast), duration);
        }

        return toast;
    }

    remove(toast) {
        toast.classList.add('removing');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    success(title, message, duration = 5000) {
        return this.show({ type: 'success', title, message, duration });
    }

    error(title, message, duration = 7000) {
        return this.show({ type: 'error', title, message, duration });
    }

    warning(title, message, duration = 6000) {
        return this.show({ type: 'warning', title, message, duration });
    }

    info(title, message, duration = 5000) {
        return this.show({ type: 'info', title, message, duration });
    }

    // Helper for quick messages without title
    message(message, type = 'info', duration = 5000) {
        return this.show({ type, message, duration });
    }
}

// Initialize and export globally
window.Toast = new ToastNotification();

// Convenience global functions
window.showToast = (options) => window.Toast.show(options);
window.showSuccess = (title, message) => window.Toast.success(title, message);
window.showError = (title, message) => window.Toast.error(title, message);
window.showWarning = (title, message) => window.Toast.warning(title, message);
window.showInfo = (title, message) => window.Toast.info(title, message);
