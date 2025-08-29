// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchToggle = document.getElementById('searchToggle');
    const searchContainer = document.querySelector('.search-container');
    const searchForm = document.querySelector('.search-bar');
    const searchInput = document.getElementById('searchInput');
    const searchSubmit = document.querySelector('.search-submit');
    
    // Initialize search bar state
    function initSearchBar() {
        // Toggle search bar visibility
        if (searchToggle && searchContainer) {
            // Fechar a barra se estiver aberta ao carregar a página
            searchContainer.classList.remove('visible');
            
            searchToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                const isVisible = searchContainer.classList.toggle('visible');
                
                // Focus no input quando a barra de busca for aberta
                if (isVisible) {
                    setTimeout(() => {
                        searchInput.focus();
                    }, 100);
                }
            });
            
            // Fechar a barra de busca ao clicar fora
            document.addEventListener('click', function(e) {
                const isClickInside = searchContainer.contains(e.target) || searchToggle.contains(e.target);
                if (!isClickInside && searchContainer.classList.contains('visible')) {
                    searchContainer.classList.remove('visible');
                }
            });
            
            // Fechar ao pressionar ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && searchContainer.classList.contains('visible')) {
                    searchContainer.classList.remove('visible');
                }
            });
            
            // Prevenir que o clique na barra de busca feche ela
            searchContainer.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Fechar ao enviar o formulário
            if (searchForm) {
                searchForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    performSearch();
                    searchContainer.classList.remove('visible');
                });
            }
        }
    }

    // Handle search form submission
    function initSearchForm() {
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                performSearch();
            });
            
            // Search on Enter key
            searchInput?.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch();
                }
            });
            
            // Search on icon click
            searchSubmit?.addEventListener('click', function(e) {
                e.preventDefault();
                performSearch();
            });
        }
    }
    
    function showLoading(show = true) {
        const loadingElement = document.querySelector('.search-loading');
        if (loadingElement) {
            loadingElement.style.display = show ? 'block' : 'none';
        }
        
        if (searchSubmit) {
            const icon = searchSubmit.querySelector('i');
            if (icon) {
                icon.className = show ? 'fas fa-spinner fa-spin' : 'fas fa-search';
            }
        }
    }
    
    function performSearch() {
        const searchTerm = searchInput?.value.trim();
        if (!searchTerm || searchTerm.length === 0) {
            return;
        }
        
        showLoading(true);
        
        // Simular um pequeno atraso para feedback visual
        setTimeout(() => {
            // Redirect to search page with query parameter
            window.location.href = `search.html?search=${encodeURIComponent(searchTerm)}`;
            
            // Reset search
            if (searchInput) searchInput.value = '';
            if (searchContainer) searchContainer.classList.remove('visible');
            
            showLoading(false);
        }, 300);
    }
    
    // Initialize search functionality
    initSearchBar();
    initSearchForm();

    // Initialize search on search page
    function initSearchPage() {
        if (!window.location.pathname.includes('search.html')) return;
        
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('search');
        
        if (query && searchInput) {
            searchInput.value = query;
            
            // Show loading state
            const resultsContainer = document.getElementById('searchResults');
            if (resultsContainer) {
                resultsContainer.innerHTML = `
                    <div class="search-loading-container">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Carregando...</span>
                        </div>
                        <p>Buscando produtos...</p>
                    </div>
                `;
                
                // Perform search and display results
                searchProducts(query)
                    .then(results => {
                        displaySearchResults(results, resultsContainer);
                    })
                    .catch(error => {
                        console.error('Erro na busca:', error);
                        resultsContainer.innerHTML = `
                            <div class="alert alert-danger">
                                <i class="fas fa-exclamation-triangle me-2"></i>
                                Ocorreu um erro ao buscar os produtos. Por favor, tente novamente.
                            </div>
                        `;
                    });
            }
        } else if (!query) {
            // No search term provided
            const resultsContainer = document.getElementById('searchResults');
            if (resultsContainer) {
                resultsContainer.innerHTML = `
                    <div class="no-results text-center py-5">
                        <i class="fas fa-search fa-3x mb-3 text-muted"></i>
                        <h3>Digite um termo de busca</h3>
                        <p class="text-muted">Use a barra de busca para encontrar os produtos que procura.</p>
                        <a href="produtos.html" class="btn btn-primary mt-3">Ver Todos os Produtos</a>
                    </div>
                `;
            }
        }
    }
    
    // Initialize search page if needed
    initSearchPage();
});

