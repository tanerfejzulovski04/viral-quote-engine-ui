// Application State
let currentUser = null;
let templates = [];
let assets = [];
let currentQuote = '';
let currentSize = 'instagram';
let brandKit = {
    logo: null,
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    accentColor: '#f59e0b'
};

// DOM Elements
const screens = {
    landing: document.getElementById('landing-screen'),
    register: document.getElementById('register-screen'),
    login: document.getElementById('login-screen'),
    dashboard: document.getElementById('dashboard-screen'),
    brandKit: document.getElementById('brand-kit-screen'),
    templates: document.getElementById('templates-screen'),
    templateEditor: document.getElementById('template-editor-screen'),
    quoteEditor: document.getElementById('quote-editor-screen'),
    assets: document.getElementById('assets-screen')
};

// Utility Functions
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconClass = type === 'success' ? 'fa-check-circle' : 
                     type === 'error' ? 'fa-exclamation-circle' : 
                     'fa-exclamation-triangle';
    
    toast.innerHTML = `
        <i class="fas ${iconClass} toast-icon"></i>
        <span class="toast-message">${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
    }
}

function updateNavigation() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (currentUser) {
        loginBtn.classList.add('hidden');
        registerBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        loginBtn.classList.remove('hidden');
        registerBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }
}

// Initialize Templates
function initializeTemplates() {
    templates = [
        {
            id: 1,
            name: "Motivational Quote",
            description: "Perfect for inspiring quotes with bold text",
            bgStyle: "gradient",
            textAlign: "center"
        },
        {
            id: 2,
            name: "Business Quote",
            description: "Professional look for business content",
            bgStyle: "solid",
            textAlign: "left"
        }
    ];
}

// Initialize Assets
function initializeAssets() {
    assets = [
        {
            id: 1,
            name: "Motivational Quote Export",
            size: "Instagram (1080x1080)",
            format: "PNG",
            date: new Date().toLocaleDateString(),
            preview: "Sample quote graphic"
        },
        {
            id: 2,
            name: "Business Quote Export",
            size: "Twitter (1200x675)",
            format: "PNG",
            date: new Date().toLocaleDateString(),
            preview: "Another quote graphic"
        }
    ];
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeTemplates();
    initializeAssets();
    
    // Navigation
    document.getElementById('get-started-btn').addEventListener('click', () => showScreen('register'));
    document.getElementById('login-btn').addEventListener('click', () => showScreen('login'));
    document.getElementById('register-btn').addEventListener('click', () => showScreen('register'));
    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('login');
    });
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('register');
    });
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('data-target');
            showScreen(target.replace('-screen', ''));
        });
    });
    
    // Registration
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;
        
        if (password !== confirm) {
            showToast('Passwords do not match', 'error');
            return;
        }
        
        currentUser = { name, email };
        showToast('Account created successfully!');
        updateNavigation();
        showScreen('dashboard');
    });
    
    // Login
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        
        currentUser = { name: 'User', email };
        showToast('Login successful!');
        updateNavigation();
        showScreen('dashboard');
    });
    
    // Dashboard Cards
    document.getElementById('brand-kit-card').addEventListener('click', () => showScreen('brandKit'));
    document.getElementById('templates-card').addEventListener('click', () => {
        showScreen('templates');
        renderTemplates();
    });
    document.getElementById('editor-card').addEventListener('click', () => {
        showScreen('quoteEditor');
        initializeQuoteEditor();
    });
    document.getElementById('assets-card').addEventListener('click', () => {
        showScreen('assets');
        renderAssets();
    });
    
    // Brand Kit
    document.getElementById('logo-upload').addEventListener('click', () => {
        document.getElementById('logo-file').click();
    });
    
    document.getElementById('logo-file').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                brandKit.logo = e.target.result;
                const preview = document.getElementById('logo-preview');
                preview.innerHTML = `<img src="${e.target.result}" alt="Logo Preview">`;
                preview.classList.remove('hidden');
                showToast('Logo uploaded successfully!');
            };
            reader.readAsDataURL(file);
        }
    });
    
    document.getElementById('save-brand-kit').addEventListener('click', function() {
        brandKit.primaryColor = document.getElementById('primary-color').value;
        brandKit.secondaryColor = document.getElementById('secondary-color').value;
        brandKit.accentColor = document.getElementById('accent-color').value;
        showToast('Brand kit saved successfully!');
    });
    
    // Templates
    document.getElementById('new-template-btn').addEventListener('click', () => {
        document.getElementById('template-editor-title').textContent = 'Create New Template';
        showScreen('templateEditor');
    });
    
    document.getElementById('save-template-btn').addEventListener('click', saveTemplate);
    
    // Quote Editor
    document.getElementById('ai-rewrite-btn').addEventListener('click', generateAIVariants);
    document.getElementById('export-quote-btn').addEventListener('click', showExportModal);
    
    // Size presets
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSize = this.getAttribute('data-size');
            updateCanvasSize();
        });
    });
    
    // Style controls
    document.getElementById('quote-text').addEventListener('input', updateCanvas);
    document.getElementById('font-size').addEventListener('input', updateCanvas);
    document.getElementById('text-color').addEventListener('input', updateCanvas);
    document.getElementById('bg-color').addEventListener('input', updateCanvas);
    
    // Export modal
    document.querySelector('.close-modal').addEventListener('click', closeExportModal);
    document.querySelectorAll('.export-btn').forEach(btn => {
        btn.addEventListener('click', exportImage);
    });
    
    // Close modal on background click
    document.getElementById('export-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeExportModal();
        }
    });
});

// Authentication
function logout() {
    currentUser = null;
    updateNavigation();
    showScreen('landing');
    showToast('Logged out successfully');
}

// Templates
function renderTemplates() {
    const grid = document.getElementById('templates-grid');
    grid.innerHTML = '';
    
    templates.forEach(template => {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.innerHTML = `
            <div class="template-preview-img">
                ${template.name} Preview
            </div>
            <div class="template-card-content">
                <h4>${template.name}</h4>
                <p>${template.description}</p>
                <div class="template-actions">
                    <button class="template-btn edit-btn" onclick="editTemplate(${template.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="template-btn delete-btn" onclick="deleteTemplate(${template.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function editTemplate(id) {
    const template = templates.find(t => t.id === id);
    if (template) {
        document.getElementById('template-name').value = template.name;
        document.getElementById('template-description').value = template.description;
        document.getElementById('bg-style').value = template.bgStyle;
        document.getElementById('text-align').value = template.textAlign;
        document.getElementById('template-editor-title').textContent = 'Edit Template';
        showScreen('templateEditor');
    }
}

function deleteTemplate(id) {
    if (confirm('Are you sure you want to delete this template?')) {
        templates = templates.filter(t => t.id !== id);
        renderTemplates();
        showToast('Template deleted successfully');
    }
}

function saveTemplate() {
    const name = document.getElementById('template-name').value;
    const description = document.getElementById('template-description').value;
    const bgStyle = document.getElementById('bg-style').value;
    const textAlign = document.getElementById('text-align').value;
    
    if (!name.trim()) {
        showToast('Please enter a template name', 'error');
        return;
    }
    
    const newTemplate = {
        id: templates.length + 1,
        name,
        description,
        bgStyle,
        textAlign
    };
    
    templates.push(newTemplate);
    showToast('Template saved successfully!');
    showScreen('templates');
    renderTemplates();
}

// Quote Editor
function initializeQuoteEditor() {
    const canvas = document.getElementById('quote-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set initial canvas size
    updateCanvasSize();
    updateCanvas();
}

function updateCanvasSize() {
    const canvas = document.getElementById('quote-canvas');
    const sizes = {
        instagram: { width: 1080, height: 1080 },
        twitter: { width: 1200, height: 675 },
        facebook: { width: 1200, height: 630 }
    };
    
    const size = sizes[currentSize];
    canvas.width = size.width;
    canvas.height = size.height;
    updateCanvas();
}

function updateCanvas() {
    const canvas = document.getElementById('quote-canvas');
    const ctx = canvas.getContext('2d');
    const text = document.getElementById('quote-text').value || 'Enter your quote here...';
    const fontSize = parseInt(document.getElementById('font-size').value);
    const textColor = document.getElementById('text-color').value;
    const bgColor = document.getElementById('bg-color').value;
    
    // Clear canvas
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text properties
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw text (with word wrapping)
    const maxWidth = canvas.width - 100;
    const lines = wrapText(ctx, text, maxWidth);
    const lineHeight = fontSize * 1.2;
    const startY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;
    
    lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
    });
}

function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];
    
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function generateAIVariants() {
    const originalText = document.getElementById('quote-text').value;
    if (!originalText.trim()) {
        showToast('Please enter some text first', 'warning');
        return;
    }
    
    const variants = [
        "Transform your dreams into reality with unwavering determination.",
        "Success isn't just about what you accomplish, but what you inspire others to do.",
        "Every expert was once a beginner who refused to give up.",
        "The future belongs to those who believe in the beauty of their dreams."
    ];
    
    const variantsContainer = document.getElementById('variants-list');
    variantsContainer.innerHTML = '';
    
    variants.forEach((variant, index) => {
        const variantElement = document.createElement('div');
        variantElement.className = 'variant-item';
        variantElement.innerHTML = `
            <div class="variant-text">"${variant}"</div>
            <div class="variant-meta">AI Generated • Variant ${index + 1}</div>
        `;
        
        variantElement.addEventListener('click', function() {
            document.querySelectorAll('.variant-item').forEach(v => v.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('quote-text').value = variant;
            updateCanvas();
        });
        
        variantsContainer.appendChild(variantElement);
    });
    
    document.getElementById('ai-variants').style.display = 'block';
    showToast('AI variants generated successfully!');
}

function showExportModal() {
    document.getElementById('export-modal').classList.add('active');
}

function closeExportModal() {
    document.getElementById('export-modal').classList.remove('active');
}

function exportImage(e) {
    const size = e.target.getAttribute('data-size');
    const format = e.target.getAttribute('data-format');
    
    // Update canvas for export size
    const originalSize = currentSize;
    currentSize = size;
    updateCanvasSize();
    
    // Create download
    const canvas = document.getElementById('quote-canvas');
    const dataURL = canvas.toDataURL(`image/${format}`);
    
    const link = document.createElement('a');
    link.download = `quote-${size}-${Date.now()}.${format}`;
    link.href = dataURL;
    link.click();
    
    // Add to assets
    const newAsset = {
        id: assets.length + 1,
        name: `Quote Export ${size}`,
        size: size === 'instagram' ? 'Instagram (1080x1080)' : 'Twitter/X (1200x675)',
        format: format.toUpperCase(),
        date: new Date().toLocaleDateString(),
        preview: document.getElementById('quote-text').value || 'Quote graphic'
    };
    assets.push(newAsset);
    
    // Restore original size
    currentSize = originalSize;
    updateCanvasSize();
    
    showToast(`${format.toUpperCase()} exported successfully for ${size}!`);
    closeExportModal();
}

// Assets Library
function renderAssets() {
    const grid = document.getElementById('assets-grid');
    grid.innerHTML = '';
    
    if (assets.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: #666;">
                <i class="fas fa-folder-open" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                <p>No assets yet. Create some quotes to see them here!</p>
            </div>
        `;
        return;
    }
    
    assets.forEach(asset => {
        const card = document.createElement('div');
        card.className = 'asset-card';
        card.innerHTML = `
            <div class="asset-preview">
                ${asset.preview}
            </div>
            <div class="asset-info">
                <h4>${asset.name}</h4>
                <div class="asset-meta">
                    ${asset.size} • ${asset.format} • ${asset.date}
                </div>
                <div class="asset-actions">
                    <button class="asset-btn download-btn" onclick="downloadAsset(${asset.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="asset-btn delete-asset-btn" onclick="deleteAsset(${asset.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function downloadAsset(id) {
    const asset = assets.find(a => a.id === id);
    if (asset) {
        showToast(`Downloading ${asset.name}...`);
        // In a real app, this would trigger an actual download
    }
}

function deleteAsset(id) {
    if (confirm('Are you sure you want to delete this asset?')) {
        assets = assets.filter(a => a.id !== id);
        renderAssets();
        showToast('Asset deleted successfully');
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e);
    showToast('An error occurred. Please try again.', 'error');
});

// Prevent console errors by handling missing elements gracefully
function safeEventListener(elementId, event, handler) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener(event, handler);
    }
}