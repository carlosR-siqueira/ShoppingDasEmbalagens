// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.getElementById('searchIcon');
    
    if (searchInput && searchIcon) {
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Search on icon click
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
        
        // Search on input change (with debounce)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function() {
                if (searchInput.value.length >= 3) {
                    performSearch();
                }
            }, 500);
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length > 0) {
            // Redirect to search page with query parameter
            window.location.href = `search.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }
});

// Product search functionality
function searchProducts(query) {
    // This would typically connect to a backend API
    // For now, we'll simulate a search
    const products = [
        { name: 'Copo Descartável 200ml', category: 'Descartáveis', subcategory: 'Plástico' },
        { name: 'Talher Descartável', category: 'Descartáveis', subcategory: 'Plástico' },
        { name: 'Quentinha Isopor 500ml', category: 'Descartáveis', subcategory: 'Isopor' },
        { name: 'Sacola Plástica', category: 'Descartáveis', subcategory: 'Plástico' },
        { name: 'Bobina Picotada', category: 'Descartáveis', subcategory: 'Plástico' },
        { name: 'Saco Cristal', category: 'Descartáveis', subcategory: 'Plástico' },
        { name: 'Saco de Lixo', category: 'Descartáveis', subcategory: 'Plástico' },
        { name: 'Filme PVC', category: 'Descartáveis', subcategory: 'Plástico' }
    ];
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(query.toLowerCase())
    );
    
    return filteredProducts;
}

// Display search results
function displaySearchResults(results, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<p>Nenhum produto encontrado para sua busca.</p>';
        return;
    }
    
    results.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'search-result-item';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Categoria: ${product.category} > ${product.subcategory}</p>
            <a href="produtos.html?categoria=${encodeURIComponent(product.category)}&subcategoria=${encodeURIComponent(product.subcategory)}" class="btn btn-primary">Ver Produtos</a>
        `;
        container.appendChild(productElement);
    });
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