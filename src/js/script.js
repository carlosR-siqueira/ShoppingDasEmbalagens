// Variáveis globais
const btnMobile = document.querySelector('.btn-mobile-menu');
const headerList = document.querySelector(".header-list");
const searchBar = document.querySelector(".searchBarContainer");
const backOverlay = document.querySelector('.back-overlay');
const dropdownContent = document.querySelector('.dropdown-content');

// Função para abrir o menu móvel
function openMobileMenu() {
    if (headerList) headerList.classList.toggle('dropdown-content-mobile');
    if (btnMobile) btnMobile.classList.toggle('active');
    if (backOverlay) backOverlay.classList.toggle('overlay');
    if (searchBar) searchBar.classList.toggle('searchBarShow');
    
    // Fecha os submenus quando o menu mobile é aberto/fechado
    if (headerList && !headerList.classList.contains('dropdown-content-mobile')) {
        document.querySelectorAll('.subMenu-itens').forEach(menu => {
            menu.classList.remove('show');
        });
    }
}

// Função para fechar o menu móvel
function closeMobileMenu() {
    if (headerList) headerList.classList.remove('dropdown-content-mobile');
    if (btnMobile) btnMobile.classList.remove('active');
    if (backOverlay) backOverlay.classList.remove('overlay');
    if (searchBar) searchBar.classList.remove('searchBarShow');
    
    // Fecha todos os submenus
    const subMenus = document.querySelectorAll('.subMenu-itens');
    if (subMenus) {
        subMenus.forEach(menu => {
            menu.classList.remove('show');
        });
    }
    
    if (dropdownContent) {
        dropdownContent.classList.remove('showContent');
    }
}

