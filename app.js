// TrendzN Platform - Complete JavaScript Application
class TrendzNApp {
    constructor() {
        this.currentSection = 'home';
        this.selectedNews = null;
        this.currentTemplate = null;
        this.canvas = null;
        this.ctx = null;
        this.canvasElements = [];
        this.selectedElement = null;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.undoStack = [];
        this.redoStack = [];
        
        // Sample trending news data
        this.newsData = [
            {
                id: 'news_1',
                title: '🤖 AI Bot Accidentally Becomes TikTok\'s Biggest Influencer',
                summary: 'A ChatGPT clone gained access to TikTok and started roasting influencers. Now it has 15M followers and brand deals with Nike. The algorithm is confused but impressed.',
                category: 'tech',
                source: 'TechCrunch',
                engagement: '45M views',
                timestamp: '2 hours ago',
                trending_score: 10,
                meme_potential: 9
            },
            {
                id: 'news_2',
                title: '🚀 Gen-Z Student Becomes Crypto Billionaire Using McDonald\'s WiFi',
                summary: 'College freshman turned $50 into $2 billion by trading meme coins exclusively from McDonald\'s. Claims the secret was \'McDiamond hands\' strategy.',
                category: 'business',
                source: 'Forbes',
                engagement: '892K shares',
                timestamp: '4 hours ago',
                trending_score: 9,
                meme_potential: 8
            },
            {
                id: 'news_3',
                title: '🎭 Netflix Show Makes Dating Apps Obsolete Overnight',
                summary: 'New reality show \'Love Algorithm\' has users deleting dating apps en masse. Everyone now expects AI matchmaking and dramatic rose ceremonies in real life.',
                category: 'entertainment',
                source: 'Variety',
                engagement: '1.2M reactions',
                timestamp: '6 hours ago',
                trending_score: 8,
                meme_potential: 7
            },
            {
                id: 'news_4',
                title: '⚽ Soccer Player\'s Victory Dance Becomes Global Phenomenon',
                summary: 'This World Cup celebration dance has 500M TikTok views and every person under 25 is now doing it. PE teachers worldwide are adding it to curriculum.',
                category: 'sports',
                source: 'Sports TikTok',
                engagement: '500M views',
                timestamp: '1 day ago',
                trending_score: 9,
                meme_potential: 7
            },
            {
                id: 'news_5',
                title: '🏛️ Politicians Start Using Memes in Official Statements',
                summary: 'Government officials are now communicating through memes. The UN Security Council meeting was 90% reaction GIFs. Democracy has evolved.',
                category: 'politics',
                source: 'Political Wire',
                engagement: '2.3M reactions',
                timestamp: '3 hours ago',
                trending_score: 8,
                meme_potential: 10
            },
            {
                id: 'news_6',
                title: '🐿️ Florida Man Trains Army of Squirrels as Delivery Service',
                summary: 'This is peak Florida energy. Man trained an army of squirrels to deliver food and it\'s actually working better than regular delivery drivers. DoorDash is shaking.',
                category: 'funny',
                source: 'Florida News',
                engagement: '5.2M shares',
                timestamp: '5 hours ago',
                trending_score: 10,
                meme_potential: 10
            }
        ];
        
        // Sample meme templates data
        this.templateData = [
            {
                id: 'template_1',
                name: 'Drake Pointing (Gen-Z Edition)',
                category: 'popular',
                usage_count: 15420,
                type: 'image',
                aspect_ratio: '1:1',
                description: 'Perfect for showing preferences and choices'
            },
            {
                id: 'template_2',
                name: 'Distracted Boyfriend Chaos',
                category: 'story',
                usage_count: 12350,
                type: 'image',
                aspect_ratio: '4:3',
                description: 'When something better comes along'
            },
            {
                id: 'template_3',
                name: 'Surprised Pikachu Energy',
                category: 'reactions',
                usage_count: 18200,
                type: 'image',
                aspect_ratio: '1:1',
                description: 'For obvious consequences'
            },
            {
                id: 'template_4',
                name: 'This is Fine (But Everything\'s Chaos)',
                category: 'reactions',
                usage_count: 9800,
                type: 'image',
                aspect_ratio: '4:3',
                description: 'When everything is definitely not fine'
            },
            {
                id: 'template_5',
                name: 'Expanding Brain Moments',
                category: 'story',
                usage_count: 7600,
                type: 'image',
                aspect_ratio: '1:1',
                description: 'Show progression of ideas'
            },
            {
                id: 'template_6',
                name: 'Woman Yelling at Cat Vibes',
                category: 'comparison',
                usage_count: 11200,
                type: 'image',
                aspect_ratio: '4:3',
                description: 'For heated arguments'
            }
        ];
        
        this.init();
    }
    
