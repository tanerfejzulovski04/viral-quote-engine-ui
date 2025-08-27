// DOM elements
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author-text');
const previewText = document.getElementById('preview-text');
const previewAuthor = document.getElementById('preview-author');
const exportBtn = document.getElementById('export-btn');
const aiRewriteBtn = document.getElementById('ai-rewrite-btn');
const clearBtn = document.getElementById('clear-btn');
const aiDialog = document.getElementById('ai-dialog');
const dialogClose = document.getElementById('dialog-close');
const dialogCancel = document.getElementById('dialog-cancel');
const styleBtns = document.querySelectorAll('.style-btn');

// State
let currentQuote = '';
let currentAuthor = '';

// Initialize the app
function init() {
    // Update preview when text changes
    quoteText.addEventListener('input', updatePreview);
    authorText.addEventListener('input', updatePreview);
    
    // Button event listeners
    exportBtn.addEventListener('click', exportQuote);
    aiRewriteBtn.addEventListener('click', openAiDialogWithFocusTrap);
    clearBtn.addEventListener('click', clearText);
    
    // Dialog event listeners
    dialogClose.addEventListener('click', closeAiDialog);
    dialogCancel.addEventListener('click', closeAiDialog);
    
    // Style button event listeners
    styleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const style = e.target.getAttribute('data-style');
            applyAiRewrite(style);
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Close dialog on overlay click
    aiDialog.addEventListener('click', (e) => {
        if (e.target === aiDialog) {
            closeAiDialog();
        }
    });
    
    // Close dialog on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aiDialog.classList.contains('open')) {
            closeAiDialog();
        }
    });
    
    // Initial preview update
    updatePreview();
}

// Update the quote preview
function updatePreview() {
    const quote = quoteText.value.trim();
    const author = authorText.value.trim();
    
    currentQuote = quote;
    currentAuthor = author;
    
    if (quote) {
        previewText.textContent = `"${quote}"`;
        previewAuthor.textContent = author || 'Unknown';
        previewAuthor.style.display = 'block';
    } else {
        previewText.textContent = 'Your quote will appear here...';
        previewAuthor.style.display = 'none';
    }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
    
    // Ctrl/Cmd + S: Export quote
    if (ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault(); // Prevent browser's default save dialog
        exportQuote();
        return;
    }
    
    // Ctrl/Cmd + K: Open AI Rewrite dialog
    if (ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault(); // Prevent browser's default behavior
        openAiDialogWithFocusTrap();
        return;
    }
}

// Export quote functionality
function exportQuote() {
    if (!currentQuote.trim()) {
        alert('Please enter a quote to export.');
        quoteText.focus();
        return;
    }
    
    // Create export data
    const exportData = {
        quote: currentQuote,
        author: currentAuthor || 'Unknown',
        timestamp: new Date().toISOString(),
        source: 'Viral Quote Engine'
    };
    
    // Create and download file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `quote-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    // Show success message
    showNotification('Quote exported successfully!', 'success');
}

// Open AI Rewrite dialog
function openAiDialog() {
    if (!currentQuote.trim()) {
        alert('Please enter a quote first to use AI rewrite.');
        quoteText.focus();
        return;
    }
    
    aiDialog.classList.add('open');
    aiDialog.setAttribute('aria-hidden', 'false');
    
    // Focus the first style button
    const firstStyleBtn = aiDialog.querySelector('.style-btn');
    if (firstStyleBtn) {
        firstStyleBtn.focus();
    }
}

// Close AI Rewrite dialog
function closeAiDialog() {
    aiDialog.classList.remove('open');
    aiDialog.setAttribute('aria-hidden', 'true');
    
    // Return focus to the AI rewrite button
    aiRewriteBtn.focus();
}

// Apply AI rewrite (mock implementation)
function applyAiRewrite(style) {
    const originalQuote = currentQuote;
    let rewrittenQuote = '';
    
    // Mock AI rewrite based on style
    switch (style) {
        case 'inspirational':
            rewrittenQuote = `Believe in yourself: ${originalQuote} - Your potential is limitless!`;
            break;
        case 'witty':
            rewrittenQuote = `${originalQuote} (But seriously, who has time for that?)`;
            break;
        case 'profound':
            rewrittenQuote = `In the depths of existence, we find: "${originalQuote}" - A truth that transcends time.`;
            break;
        case 'casual':
            rewrittenQuote = `Hey, you know what they say: ${originalQuote}`;
            break;
        default:
            rewrittenQuote = originalQuote;
    }
    
    // Update the quote text
    quoteText.value = rewrittenQuote;
    updatePreview();
    
    // Show success message
    showNotification(`Quote rewritten in ${style} style!`, 'success');
    
    // Close dialog
    closeAiDialog();
}

// Clear all text
function clearText() {
    quoteText.value = '';
    authorText.value = '';
    updatePreview();
    quoteText.focus();
    
    showNotification('Text cleared', 'info');
}

// Show notification (simple implementation)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
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
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Trap focus in dialog for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// Enhanced open AI dialog with focus trap
function openAiDialogWithFocusTrap() {
    if (!currentQuote.trim()) {
        alert('Please enter a quote first to use AI rewrite.');
        quoteText.focus();
        return;
    }
    
    aiDialog.classList.add('open');
    aiDialog.setAttribute('aria-hidden', 'false');
    
    // Focus the first style button
    const firstStyleBtn = aiDialog.querySelector('.style-btn');
    if (firstStyleBtn) {
        firstStyleBtn.focus();
    }
    
    // Apply focus trap
    trapFocus(aiDialog.querySelector('.dialog'));
}

// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}