// Product search functionality with Firebase integration
async function searchProducts(query) {
    try {
        const urlBase = 'https://shopping-das-embalagens-default-rtdb.firebaseio.com/products.json';
        const response = await fetch(urlBase);
        
        if (!response.ok) {
            throw new Error('Erro ao carregar produtos do banco de dados');
        }
        
        const data = await response.json();
        
        // Converter o objeto de produtos em um array
        const products = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                products.push({
                    id: key,
                    ...data[key]
                });
            }
        }
        
        // Normalizar a query para busca sem acentos e em minúsculas
        const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        // Filtrar produtos que correspondem à busca
        const filteredProducts = products.filter(product => {
            // Verificar se o produto tem os campos necessários
            if (!product.name || !product.category || !product.subcategory) {
                return false;
            }
            
            // Normalizar os campos do produto para busca
            const normalizedName = product.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const normalizedCategory = product.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const normalizedSubcategory = product.subcategory.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            
            // Verificar se a query está contida em algum dos campos
            return (
                normalizedName.includes(normalizedQuery) ||
                normalizedCategory.includes(normalizedQuery) ||
                normalizedSubcategory.includes(normalizedQuery)
            );
        });
        
        return filteredProducts;
    } catch (error) {
        console.error('Erro na busca de produtos:', error);
        return [];
    }
}

// Display search results with product details
function displaySearchResults(results, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x mb-3"></i>
                <h3>Nenhum produto encontrado</h3>
                <p>Não encontramos produtos que correspondam à sua busca.</p>
                <a href="produtos.html" class="btn btn-primary mt-3">Ver Todos os Produtos</a>
            </div>
        `;
        return;
    }
    
    // Criar título de resultados
    const resultsTitle = document.createElement('h3');
    resultsTitle.className = 'search-results-title';
    resultsTitle.textContent = `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'} encontrados`;
    container.appendChild(resultsTitle);
    
    // Criar container para os itens
    const resultsGrid = document.createElement('div');
    resultsGrid.className = 'search-results-grid';
    
    // Adicionar cada produto como um card
    results.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'search-result-item';
        
        // Construir a URL da imagem (usando imagem padrão se não houver)
        const imageUrl = product.imageUrl || './src/images/produto-sem-imagem.jpg';
        const productUrl = `produtos.html?categoria=${encodeURIComponent(product.category)}&subcategoria=${encodeURIComponent(product.subcategory)}`;
        
        productElement.innerHTML = `
            <div class="search-result-image">
                <img src="${imageUrl}" alt="${product.name}" loading="lazy" onerror="this.src='./src/images/produto-sem-imagem.jpg'">
            </div>
            <div class="search-result-content">
                <h3>${product.name}</h3>
                <div class="search-result-meta">
                    <span class="category">${product.category}</span>
                    <span class="divider">•</span>
                    <span class="subcategory">${product.subcategory}</span>
                </div>
                ${product.description ? `<p class="description">${product.description.substring(0, 120)}...</p>` : ''}
                <div class="search-result-actions">
                    <a href="${productUrl}" class="btn btn-primary">Ver Detalhes</a>
                    <span class="price">${product.price ? `R$ ${parseFloat(product.price).toFixed(2).replace('.', ',')}` : 'Sob Consulta'}</span>
                </div>
            </div>
        `;
        
        resultsGrid.appendChild(productElement);
    });
    
    container.appendChild(resultsGrid);
}

// Initialize search on search page
if (window.location.pathname.includes('search.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('search');
    
    if (query) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = query;
        }
        
        const results = searchProducts(query);
        const resultsContainer = document.getElementById('searchResults');
        if (resultsContainer) {
            displaySearchResults(results, resultsContainer);
        }
    }
} 