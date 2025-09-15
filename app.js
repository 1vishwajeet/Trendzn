// TrendzN Dark Theme Gen-Z Interactive Experience
class TrendzNGenZ {
    constructor() {
        this.currentSection = 'home';
        this.isAdmin = false;
        this.init();
    }
    
    init() {
        console.log('%c🔥 TrendzN Gen-Z Loading...', 'color: #00ffff; font-size: 20px; font-weight: bold;');
        
        this.checkAdminAccess();
        this.setupEventListeners();
        this.startAnimations();
        
        setTimeout(() => {
            this.showNotification('🔥 Welcome to TrendzN! Let\'s go viral!', 'success');
            this.animatePageLoad();
        }, 1000);
        
        console.log('%c✅ TrendzN Ready to Create Viral Content!', 'color: #00ff00; font-size: 16px;');
    }
    
    checkAdminAccess() {
        const adminChecks = [
            localStorage.getItem('userRole') === 'admin',
            window.location.search.includes('admin=true'),
            window.location.hash === '#admin-access'
        ];
        
        this.isAdmin = adminChecks.some(Boolean);
        
        if (this.isAdmin) {
            document.body.classList.add('admin-mode');
            console.log('👑 Admin mode activated');
        }
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.navigateToSection(section);
                this.addClickEffect(e.currentTarget);
            });
        });
        
        // Hero buttons
        document.getElementById('startBtn')?.addEventListener('click', (e) => {
            this.addClickEffect(e.target);
            this.navigateToSection('templates');
            this.showNotification('🚀 Let\'s create viral content!', 'success');
        });
        
        document.getElementById('exploreBtn')?.addEventListener('click', (e) => {
            this.addClickEffect(e.target);
            this.navigateToSection('trending');
            this.showNotification('📈 Exploring viral trends...', 'success');
        });
        
        // Create meme buttons
        document.querySelectorAll('.trend-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.addClickEffect(e.target);
                this.navigateToSection('editor');
                const trendTitle = e.target.closest('.trend-item').querySelector('h3').textContent;
                this.showNotification(`🎨 Creating meme: ${trendTitle}`, 'success');
            });
        });
        
        // Template use buttons
        document.querySelectorAll('.use-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.addClickEffect(e.target);
                this.navigateToSection('editor');
                const templateName = e.target.closest('.template-card').querySelector('h4').textContent;
                this.showNotification(`🎭 Using template: ${templateName}`, 'success');
            });
        });
        
        // Editor tools
        document.querySelectorAll('.tool').forEach(tool => {
            tool.addEventListener('click', (e) => {
                document.querySelectorAll('.tool').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.showNotification(`🛠️ Selected: ${e.target.textContent}`, 'info');
            });
        });
        
        // Export buttons
        document.querySelectorAll('.export-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.addClickEffect(e.target);
                if (e.target.textContent.includes('Download')) {
                    this.downloadMeme();
                } else {
                    this.shareMeme();
                }
            });
        });
        
        // Upload button
        document.querySelector('.upload-btn')?.addEventListener('click', (e) => {
            this.addClickEffect(e.target);
            this.showNotification('📤 Upload feature coming soon!', 'info');
        });
        
        // Start button in editor
        document.querySelector('.start-btn')?.addEventListener('click', (e) => {
            this.addClickEffect(e.target);
            this.navigateToSection('templates');
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1': e.preventDefault(); this.navigateToSection('home'); break;
                    case '2': e.preventDefault(); this.navigateToSection('trending'); break;
                    case '3': e.preventDefault(); this.navigateToSection('templates'); break;
                    case '4': e.preventDefault(); this.navigateToSection('editor'); break;
                }
            }
        });
    }
    
    navigateToSection(sectionName) {
        console.log(`🧭 Navigating to: ${sectionName}`);
        
        this.currentSection = sectionName;
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');
        
        // Update sections with animation
        const currentActive = document.querySelector('.section.active');
        const targetSection = document.getElementById(sectionName);
        
        if (currentActive && targetSection) {
            currentActive.style.opacity = '0';
            currentActive.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                currentActive.classList.remove('active');
                targetSection.classList.add('active');
                
                targetSection.style.opacity = '0';
                targetSection.style.transform = 'translateY(20px)';
                
                requestAnimationFrame(() => {
                    targetSection.style.transition = 'all 0.6s ease';
                    targetSection.style.opacity = '1';
                    targetSection.style.transform = 'translateY(0)';
                });
                
                this.animateSectionElements(targetSection);
            }, 300);
        }
    }
    
    animateSectionElements(section) {
        const elements = section.querySelectorAll('.trend-item, .template-card, .feature-card, .admin-card');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    addClickEffect(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }
    
    startAnimations() {
        // Animate stats on page load
        this.animateStats();
        
        // Start particle animation
        this.animateParticles();
        
        // Animate floating icons
        this.animateFloatingIcons();
        
        // Setup hover effects
        this.setupHoverEffects();
    }
    
    animatePageLoad() {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    this.countUpAnimation(entry.target);
                    entry.target.dataset.animated = 'true';
                }
            });
        });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
    
    countUpAnimation(element) {
        const text = element.textContent;
        
        if (text.includes('∞')) {
            let count = 0;
            const animate = () => {
                element.textContent = count > 999 ? '∞' : count;
                count += 25;
                if (count <= 999) {
                    setTimeout(animate, 50);
                }
            };
            animate();
        } else {
            const finalNumber = parseInt(text) || 100;
            let current = 0;
            const increment = finalNumber / 30;
            
            const animate = () => {
                current += increment;
                if (current >= finalNumber) {
                    element.textContent = text;
                } else {
                    element.textContent = Math.floor(current) + (text.includes('%') ? '%' : text.includes('+') ? '+' : '');
                    requestAnimationFrame(animate);
                }
            };
            animate();
        }
    }
    
    animateParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const colors = ['#00ffff', '#ff0080', '#8000ff', '#00ff00'];
            particle.style.background = colors[index % colors.length];
            
            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
        });
    }
    
    animateFloatingIcons() {
        const icons = document.querySelectorAll('.float-icon');
        icons.forEach((icon, index) => {
            icon.style.animationDelay = index * 2 + 's';
        });
    }
    
    setupHoverEffects() {
        // Add ripple effect to buttons
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    left: ${e.clientX - rect.left - size/2}px;
                    top: ${e.clientY - rect.top - size/2}px;
                    pointer-events: none;
                `;
                
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Enhanced hover effects for cards
        document.querySelectorAll('.trend-item, .template-card, .feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.filter = 'brightness(1.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.filter = '';
            });
        });
    }
    
    downloadMeme() {
        this.showNotification('💾 Preparing your viral masterpiece...', 'info');
        
        setTimeout(() => {
            this.showNotification('✅ Meme downloaded in HD!', 'success');
            
            // Simulate download
            const link = document.createElement('a');
            link.download = `TrendzN_Meme_${Date.now()}.png`;
            link.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
            link.click();
        }, 2000);
    }
    
    shareMeme() {
        this.showNotification('🚀 Sharing to social media...', 'info');
        
        setTimeout(() => {
            this.showNotification('📱 Meme shared! Get ready to go viral! 🔥', 'success');
        }, 1500);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️'
        };
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.2rem;">${icons[type]}</span>
                <span>${message}</span>
            </div>
        `;
        
        const container = document.getElementById('notifications');
        if (container) {
            container.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 400);
            }, 4000);
        }
    }
}

// Global admin functions
window.enableAdmin = function() {
    localStorage.setItem('userRole', 'admin');
    document.body.classList.add('admin-mode');
    
    console.log('%c👑 ADMIN MODE ACTIVATED!', 'color: #ff0080; font-size: 18px; font-weight: bold;');
    
    if (window.trendzNApp) {
        window.trendzNApp.isAdmin = true;
        window.trendzNApp.showNotification('👑 Admin powers unlocked!', 'success');
    }
};

window.disableAdmin = function() {
    localStorage.removeItem('userRole');
    document.body.classList.remove('admin-mode');
    
    if (window.trendzNApp) {
        window.trendzNApp.isAdmin = false;
        window.trendzNApp.showNotification('👤 Back to user mode', 'info');
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.trendzNApp = new TrendzNGenZ();
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Console branding
    console.log('%c🔥 TRENDZN GEN-Z PLATFORM 🔥', 'color: #00ffff; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00ffff;');
    console.log('%c✨ Dark Theme + Attractive Graphics Loaded', 'color: #ff0080; font-size: 16px;');
    console.log('%c🎮 Commands: enableAdmin() | Ctrl+1,2,3,4 for navigation', 'color: #8000ff; font-size: 12px;');
});

export { TrendzNGenZ };

   