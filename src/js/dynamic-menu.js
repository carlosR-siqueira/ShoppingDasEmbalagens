/**
 * Dynamic Menu Generator
 * Generates menu structure from categorias.json while preserving all existing functionality
 */

class DynamicMenuGenerator {
    constructor() {
        this.categories = [];
        this.menuContainer = null;
    }

    /**
     * Initialize the dynamic menu system
     */
    async init() {
        try {
            await this.loadCategories();
            this.findMenuContainer();
            this.generateMenuHTML();
            this.initializeMenuFunctionality();
        } catch (error) {
            console.error('Error initializing dynamic menu:', error);
            // Fallback: keep static menu if dynamic loading fails
        }
    }

    /**
     * Load categories from JSON file
     */
    async loadCategories() {
        try {
            // Try different paths to find categorias.json depending on page location
            const possiblePaths = [
                './categorias.json',           // For index.html (root)
                '../categorias.json',          // For pages in subdirectories
                '/categorias.json',            // Absolute path from root
                'categorias.json'              // Same directory
            ];
            
            let response;
            let lastError;
            
            for (const path of possiblePaths) {
                try {
                    response = await fetch(path);
                    if (response.ok) {
                        break;
                    }
                } catch (error) {
                    lastError = error;
                    continue;
                }
            }
            
            if (!response || !response.ok) {
                throw new Error(`Could not load categorias.json from any path. Last error: ${lastError?.message || 'Unknown error'}`);
            }
            
            this.categories = await response.json();
        } catch (error) {
            console.error('Error loading categories:', error);
            throw error;
        }
    }

    /**
     * Find the menu container in the DOM
     */
    findMenuContainer() {
        this.menuContainer = document.querySelector('.dropdown-content');
        if (!this.menuContainer) {
            throw new Error('Menu container not found');
        }
    }

    /**
     * Generate the complete menu HTML structure
     */
    generateMenuHTML() {
        // Clear existing content except for the header elements
        const headerElements = this.menuContainer.querySelector('.item-title-container');
        const hrHeader = this.menuContainer.querySelector('.hr-header');
        const produtosDestaque = this.menuContainer.querySelector('a[href="#produtos"]');
        
        // Clear all content
        this.menuContainer.innerHTML = '';
        
        // Re-add header elements
        if (headerElements) {
            this.menuContainer.appendChild(headerElements);
        }
        if (hrHeader) {
            this.menuContainer.appendChild(hrHeader);
        }
        if (produtosDestaque) {
            this.menuContainer.appendChild(produtosDestaque);
        } else {
            // Create header structure if not found
            this.menuContainer.innerHTML = `
                <div class="item-title-container" style="display: none;">
                    <div class="voltar-btn-container">
                        <button class="voltar-btn"><i class="fa fa-angle-double-left"></i> </button>
                    </div>
                    <div class="title-container">
                        <p>Produtos</p>
                    </div>
                </div>
                <div class="hr-header">
                    <hr>
                </div>
                <a class="header-list-itens" href="#produtos">Produtos em Destaque</a>
            `;
        }

        // Generate category menus
        this.categories.forEach((category, index) => {
            this.generateCategoryMenu(category, index);
        });
    }