// Função para buscar produtos
function buscarProdutos(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        console.log('Termo de busca vazio');
        return;
    }
    
    console.log('Buscando por:', searchTerm);
    
    // Se estivermos na página de busca, executa a busca diretamente
    if (window.location.pathname.includes('search.html')) {
        fetchProdutosFiltrados(searchTerm);
    } else {
        // Caso contrário, redireciona para a página de busca
        window.location.href = `search.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Função para inicializar a página de busca
function initSearchPage() {
    const searchContainer = document.querySelector(".searchBarContainer");
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");
    const container = document.querySelector(".containerItens");
    const titleContainer = document.querySelector(".prodTitle");
    
    if (!searchContainer || !searchInput || !searchIcon || !container || !titleContainer) {
        return; // Elementos não encontrados
    }
    
    // Função para executar a busca na página de resultados
    function executarBusca() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            buscarProdutos(searchTerm);
        }
    }
    
    // Configura os eventos de busca
    searchIcon.addEventListener("click", function(event) {
        event.preventDefault();
        searchContainer.classList.add("active");
        searchInput.focus();
        
        if (searchInput.value.trim() !== "") {
            executarBusca();
        }
    });
    
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            executarBusca();
        }
    });
    
    // Se houver um termo de busca na URL, executa a busca
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('search');
    
    if (searchTerm) {
        searchInput.value = searchTerm;
        fetchProdutosFiltrados(searchTerm);
    }
}

// Função para inicializar a barra de busca
function initSearchBar() {
    const searchContainer = document.querySelector(".searchBarContainer");
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");
    
    if (!searchContainer || !searchInput || !searchIcon) return;
    
    // Adiciona evento de clique no ícone de busca
    searchIcon.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation(); // Evita que o clique se propague para o documento
        
        // Alterna a classe de exibição da barra de busca
        searchContainer.classList.toggle("searchBarShow");
        
        // Se a barra estiver visível, foca no campo de busca
        if (searchContainer.classList.contains("searchBarShow")) {
            searchInput.focus();
        }
        
        // Se houver texto no campo de busca, executa a busca
        if (searchInput.value.trim() !== "") {
            buscarProdutos(searchInput.value.trim());
        }
    });
    
    // Adiciona evento de tecla Enter no campo de busca
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            buscarProdutos(searchInput.value.trim());
        }
    });
    
    // Fecha a barra de busca ao clicar fora
    document.addEventListener('click', function(event) {
        if (!searchContainer.contains(event.target) && !event.target.closest('.searchBarContainer')) {
            searchContainer.classList.remove("searchBarShow");
        }
    });
    
    // Evita que o clique na barra de busca feche o menu mobile
    searchContainer.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa a barra de busca
    initSearchBar();
    // Adiciona o evento de clique no botão do menu móvel
    if (btnMobile) {
        btnMobile.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que o evento se propague para outros elementos
            openMobileMenu();
        });
    }
    
    // Adiciona evento para fechar o menu ao clicar fora
    if (backOverlay) {
        backOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeMobileMenu();
            }
        });
    }
    
    // Fecha o menu ao pressionar ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Atualiza o ano do rodapé
    const yearElement = document.querySelector('.currentYear');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
    
    // Inicializa a página de busca se estivermos nela
    if (window.location.pathname.includes('search.html')) {
        initSearchPage();
    }
});

// Função para buscar produtos filtrados
function fetchProdutosFiltrados(searchTerm) {
    const container = document.querySelector(".containerItens");
    const titleContainer = document.querySelector(".prodTitle");
    
    if (!container || !titleContainer) {
        console.error("Elementos do DOM não encontrados");
        return;
    }

    const urlBase = `https://shopping-das-embalagens-default-rtdb.firebaseio.com/products.json`;
    container.innerHTML = "<p>Buscando produtos...</p>";  // Mensagem de carregamento

    fetch(urlBase)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Dados recebidos do Firebase:", data);

                let produtosEncontrados = [];

                if (!data || typeof data !== "object") {
                    console.error("Estrutura de dados inesperada:", data);
                    container.innerHTML = "<p>Erro: estrutura de dados inesperada.</p>";
                    return;
                }

                const searchTermNormalized = removerAcentos(searchTerm);

                // Percorre todas as categorias dentro de "products"
                for (const categoria in data) {
                    const subcategorias = data[categoria];

                    if (!subcategorias || typeof subcategorias !== "object") {
                        continue;
                    }

                    const categoriaNormalized = removerAcentos(categoria); // Normaliza a categoria

                    // Percorre todas as subcategorias
                    for (const subcategoria in subcategorias) {
                        const produtos = subcategorias[subcategoria];

                        if (!produtos || typeof produtos !== "object") {
                            continue;
                        }

                        const subcategoriaNormalized = removerAcentos(subcategoria); // Normaliza a subcategoria

                        // Percorre todos os produtos dentro da subcategoria
                        for (const produtoId in produtos) {
                            const produto = produtos[produtoId];

                            if (!produto || typeof produto !== "object") {
                                continue;
                            }

                            const descricaoNormalized = removerAcentos(produto.description || "");
                            const nomeNormalized = removerAcentos(produto.name || "");

                            // Verifica se o termo pesquisado está no nome, descrição, categoria ou subcategoria
                            if (
                                nomeNormalized.includes(searchTermNormalized) ||
                                descricaoNormalized.includes(searchTermNormalized) ||
                                categoriaNormalized.includes(searchTermNormalized) ||
                                subcategoriaNormalized.includes(searchTermNormalized)
                            ) {
                                produtosEncontrados.push({
                                    ...produto,
                                    category: categoria,
                                    subcategory: subcategoria,
                                    produtoId
                                });
                            }
                        }
                    }
                }

                console.log("Produtos encontrados:", produtosEncontrados); // Debug

                // Atualiza a interface com os produtos encontrados
                container.innerHTML = produtosEncontrados.length > 0
                    ? produtosEncontrados.map(prod => `
                    <article class="card" data-id="${prod.produtoId}">
                        <img class="card-img-top" src="${prod.imageUrl}" alt="${prod.name}">
                        <div class="card-body">
                            <h5 class="card-title">${prod.name}</h5>
                            <a href="item.html?categoria=${prod.category}&subcategoria=${prod.subcategory}&produtoId=${prod.produtoId}" class="btn btn-primary">Ver Produto</a>
                        </div>
                    </article>
                `).join("")
                    : "<p>Nenhum produto encontrado.</p>";  // Caso não encontre nada

            })
            .catch(error => {
                console.error("Erro ao buscar produtos:", error);
                container.innerHTML = "<p>Erro ao buscar produtos. Tente novamente.</p>";
            });
    }

