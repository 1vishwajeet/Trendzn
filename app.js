// TrendzN - Simple & Working JavaScript
class TrendzNApp {
    constructor() {
        this.currentSection = 'home';
        this.isAdmin = false;
        this.init();
    }
    
    init() {
        console.log('🚀 TrendzN Platform Loading...');
        this.checkAdminAccess();
        this.setupEventListeners();
        this.showNotification('🔥 Welcome to TrendzN!', 'success');
        console.log('✅ TrendzN Platform Ready!');
    }
    
    checkAdminAccess() {
        const adminTriggers = [
            localStorage.getItem('userRole') === 'admin',
            window.location.hash === '#admin-access',
            window.location.search.includes('admin=true')
        ];
        
        this.isAdmin = adminTriggers.some(trigger => trigger);
        
        if (this.isAdmin) {
            document.body.classList.add('admin-mode');
            this.showNotification('👑 Admin access granted!', 'success');
        }
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.navigateToSection(section);
            });
        });
        
        // Hero buttons
        document.getElementById('startCreating')?.addEventListener('click', () => {
            this.navigateToSection('templates');
            this.showNotification('🚀 Let\'s create something viral!', 'success');
        });
        
        document.getElementById('exploreTrending')?.addEventListener('click', () => {
            this.navigateToSection('trending');
            this.showNotification('🔥 Exploring viral trends...', 'success');
        });
        
        // Create meme buttons
        document.querySelectorAll('.create-meme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.navigateToSection('editor');
                this.showNotification('🎨 Opening meme editor...', 'success');
            });
        });
        
        // Use template buttons
        document.querySelectorAll('.use-template').forEach(btn => {
            btn.addEventListener('click', () => {
                this.navigateToSection('editor');
                this.showNotification('🎭 Template loaded in editor!', 'success');
            });
        });
        
        // Editor tools
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.showNotification(`🛠️ Tool selected: ${e.target.textContent}`, 'info');
            });
        });
        
        // Color picker
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const colorClass = e.target.classList[1];
                this.showNotification(`🎨 Color changed to ${colorClass}`, 'info');
            });
        });
        
        // Export buttons
        document.querySelectorAll('.export-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.textContent.includes('Download')) {
                    this.downloadMeme();
                } else {
                    this.shareMeme();
                }
            });
        });
        
        // Filter tabs
        document.querySelectorAll('.filter-tab, .template-cat').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const parentSelector = e.target.classList.contains('filter-tab') ? '.filter-tab' : '.template-cat';
                document.querySelectorAll(parentSelector).forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                const filter = e.target.dataset.filter || e.target.dataset.category || e.target.textContent;
                this.showNotification(`📊 Filtering by: ${filter}`, 'info');
            });
        });
        
        // Upload button
        document.querySelector('.upload-btn')?.addEventListener('click', () => {
            this.showNotification('📤 Upload feature coming soon!', 'info');
        });
        
        // Start button in editor
        document.querySelector('.start-btn')?.addEventListener('click', () => {
            this.navigateToSection('templates');
        });
        
        // Search functionality
        document.querySelector('.search-input')?.addEventListener('input', (e) => {
            if (e.target.value) {
                this.showNotification(`🔍 Searching for: ${e.target.value}`, 'info');
            }
        });
    }
    
    navigateToSection(sectionName) {
        console.log(`📍 Navigating to: ${sectionName}`);
        this.currentSection = sectionName;
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');
        
        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName)?.classList.add('active');
        
        // Show section-specific notification
        const sectionNames = {
            home: '🏠 Welcome Home',
            trending: '📈 Trending Content',
            templates: '🎭 Meme Templates',
            editor: '✨ Meme Studio',
            admin: '👑 Admin Dashboard'
        };
        
        this.showNotification(sectionNames[sectionName] || 'Section loaded', 'info');
    }
    
    downloadMeme() {
        this.showNotification('💾 Downloading your masterpiece...', 'success');
        setTimeout(() => {
            this.showNotification('✅ Download complete!', 'success');
        }, 1500);
    }
    
    shareMeme() {
        this.showNotification('🚀 Sharing to social media...', 'success');
        setTimeout(() => {
            this.showNotification('📱 Shared successfully! Going viral! 🔥', 'success');
        }, 2000);
    }
    
    showNotification(message, type = 'info') {
        const container = document.getElementById('notifications');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>${this.getNotificationIcon(type)}</span>
                <span>${message}</span>
            </div>
        `;
        
        container.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    getNotificationIcon(type) {
        switch(type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            default: return 'ℹ️';
        }
    }
}

// Global admin functions
window.enableAdmin = function() {
    localStorage.setItem('userRole', 'admin');
    document.body.classList.add('admin-mode');
    console.log('👑 Admin mode enabled');
    
    if (window.trendzNApp) {
        window.trendzNApp.isAdmin = true;
        window.trendzNApp.showNotification('👑 Admin powers activated!', 'success');
    }
};

window.disableAdmin = function() {
    localStorage.removeItem('userRole');
    document.body.classList.remove('admin-mode');
    console.log('👤 Admin mode disabled');
    
    if (window.trendzNApp) {
        window.trendzNApp.isAdmin = false;
        window.trendzNApp.showNotification('👤 Admin mode disabled', 'info');
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.trendzNApp = new TrendzNApp();
    
    // Console styling
    console.log('%c🔥 TrendzN Platform Loaded! 🔥', 'color: #00f5ff; font-size: 20px; font-weight: bold;');
    console.log('%c✨ Type enableAdmin() for admin access', 'color: #ff006e; font-size: 14px;');
    
    // Add some interactive animations
    document.querySelectorAll('.preview-card, .feature-card, .trending-card, .template-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add floating animation to logo
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        setInterval(() => {
            logoIcon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                logoIcon.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        }, 3000);
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrendzNApp;
}