    /**
     * Generate menu for a single category
     */
    generateCategoryMenu(category, index) {
        const categoryName = category.category;
        const subcategories = category.subcategory;
        
        console.log(`Generating menu for category: ${categoryName} (index: ${index})`);
        
        // Create class names based on category
        const categoryClass = this.getCategoryClassName(categoryName);
        const categoryMenuClass = `${categoryClass}-subMenu`;
        const categoryItemsClass = `${categoryClass}-subMenu-itens`;

        console.log(`Category classes: ${categoryClass}, ${categoryMenuClass}, ${categoryItemsClass}`);

        // Create category button
        const categoryButton = document.createElement('a');
        categoryButton.className = `${categoryMenuClass} dropdown-itens`;
        categoryButton.innerHTML = `${categoryName}<span class="fa fa-angle-right arrow-right-menu"></span>`;
        
        // Create subcategory container
        const subcategoryContainer = document.createElement('div');
        subcategoryContainer.className = `${categoryItemsClass} subMenu-itens`;
        
        // Add header for mobile view
        subcategoryContainer.innerHTML = `
            <div class="item-title-container" style="display: none;">
                <div class="voltar-btn-container">
                    <button class="voltar-btn"><i class="fa fa-angle-double-left"></i> </button>
                </div>
                <div class="title-container">
                    <p>${categoryName}</p>
                </div>
            </div>
            <div class="hr-header">
                <hr>
            </div>
        `;

        // Add subcategory links
        subcategories.forEach(subcategory => {
            const subcategoryLink = document.createElement('a');
            subcategoryLink.href = `produtos.html?categoria=${encodeURIComponent(categoryName)}&subcategoria=${encodeURIComponent(subcategory)}`;
            subcategoryLink.textContent = subcategory;
            subcategoryContainer.appendChild(subcategoryLink);
        });

        // Add to menu container
        this.menuContainer.appendChild(categoryButton);
        this.menuContainer.appendChild(subcategoryContainer);
        
        console.log(`Added category button and submenu for: ${categoryName}`);
    }

    /**
     * Get CSS class name for category
     */
    getCategoryClassName(categoryName) {
        const classMap = {
            'Descartáveis': 'descartaveis',
            'Utensílios Domésticos': 'domesticos',
            'Artigos para Festas': 'festa',
            'Limpeza e Higiene': 'limpeza',
            'Papelaria': 'papelaria'
        };
        
        return classMap[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    /**
     * Initialize menu functionality after HTML generation
     */
    initializeMenuFunctionality() {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            this.setupCategoryEventListeners();
            this.setupMobileMenuIntegration();
        }, 100);
    }

    /**
     * Setup event listeners for category dropdowns
     */
    setupCategoryEventListeners() {
        // Wait a bit more to ensure all elements are ready
        setTimeout(() => {
            this.setupActualEventListeners();
        }, 300);
    }
    
