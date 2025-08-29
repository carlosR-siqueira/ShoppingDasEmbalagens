// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    setupSearchFunctionality();
});

// Also try to setup after delays to ensure compatibility with dynamic menu
setTimeout(setupSearchFunctionality, 600);
setTimeout(setupSearchFunctionality, 1000);

function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.getElementById('searchIcon');
    const searchForm = document.querySelector('.searchBarContainer');
    
    if (!searchInput || !searchIcon) {
        console.log('🔍 Search elements not found, will retry...');
        return;
    }
    
    console.log('🔍 Setting up search functionality...');
    
    // Check if already setup to avoid duplicates
    if (searchInput.hasAttribute('data-search-setup')) {
        console.log('🔍 Search already setup, skipping...');
        return;
    }
    
    // Mark as setup
    searchInput.setAttribute('data-search-setup', 'true');
    searchIcon.setAttribute('data-search-setup', 'true');
    
    // Prevent form submission completely
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            performSearch();
            return false;
        });
    }
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopImmediatePropagation();
            performSearch();
            return false;
        }
    });
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    });
    
    // Search on icon click - multiple event types to be sure
    ['click', 'mousedown', 'mouseup'].forEach(eventType => {
        searchIcon.addEventListener(eventType, function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            if (eventType === 'click') {
                performSearch();
            }
            return false;
        });
    });
    
    console.log('Search functionality setup completed');
    
    function performSearch() {
        const currentSearchInput = document.getElementById('searchInput');
        if (!currentSearchInput) return;
        
        const searchTerm = currentSearchInput.value.trim();
        if (searchTerm.length > 0) {
            // Check if we're already on search.html
            if (window.location.pathname.includes('search.html')) {
                // Update URL and reload search results
                const newUrl = `search.html?search=${encodeURIComponent(searchTerm)}`;
                window.history.pushState({}, '', newUrl);
                
                // Trigger search results update
                const resultsContainer = document.getElementById('searchResults');
                if (resultsContainer) {
                    resultsContainer.innerHTML = `
                        <div class="loading" style="text-align: center; padding: 3rem;">
                            <p>🔄 Buscando produtos...</p>
                        </div>
                    `;
                    
                    // Perform search and display results
                    searchProducts(searchTerm).then(results => {
                        displaySearchResults(results, resultsContainer);
                    });
                    
                    // Update page title
                    document.title = `Busca: ${searchTerm} - Shopping das Embalagens`;
                }
            } else {
                // Redirect to search page with query parameter
                window.location.href = `search.html?search=${encodeURIComponent(searchTerm)}`;
            }
        }
    }
}

// Product search functionality - busca dinâmica no banco de dados
function searchProducts(query) {
    const urlBase = `https://shopping-das-embalagens-default-rtdb.firebaseio.com/products.json`;
    
    console.log(`🔍 Buscando produtos para: "${query}"`);
    
    return fetch(urlBase)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('📦 Dados recebidos do Firebase para busca:', data);
            const allProducts = [];
            
            // Percorrer todas as categorias e subcategorias para coletar todos os produtos
            for (const categoria in data) {
                if (data.hasOwnProperty(categoria)) {
                    for (const subcategoria in data[categoria]) {
                        if (data[categoria].hasOwnProperty(subcategoria)) {
                            for (const produtoId in data[categoria][subcategoria]) {
                                const produto = data[categoria][subcategoria][produtoId];
                                allProducts.push({
                                    id: produtoId,
                                    name: produto.name,
                                    category: categoria,
                                    subcategory: subcategoria,
                                    imageUrl: produto.imageUrl,
                                    description: produto.description || ''
                                });
                            }
                        }
                    }
                }
            }
            
            // Filtrar produtos baseado na consulta
            const filteredProducts = allProducts.filter(product => 
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase()) ||
                product.subcategory.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );
            
            console.log(`✅ Encontrados ${filteredProducts.length} produtos para "${query}"`);
            return filteredProducts;
        })
        .catch(error => {
            console.error('❌ Erro ao buscar produtos:', error);
            return [];
        });
}

// Display search results - versão melhorada com imagens e mais detalhes
function displaySearchResults(results, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results" style="text-align: center; padding: 3rem; color: #666;">
                <h3>🔍 Nenhum produto encontrado</h3>
                <p>Tente usar termos diferentes ou navegue pelas nossas categorias.</p>
                <a href="produtos.html" class="btn btn-primary" style="margin-top: 1rem;">Ver Todos os Produtos</a>
            </div>
        `;
        return;
    }
    
    // Criar grid de resultados
    container.innerHTML = `<div class="search-results-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; padding: 1rem 0;"></div>`;
    const grid = container.querySelector('.search-results-grid');
    
    results.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'search-result-item card';
        productElement.innerHTML = `
            <img class="card-img-top" src="${product.imageUrl}" alt="${product.name}" loading="lazy" style="height: 200px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Categoria: ${product.category} > ${product.subcategory}</p>
                ${product.description ? `<p class="card-description" style="font-size: 0.9rem; color: #666;">${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}</p>` : ''}
                <div class="card-buttons" style="margin-top: auto;">
                    <a href="item.html?categoria=${encodeURIComponent(product.category)}&subcategoria=${encodeURIComponent(product.subcategory)}&produtoId=${product.id}" class="btn btn-primary">Ver Produto</a>
                    <a href="produtos.html?categoria=${encodeURIComponent(product.category)}&subcategoria=${encodeURIComponent(product.subcategory)}" class="btn btn-secondary">Ver Categoria</a>
                </div>
            </div>
        `;
        grid.appendChild(productElement);
    });
}

// Initialize search on search page - versão assíncrona
if (window.location.pathname.includes('search.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('search');
    
    if (query) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = query;
        }
        
        const resultsContainer = document.getElementById('searchResults');
        
        // Mostrar loading
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="loading" style="text-align: center; padding: 3rem;">
                    <p>🔄 Buscando produtos...</p>
                </div>
            `;
        }
        
        // Buscar produtos (função agora é assíncrona)
        searchProducts(query).then(results => {
            displaySearchResults(results, resultsContainer);
        });
        
        // Update page title
        document.title = `Busca: ${query} - Shopping das Embalagens`;
    }
}