// Função para remover acentos e normalizar texto
function removerAcentos(texto) {
    if (!texto) return '';
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Função para abrir a janela modal maps
function openModalMap() {
    document.getElementById("myModal").style.display = "block";
    initMap();
}

// Função para fechar a janela modal maps


function closeModal() {
    document.getElementById("myModal").style.display = "none";


}

const myModal = document.getElementById("myModal")

myModal.addEventListener('click', function (e) {
    if (e.target == this) {
        myModal.style.display = 'none';
    }
});

document.addEventListener("keydown", (ev) => {
    if (ev.key === 'Escape') {
        myModal.style.display = 'none';
    }
});



// Função para carregar produtos em destaque do banco de dados
function loadFeaturedProducts() {
    const urlBase = `https://shopping-das-embalagens-default-rtdb.firebaseio.com/products.json`;
    
    console.log('🔄 Carregando produtos em destaque do banco de dados...');
    
    fetch(urlBase)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('📦 Dados recebidos do Firebase:', data);
            const featuredProducts = [];
            
            // Percorrer todas as categorias e subcategorias para encontrar produtos em destaque
            for (const categoria in data) {
                if (data.hasOwnProperty(categoria)) {
                    for (const subcategoria in data[categoria]) {
                        if (data[categoria].hasOwnProperty(subcategoria)) {
                            for (const produtoId in data[categoria][subcategoria]) {
                                const produto = data[categoria][subcategoria][produtoId];
                                if (produto.featured === true) {
                                    featuredProducts.push({
                                        ...produto,
                                        categoria: categoria,
                                        subcategoria: subcategoria,
                                        id: produtoId
                                    });
                                }
                            }
                        }
                    }
                }
            }
            
            console.log(`✅ Encontrados ${featuredProducts.length} produtos em destaque`);
            
            // Limitar a 6 produtos em destaque para não sobrecarregar a página
            const limitedProducts = featuredProducts.slice(0, 8);
            
            // Renderizar os produtos em destaque
            renderFeaturedProducts(limitedProducts);
        })
        .catch(error => {
            console.error('❌ Erro ao carregar produtos em destaque:', error);
            
            // Exibir mensagem de erro para o usuário
            const container = document.querySelector('.card-produtos');
            if (container) {
                container.innerHTML = `
                    <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #666;">
                        <p>⚠️ Não foi possível carregar os produtos em destaque no momento.</p>
                        <p>Tente recarregar a página ou entre em contato conosco.</p>
                    </div>
                `;
            }
        });
}

// Função para renderizar os produtos em destaque
function renderFeaturedProducts(products) {
    const container = document.querySelector('.card-produtos');
    if (!container) return;
    
    // Limpar container
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="no-featured" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <p>Nenhum produto em destaque no momento.</p>
                <a href="produtos.html" class="btn btn-primary">Ver Todos os Produtos</a>
            </div>
        `;
        return;
    }
    
    // Renderizar cada produto
    products.forEach(produto => {
      
        const cardHTML = `
            <article class="card">
                <div class="card-img-container">
                    <img class="card-img-top" src="${produto.imageUrl}" alt="${produto.name}" loading="lazy" ;">
                    ${produto.featured ? '<span class="featured-badge">Destaque</span>' : ''}
                </div>
                <div class="card-body">
                    <div class="card-text-container">
                        <h5 class="card-title">${produto.name}</h5>
    
                    </div>
                    <div class="card-buttons">
                        <a href="item.html?categoria=${encodeURIComponent(produto.categoria)}&subcategoria=${encodeURIComponent(produto.subcategoria)}&produtoId=${produto.id}" class="btn btn-primary">Ver Produto</a>
                        <button class="add-to-quote-btn" data-product-id="${produto.id}" onclick="addToQuoteList({
                            id: '${produto.id}',
                            name: '${produto.name}',
                            category: '${produto.categoria}',
                            subcategory: '${produto.subcategoria}',
                            imageUrl: '${produto.imageUrl}'
                        })">
                            <i class="fas fa-plus"></i> Adicionar à Lista
                        </button>
                    </div>
                </div>
            </article>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
    
    // Atualizar botões "Adicionar à Lista" se o sistema de orçamento estiver disponível
    if (typeof quoteSystem !== 'undefined') {
        quoteSystem.updateAddButtons();
    }
}

// Carregar produtos em destaque quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página principal (index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        loadFeaturedProducts();
    }
});

window.addEventListener("scroll", function () {
    var whatsappIcon = document.querySelector(".whatsapp-icon");
    var distanceFromTop = window.scrollY;

    if (distanceFromTop > 200) {
        whatsappIcon.style.transform = "scale(1)";
    } else {
        whatsappIcon.style.transform = "scale(0)";
    }
});