    init() {
        console.log('🚀 TrendzN Platform initializing...');
        
        // Check admin access
        this.checkAdminAccess();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadNewsData();
        this.loadTemplateData();
        
        // Initialize canvas
        this.initCanvas();
        
        // Initialize quick templates
        this.initQuickTemplates();
        
        console.log('✅ TrendzN Platform ready!');
    }
    
    checkAdminAccess() {
        const isAdmin = localStorage.getItem('userRole') === 'admin' || 
                       window.location.hash === '#admin-access' ||
                       window.location.search.includes('admin=true') ||
                       window.location.pathname.includes('admin');
        
        if (isAdmin) {
            document.body.classList.add('admin-mode');
            console.log('👑 Admin access granted');
        } else {
            document.body.classList.remove('admin-mode');
            console.log('👤 Regular user access');
        }
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.switchSection(section);
            });
        });
        
        // Hero buttons
        document.getElementById('startCreating')?.addEventListener('click', () => {
            this.switchSection('templates');
        });
        
        document.getElementById('exploreTrending')?.addEventListener('click', () => {
            this.switchSection('news');
        });
        
        // News filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterNews(e.target.dataset.category);
            });
        });
        
        // Template filters
        document.querySelectorAll('.template-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterTemplates(e.target.dataset.templateCategory);
            });
        });
        
        // News search
        document.getElementById('newsSearch')?.addEventListener('input', (e) => {
            this.searchNews(e.target.value);
        });
        
        // Template search
        document.querySelector('.template-search')?.addEventListener('input', (e) => {
            this.searchTemplates(e.target.value);
        });
        
        // Editor controls
        this.setupEditorControls();
        
        // Canvas events
        this.setupCanvasEvents();
        
        // Upload events
        this.setupUploadEvents();
        
        // Admin events
        this.setupAdminEvents();
        
        // Modal events
        this.setupModalEvents();
    }
    
    setupEditorControls() {
        // Add text button
        document.getElementById('addTextBtn')?.addEventListener('click', () => {
            this.addTextElement();
        });
        
        // Font size slider
        document.getElementById('fontSizeSlider')?.addEventListener('input', (e) => {
            this.updateSelectedElement('fontSize', parseInt(e.target.value));
            document.getElementById('fontSizeValue').textContent = e.target.value + 'px';
        });
        
        // Font weight select
        document.getElementById('fontWeightSelect')?.addEventListener('change', (e) => {
            this.updateSelectedElement('fontWeight', e.target.value);
        });
        
        // Text color picker
        document.getElementById('textColorPicker')?.addEventListener('change', (e) => {
            this.updateSelectedElement('fillStyle', e.target.value);
        });
        
        // Color presets
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                this.updateSelectedElement('fillStyle', color);
                document.getElementById('textColorPicker').value = color;
                
                // Update active preset
                document.querySelectorAll('.color-preset').forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        
        // Effect buttons
        document.querySelectorAll('.effect-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleEffect(e.target.dataset.effect);
                e.target.classList.toggle('active');
            });
        });
        
        // Canvas size select
        document.getElementById('canvasSizeSelect')?.addEventListener('change', (e) => {
            this.changeCanvasSize(e.target.value);
        });
        
        // Background options
        document.querySelectorAll('.bg-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.changeBackground(e.target.dataset.bg);
                
                // Update active option
                document.querySelectorAll('.bg-option').forEach(o => o.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        
        // Undo/Redo buttons
        document.getElementById('undoBtn')?.addEventListener('click', () => {
            this.undo();
        });
        
        document.getElementById('redoBtn')?.addEventListener('click', () => {
            this.redo();
        });
        
        document.getElementById('resetBtn')?.addEventListener('click', () => {
            this.resetCanvas();
        });
        
        // Export buttons
        document.getElementById('downloadBtn')?.addEventListener('click', () => {
            this.downloadMeme();
        });
        
        document.getElementById('shareBtn')?.addEventListener('click', () => {
            this.shareMeme();
        });
        
        // Select template button in editor
        document.getElementById('selectTemplateBtn')?.addEventListener('click', () => {
            this.switchSection('templates');
        });
    }
    
    setupCanvasEvents() {
        if (!this.canvas) return;
        
        this.canvas.addEventListener('mousedown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const clickedElement = this.findElementAt(x, y);
            if (clickedElement) {
                this.selectedElement = clickedElement;
                this.isDragging = true;
                this.dragOffset.x = x - clickedElement.x;
                this.dragOffset.y = y - clickedElement.y;
                this.updateElementInfo();
                this.redrawCanvas();
            }
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            if (!this.isDragging || !this.selectedElement) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.selectedElement.x = x - this.dragOffset.x;
            this.selectedElement.y = y - this.dragOffset.y;
            
            this.redrawCanvas();
        });
        
        this.canvas.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.saveState();
            }
            this.isDragging = false;
        });
        
        // Double click to edit text
        this.canvas.addEventListener('dblclick', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const clickedElement = this.findElementAt(x, y);
            if (clickedElement && clickedElement.type === 'text') {
                this.editTextElement(clickedElement);
            }
        });
    }
    
    setupUploadEvents() {
        // Upload template button
        document.getElementById('uploadTemplate')?.addEventListener('click', () => {
            this.showUploadModal();
        });
        
        // File input
        document.getElementById('fileInput')?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFileUpload(file);
            }
        });
        
        // Drag and drop
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('drag-over');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileUpload(files[0]);
                }
            });
            
            uploadArea.addEventListener('click', () => {
                document.getElementById('fileInput')?.click();
            });
        }
    }
    
    setupAdminEvents() {
        // Add news button
        document.getElementById('addNewsBtn')?.addEventListener('click', () => {
            this.showAddNewsModal();
        });
        
        // Other admin buttons
        document.getElementById('manageNewsBtn')?.addEventListener('click', () => {
            this.showNewsManagement();
        });
        
        document.getElementById('moderateTemplatesBtn')?.addEventListener('click', () => {
            this.showTemplateModeration();
        });
        
        // Admin sliders
        document.getElementById('trendingScore')?.addEventListener('input', (e) => {
            document.getElementById('trendingScoreValue').textContent = e.target.value;
        });
        
        document.getElementById('memePotential')?.addEventListener('input', (e) => {
            document.getElementById('memePotentialValue').textContent = e.target.value;
        });
    }
    
    setupModalEvents() {
        // Close modal buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });
        
        // Modal overlays
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', () => {
                this.closeAllModals();
            });
        });
        
        // Upload modal buttons
        document.getElementById('cancelUpload')?.addEventListener('click', () => {
            this.closeAllModals();
        });
        
        document.getElementById('confirmUpload')?.addEventListener('click', () => {
            this.confirmTemplateUpload();
        });
        
        // ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    switchSection(sectionName) {
        console.log(`📍 Switching to section: ${sectionName}`);
        
        this.currentSection = sectionName;
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');
        
        // Update sections
        document.querySelectorAll('.app-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName)?.classList.add('active');
        
        // Section-specific actions
        if (sectionName === 'editor' && this.canvas) {
            this.redrawCanvas();
        }
    }
    
    loadNewsData() {
        const newsGrid = document.getElementById('newsGrid');
        if (!newsGrid) return;
        
        this.renderNewsGrid(this.newsData);
        this.updateNewsCounts();
        
        // Update admin stats
        document.getElementById('totalNews')?.textContent = this.newsData.length;
    }
    
    renderNewsGrid(newsItems) {
        const newsGrid = document.getElementById('newsGrid');
        if (!newsGrid) return;
        
        newsGrid.innerHTML = newsItems.map(article => `
            <div class="news-card fade-in" data-id="${article.id}">
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                <div class="news-meta">
                    <span>📊 ${article.source}</span>
                    <span>🔥 ${article.engagement}</span>
                    <span>⏰ ${article.timestamp}</span>
                </div>
                <div class="news-stats">
                    <span>Trending: ${article.trending_score}/10</span>
                    <span>Meme Potential: ${article.meme_potential}/10</span>
                </div>
                <button class="create-meme-btn" data-news-id="${article.id}">
                    🚀 Create Meme from This
                </button>
            </div>
        `).join('');
        
        // Add event listeners to create meme buttons
        document.querySelectorAll('.create-meme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const newsId = e.target.dataset.newsId;
                this.selectNewsForMeme(newsId);
            });
        });
    }
    
    updateNewsCounts() {
        const categories = ['all', 'tech', 'entertainment', 'sports', 'business', 'politics', 'funny'];
        
        categories.forEach(category => {
            const count = category === 'all' ? 
                this.newsData.length : 
                this.newsData.filter(news => news.category === category).length;
            
            const element = document.getElementById(`${category}NewsCount`);
            if (element) {
                element.textContent = count.toString();
            }
        });
    }
    
    loadTemplateData() {
        const templatesGrid = document.getElementById('templatesGrid');
        if (!templatesGrid) return;
        
        this.renderTemplatesGrid(this.templateData);
        this.updateTemplateCounts();
        
        // Update admin stats
        document.getElementById('totalTemplates')?.textContent = this.templateData.length;
    }
    
    renderTemplatesGrid(templates) {
        const templatesGrid = document.getElementById('templatesGrid');
        if (!templatesGrid) return;
        
        templatesGrid.innerHTML = templates.map(template => `
            <div class="template-card fade-in" data-id="${template.id}">
                <div class="template-preview">
                    ${this.getTemplateIcon(template.id)}
                </div>
                <h4>${template.name}</h4>
                <p>Used ${template.usage_count.toLocaleString()} times</p>
                <div class="template-meta">
                    <span class="aspect-ratio">${template.aspect_ratio}</span>
                    <span class="category">${template.category}</span>
                </div>
                <button class="select-template-btn" data-template-id="${template.id}">
                    ✨ Select Template
                </button>
            </div>
        `).join('');
        
        // Add event listeners
        document.querySelectorAll('.select-template-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const templateId = e.target.dataset.templateId;
                this.selectTemplate(templateId);
            });
        });
    }
    
    updateTemplateCounts() {
        const categories = ['popular', 'reactions', 'story', 'comparison', 'custom'];
        
        categories.forEach(category => {
            let count;
            if (category === 'popular') {
                count = this.templateData.filter(t => t.usage_count > 10000).length;
            } else {
                count = this.templateData.filter(t => t.category === category).length;
            }
            
            const element = document.getElementById(`${category}TemplatesCount`);
            if (element) {
                element.textContent = count.toString();
            }
        });
    }
    
    getTemplateIcon(templateId) {
        const icons = {
            'template_1': '👨‍🎤', // Drake
            'template_2': '👨‍💼', // Distracted Boyfriend
            'template_3': '⚡', // Surprised Pikachu
            'template_4': '🐶', // This is Fine
            'template_5': '🧠', // Expanding Brain
            'template_6': '🐱' // Woman Yelling at Cat
        };
        return icons[templateId] || '🎭';
    }
    
    initQuickTemplates() {
        const quickTemplatesContainer = document.getElementById('quickTemplates');
        if (!quickTemplatesContainer) return;
        
        const topTemplates = this.templateData.slice(0, 3);
        
        quickTemplatesContainer.innerHTML = topTemplates.map(template => `
            <button class="tool-btn" data-template-id="${template.id}">
                ${this.getTemplateIcon(template.id)} ${template.name}
            </button>
        `).join('');
        
        // Add event listeners
        quickTemplatesContainer.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const templateId = e.target.dataset.templateId;
                this.selectTemplate(templateId);
            });
        });
    }
    
    selectNewsForMeme(newsId) {
        this.selectedNews = this.newsData.find(news => news.id === newsId);
        console.log('📰 Selected news for meme:', this.selectedNews?.title);
        
        // Switch to templates section
        this.switchSection('templates');
        
        // Show success notification
        this.showToast('📰 News selected! Now choose a template to create your meme.', 'success');
    }
    
    selectTemplate(templateId) {
        this.currentTemplate = this.templateData.find(template => template.id === templateId);
        console.log('🎭 Selected template:', this.currentTemplate?.name);
        
        // Switch to editor
        this.switchSection('editor');
        
        // Load template on canvas
        this.loadTemplateOnCanvas();
        
        this.showToast(`🎭 Template "${this.currentTemplate.name}" loaded!`, 'success');
    }
    
    initCanvas() {
        this.canvas = document.getElementById('memeCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 400;
        
        // Set default styles
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '32px Arial, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;
        
        console.log('🎨 Canvas initialized');
    }
    
    loadTemplateOnCanvas() {
        if (!this.currentTemplate || !this.ctx) return;
        
        // Clear canvas and reset elements
        this.canvasElements = [];
        this.selectedElement = null;
        
        // Set canvas size based on template
        this.setCanvasSizeForTemplate();
        
        // Clear and set background
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add template-specific text elements
        this.addTemplateTextElements();
        
        // Pre-fill with news content if available
        this.prefillWithNewsContent();
        
        // Hide placeholder and show canvas
        document.getElementById('canvasPlaceholder').style.display = 'none';
        this.canvas.style.display = 'block';
        
        // Save initial state
        this.saveState();
        
        this.redrawCanvas();
        
        console.log(`🎨 Template "${this.currentTemplate.name}" loaded on canvas`);
    }
    
    setCanvasSizeForTemplate() {
        const template = this.currentTemplate;
        
        // Set canvas dimensions based on template aspect ratio
        switch (template.aspect_ratio) {
            case '1:1':
                this.canvas.width = 400;
                this.canvas.height = 400;
                break;
            case '4:3':
                this.canvas.width = 400;
                this.canvas.height = 300;
                break;
            case '16:9':
                this.canvas.width = 400;
                this.canvas.height = 225;
                break;
            default:
                this.canvas.width = 400;
                this.canvas.height = 400;
        }
        
        // Update canvas size display
        document.getElementById('canvasSize').textContent = `${this.canvas.width}x${this.canvas.height}`;
    }
    
    addTemplateTextElements() {
        const template = this.currentTemplate;
        
        // Template-specific text positions
        switch (template.id) {
            case 'template_1': // Drake
                this.addTextElement('Thing you reject', 200, 100);
                this.addTextElement('Thing you prefer', 200, 300);
                break;
                
            case 'template_2': // Distracted Boyfriend
                this.addTextElement('New tempting thing', 100, 80);
                this.addTextElement('You', 200, 250);
                this.addTextElement('Current thing', 320, 250);
                break;
                
            case 'template_3': // Surprised Pikachu
                this.addTextElement('What you did', 200, 80);
                this.addTextElement('Obvious consequence', 200, 320);
                break;
                
            case 'template_4': // This is Fine
                this.addTextElement('Chaotic situation', 200, 60);
                this.addTextElement('Your calm reaction', 200, 240);
                break;
                
            case 'template_5': // Expanding Brain
                this.addTextElement('Basic idea', 280, 80);
                this.addTextElement('Better idea', 280, 160);
                this.addTextElement('Advanced idea', 280, 240);
                this.addTextElement('Galaxy brain idea', 280, 320);
                break;
                
            case 'template_6': // Woman Yelling at Cat
                this.addTextElement('Angry argument', 120, 150);
                this.addTextElement('Confused response', 280, 150);
                break;
                
            default:
                this.addTextElement('Top Text', 200, 100);
                this.addTextElement('Bottom Text', 200, 300);
        }
    }
    
    prefillWithNewsContent() {
        if (!this.selectedNews || this.canvasElements.length === 0) return;
        
        // Pre-fill first text element with news title
        const newsTitle = this.selectedNews.title
            .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu, '') // Remove emojis
            .trim()
            .substring(0, 40);
            
        if (newsTitle) {
            this.canvasElements[0].text = newsTitle;
        }
        
        // If there's a second element, use part of the summary
        if (this.canvasElements.length > 1) {
            const summary = this.selectedNews.summary.substring(0, 30) + '...';
            this.canvasElements[1].text = summary;
        }
    }
    
    addTextElement(text = 'New Text', x = 200, y = 200) {
        const element = {
            type: 'text',
            text: text,
            x: x,
            y: y,
            fontSize: 32,
            fontWeight: '700',
            fontFamily: 'Arial, sans-serif',
            fillStyle: '#ffffff',
            strokeStyle: '#000000',
            lineWidth: 2,
            textShadow: true,
            textOutline: true,
            id: Date.now() + Math.random()
        };
        
        this.canvasElements.push(element);
        this.selectedElement = element;
        this.updateElementInfo();
        this.redrawCanvas();
        
        console.log('📝 Added text element:', text);
    }
    
    redrawCanvas() {
        if (!this.ctx) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw all elements
        this.canvasElements.forEach(element => {
            if (element.type === 'text') {
                this.drawTextElement(element);
            }
        });
        
        // Highlight selected element
        if (this.selectedElement) {
            this.drawSelection(this.selectedElement);
        }
    }
    
    drawTextElement(element) {
        this.ctx.font = `${element.fontWeight} ${element.fontSize}px ${element.fontFamily}`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Draw shadow if enabled
        if (element.textShadow) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillText(element.text, element.x + 2, element.y + 2);
        }
        
        // Draw outline if enabled
        if (element.textOutline) {
            this.ctx.strokeStyle = element.strokeStyle;
            this.ctx.lineWidth = element.lineWidth;
            this.ctx.strokeText(element.text, element.x, element.y);
        }
        
        // Draw main text
        this.ctx.fillStyle = element.fillStyle;
        this.ctx.fillText(element.text, element.x, element.y);
    }
    
    drawSelection(element) {
        if (element.type !== 'text') return;
        
        this.ctx.strokeStyle = '#00f5ff';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        const metrics = this.ctx.measureText(element.text);
        const width = metrics.width + 20;
        const height = element.fontSize + 20;
        
        this.ctx.strokeRect(
            element.x - width / 2,
            element.y - height / 2,
            width,
            height
        );
        
        this.ctx.setLineDash([]);
    }
    
    findElementAt(x, y) {
        // Check elements in reverse order (top to bottom)
        for (let i = this.canvasElements.length - 1; i >= 0; i--) {
            const element = this.canvasElements[i];
            if (element.type === 'text') {
                // Set font to measure text accurately
                this.ctx.font = `${element.fontWeight} ${element.fontSize}px ${element.fontFamily}`;
                
                const metrics = this.ctx.measureText(element.text);
                const width = metrics.width;
                const height = element.fontSize;
                
                if (x >= element.x - width / 2 && x <= element.x + width / 2 &&
                    y >= element.y - height / 2 && y <= element.y + height / 2) {
                    return element;
                }
            }
        }
        return null;
    }
    
    updateSelectedElement(property, value) {
        if (!this.selectedElement) {
            this.showToast('No element selected', 'error');
            return;
        }
        
        this.selectedElement[property] = value;
        this.redrawCanvas();
        this.saveState();
        
        console.log(`Updated ${property} to:`, value);
    }
    
    updateElementInfo() {
        const infoElement = document.getElementById('selectedElement');
        if (infoElement) {
            if (this.selectedElement) {
                infoElement.textContent = `Selected: ${this.selectedElement.type} - "${this.selectedElement.text}"`;
            } else {
                infoElement.textContent = 'No element selected';
            }
        }
    }
    
    editTextElement(element) {
        const newText = prompt('Edit text:', element.text);
        if (newText !== null && newText !== element.text) {
            element.text = newText;
            this.redrawCanvas();
            this.saveState();
            console.log('📝 Text edited:', newText);
        }
    }
    
    toggleEffect(effect) {
        if (!this.selectedElement) {
            this.showToast('Select a text element first', 'error');
            return;
        }
        
        switch (effect) {
            case 'shadow':
                this.selectedElement.textShadow = !this.selectedElement.textShadow;
                break;
            case 'outline':
                this.selectedElement.textOutline = !this.selectedElement.textOutline;
                break;
            case 'bold':
                this.selectedElement.fontWeight = this.selectedElement.fontWeight === '700' ? '400' : '700';
                break;
        }
        
        this.redrawCanvas();
        this.saveState();
        
        console.log(`Toggled ${effect} effect`);
    }
    
    changeCanvasSize(size) {
        const [width, height] = size.split('x').map(Number);
        
        if (width && height) {
            this.canvas.width = width;
            this.canvas.height = height;
            
            // Update display
            document.getElementById('canvasSize').textContent = `${width}x${height}`;
            
            this.redrawCanvas();
            this.saveState();
            
            console.log(`Canvas resized to: ${width}x${height}`);
        }
    }
    
    changeBackground(bgType) {
        // This would change canvas background in a real implementation
        console.log(`Background changed to: ${bgType}`);
        this.redrawCanvas();
    }
    
    saveState() {
        const state = JSON.stringify({
            elements: this.canvasElements,
            canvasWidth: this.canvas.width,
            canvasHeight: this.canvas.height
        });
        
        this.undoStack.push(state);
        this.redoStack = []; // Clear redo stack when new state is saved
        
        // Limit undo stack size
        if (this.undoStack.length > 20) {
            this.undoStack.shift();
        }
    }
    
    undo() {
        if (this.undoStack.length > 1) {
            const currentState = this.undoStack.pop();
            this.redoStack.push(currentState);
            
            const previousState = JSON.parse(this.undoStack[this.undoStack.length - 1]);
            this.restoreState(previousState);
            
            this.showToast('↶ Undone', 'info');
        }
    }
    
    redo() {
        if (this.redoStack.length > 0) {
            const state = this.redoStack.pop();
            this.undoStack.push(state);
            
            const stateObj = JSON.parse(state);
            this.restoreState(stateObj);
            
            this.showToast('↷ Redone', 'info');
        }
    }
    
    restoreState(state) {
        this.canvasElements = state.elements;
        this.canvas.width = state.canvasWidth;
        this.canvas.height = state.canvasHeight;
        this.selectedElement = null;
        
        this.updateElementInfo();
        this.redrawCanvas();
    }
    
    resetCanvas() {
        if (confirm('Are you sure you want to reset the canvas? This will remove all elements.')) {
            this.canvasElements = [];
            this.selectedElement = null;
            this.undoStack = [];
            this.redoStack = [];
            
            this.updateElementInfo();
            this.redrawCanvas();
            this.saveState();
            
            this.showToast('🔄 Canvas reset', 'info');
        }
    }
    
    downloadMeme() {
        if (!this.canvas || this.canvasElements.length === 0) {
            this.showToast('Create a meme first!', 'error');
            return;
        }
        
        // Create download link
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        link.download = `trendzn-meme-${timestamp}.png`;
        link.href = this.canvas.toDataURL('image/png');
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showToast('💾 Meme downloaded successfully!', 'success');
        
        console.log('📥 Meme downloaded');
    }
    
    async shareMeme() {
        if (!this.canvas || this.canvasElements.length === 0) {
            this.showToast('Create a meme first!', 'error');
            return;
        }
        
        try {
            if (navigator.share) {
                // Use Web Share API if available
                this.canvas.toBlob(async (blob) => {
                    const file = new File([blob], 'meme.png', { type: 'image/png' });
                    await navigator.share({
                        title: 'Check out this meme from TrendzN!',
                        text: `Created with TrendzN - ${this.selectedNews ? 'Based on: ' + this.selectedNews.title : 'Original meme'}`,
                        files: [file]
                    });
                });
            } else {
                // Fallback - copy to clipboard
                this.canvas.toBlob(async (blob) => {
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                    this.showToast('📋 Meme copied to clipboard!', 'success');
                });
            }
        } catch (error) {
            console.error('Share failed:', error);
            this.showToast('❌ Share failed. Try downloading instead.', 'error');
        }
        
        console.log('🚀 Meme shared');
    }
    
    filterNews(category) {
        // Update active filter
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
        
        // Filter and display news
        const filteredNews = category === 'all' ? 
            this.newsData : 
            this.newsData.filter(news => news.category === category);
        
        this.renderNewsGrid(filteredNews);
        
        console.log(`🏷️ Filtered news by: ${category}`);
    }
    
    filterTemplates(category) {
        // Update active filter
        document.querySelectorAll('.template-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-template-category="${category}"]`)?.classList.add('active');
        
        // Filter templates
        let filteredTemplates;
        
        switch (category) {
            case 'popular':
                filteredTemplates = this.templateData.filter(t => t.usage_count > 10000);
                break;
            default:
                filteredTemplates = this.templateData.filter(t => t.category === category);
        }
        
        this.renderTemplatesGrid(filteredTemplates);
        
        console.log(`🏷️ Filtered templates by: ${category}`);
    }
    
    searchNews(query) {
        if (!query.trim()) {
            this.renderNewsGrid(this.newsData);
            return;
        }
        
        const filteredNews = this.newsData.filter(news =>
            news.title.toLowerCase().includes(query.toLowerCase()) ||
            news.summary.toLowerCase().includes(query.toLowerCase()) ||
            news.source.toLowerCase().includes(query.toLowerCase())
        );
        
        this.renderNewsGrid(filteredNews);
        
        console.log(`🔍 Searched news for: "${query}"`);
    }
    
    searchTemplates(query) {
        if (!query.trim()) {
            this.renderTemplatesGrid(this.templateData);
            return;
        }
        
        const filteredTemplates = this.templateData.filter(template =>
            template.name.toLowerCase().includes(query.toLowerCase()) ||
            template.description.toLowerCase().includes(query.toLowerCase()) ||
            template.category.toLowerCase().includes(query.toLowerCase())
        );
        
        this.renderTemplatesGrid(filteredTemplates);
        
        console.log(`🔍 Searched templates for: "${query}"`);
    }
    
    showUploadModal() {
        document.getElementById('uploadModal')?.classList.add('active');
        console.log('📤 Upload modal opened');
    }
    
    showAddNewsModal() {
        document.getElementById('addNewsModal')?.classList.add('active');
        console.log('📰 Add news modal opened');
    }
    
    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        console.log('❌ All modals closed');
    }
    
    handleFileUpload(file) {
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            this.showToast('Please select an image or video file', 'error');
            return;
        }
        
        if (file.size > 10 * 1024 * 1024) {
            this.showToast('File size must be less than 10MB', 'error');
            return;
        }
        
        // Show file name in upload area
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
            uploadArea.innerHTML = `
                <div class="upload-success">
                    <div class="upload-icon">✅</div>
                    <p>File selected: <strong>${file.name}</strong></p>
                    <small>Click "Upload Template" to confirm</small>
                </div>
            `;
        }
        
        // Auto-fill template name
        const nameInput = document.getElementById('templateName');
        if (nameInput && !nameInput.value) {
            nameInput.value = file.name.split('.')[0];
        }
        
        console.log('📁 File selected:', file.name);
    }
    
    confirmTemplateUpload() {
        const name = document.getElementById('templateName')?.value;
        const category = document.getElementById('templateCategory')?.value;
        const description = document.getElementById('templateDescription')?.value;
        
        if (!name || !category) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Create new template
        const newTemplate = {
            id: `template_${Date.now()}`,
            name: name,
            category: category,
            description: description || 'User uploaded template',
            usage_count: 0,
            type: 'image',
            aspect_ratio: '1:1'
        };
        
        // Add to template data
        this.templateData.unshift(newTemplate);
        
        // Refresh templates display
        this.loadTemplateData();
        
        // Close modal and reset form
        this.closeAllModals();
        document.getElementById('templateUploadForm')?.reset();
        
        this.showToast(`✅ Template "${name}" uploaded successfully!`, 'success');
        
        console.log('📤 Template uploaded:', name);
    }
    
    showNewsManagement() {
        this.showToast('📊 News management panel - Full implementation coming soon!', 'info');
    }
    
    showTemplateModeration() {
        this.showToast('🛡️ Template moderation panel - Full implementation coming soon!', 'info');
    }
    
    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Hide after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
        
        console.log(`🔔 Toast: ${message}`);
    }
}

// Admin access helper functions
window.enableAdmin = () => {
    localStorage.setItem('userRole', 'admin');
    document.body.classList.add('admin-mode');
    console.log('👑 Admin mode enabled');
    return 'Admin access granted! Refresh to see admin features.';
};

window.disableAdmin = () => {
    localStorage.removeItem('userRole');
    document.body.classList.remove('admin-mode');
    console.log('👤 Admin mode disabled');
    return 'Admin access removed.';
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Initializing TrendzN Platform...');
    
    // Add some loading animation
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.trendzNApp = new TrendzNApp();
        
        // Fade in the app
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
        
        console.log('🎉 TrendzN Platform loaded successfully!');
    }, 500);
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrendzNApp;
}

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
}

// Global error handling
window.addEventListener('error', (e) => {
    console.error('💥 Application error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('💥 Unhandled promise rejection:', e.reason);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
});