    setupActualEventListeners() {
        // Get all category buttons and submenus
        const categoryButtons = this.menuContainer.querySelectorAll('.dropdown-itens');
        const subMenuItems = this.menuContainer.querySelectorAll('.subMenu-itens');

        console.log(`🔍 Found ${categoryButtons.length} category buttons and ${subMenuItems.length} submenus`);

        // Simple approach: use direct class matching
        const categories = [
            { name: 'Descartáveis', buttonClass: 'descartaveis-subMenu', submenuClass: 'descartaveis-subMenu-itens' },
            { name: 'Utensílios Domésticos', buttonClass: 'domesticos-subMenu', submenuClass: 'domesticos-subMenu-itens' },
            { name: 'Artigos para Festas', buttonClass: 'festa-subMenu', submenuClass: 'festa-subMenu-itens' },
            { name: 'Limpeza e Higiene', buttonClass: 'limpeza-subMenu', submenuClass: 'limpeza-subMenu-itens' },
            { name: 'Papelaria', buttonClass: 'papelaria-subMenu', submenuClass: 'papelaria-subMenu-itens' }
        ];

        categories.forEach(category => {
            const button = this.menuContainer.querySelector(`.${category.buttonClass}`);
            const submenu = this.menuContainer.querySelector(`.${category.submenuClass}`);
            
            console.log(`🔍 Category: ${category.name}`);
            console.log(`   Button found: ${button ? 'YES' : 'NO'} (${category.buttonClass})`);
            console.log(`   Submenu found: ${submenu ? 'YES' : 'NO'} (${category.submenuClass})`);
            
            if (button && submenu) {
                // Remove any existing event listeners
                const newButton = button.cloneNode(true);
                button.parentNode.replaceChild(newButton, button);
                
                // Add new event listener
                newButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    console.log(`🔥 Clicked on ${category.name}`);
                    console.log(`   Submenu classes before: ${submenu.className}`);
                    
                    // Close all other submenus first
                    subMenuItems.forEach(otherSubmenu => {
                        if (otherSubmenu !== submenu) {
                            otherSubmenu.classList.remove('show');
                        }
                    });
                    
                    // Toggle current submenu
                    submenu.classList.toggle('show');
                    
                    console.log(`   Submenu classes after: ${submenu.className}`);
                    console.log(`   Submenu is visible: ${submenu.classList.contains('show')}`);
                });
                
                console.log(`✅ Successfully setup event listener for ${category.name}`);
            } else {
                console.warn(`❌ Failed to find elements for ${category.name}`);
            }
        });

        // Close submenus when clicking outside
        document.addEventListener('mouseout', (event) => {
            subMenuItems.forEach(subMenu => {
                if (!event.target.closest('.dropdown') && subMenu.classList.contains('show')) {
                    subMenu.classList.remove('show');
                }
            });
        });

        // Setup back button functionality for mobile
        const voltarBtns = this.menuContainer.querySelectorAll('.voltar-btn');
        voltarBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                subMenuItems.forEach(subMenu => {
                    subMenu.classList.remove('show');
                });
                
                const dropdownContent = document.querySelector('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.classList.remove('showContent');
                }
            });
        });
    }

    /**
     * Toggle submenu visibility
     */
    toggleSubMenu(subMenu) {
        subMenu.classList.toggle('show');
    }

    /**
     * Close other submenus except the current one
     */
    closeOtherSubMenus(currentSubMenu, allSubMenus) {
        allSubMenus.forEach(subMenu => {
            if (subMenu !== currentSubMenu && subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
            }
        });
    }

    /**
     * Setup mobile menu handlers
     */
    setupMobileMenuHandlers() {
        const subMenuItems = this.menuContainer.querySelectorAll('.subMenu-itens');
        
        subMenuItems.forEach(subMenu => {
            subMenu.addEventListener('click', function() {
                if (subMenu.classList.contains('show')) {
                    subMenu.classList.remove('show');
                }
            });
        });
    }

    /**
     * Setup mobile menu integration with existing mobile functionality
     */
    setupMobileMenuIntegration() {
        // Get all dynamically generated submenu items
        const allSubMenus = this.menuContainer.querySelectorAll('.subMenu-itens');
        
        // Find mobile menu elements
        const btnMobile = document.querySelector('.btn-mobile-menu');
        const dropdownContent = document.querySelector('.dropdown-content');
        const voltarBtns = this.menuContainer.querySelectorAll('.voltar-btn');
        
        // Setup back button functionality for mobile
        voltarBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Close all submenus
                allSubMenus.forEach(subMenu => {
                    subMenu.classList.remove('show');
                });
                
                // Close dropdown content
                if (dropdownContent) {
                    dropdownContent.classList.remove('showContent');
                }
            });
        });

        // Integrate with existing mobile menu button functionality
        if (btnMobile) {
            // Override the existing click handler to work with dynamic submenus
            btnMobile.addEventListener('click', () => {
                if (!btnMobile.classList.contains('active')) {
                    // Close all dynamic submenus when mobile menu is opened
                    allSubMenus.forEach(subMenu => {
                        subMenu.classList.remove('show');
                    });
                    
                    // Close dropdown content
                    if (dropdownContent) {
                        dropdownContent.classList.remove('showContent');
                    }
                }
            });
        }

        // Make dynamic submenus available globally for script.js compatibility
        window.dynamicSubMenus = allSubMenus;
    }
}

// Initialize dynamic menu when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const dynamicMenu = new DynamicMenuGenerator();
    await dynamicMenu.init();
});

// Export for potential external use
window.DynamicMenuGenerator = DynamicMenuGenerator;
