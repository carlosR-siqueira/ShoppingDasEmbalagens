// menu dropdown ↓↓

const btnMobile = document.querySelector('.btn-mobile-menu');
const headerMobileMenu = document.querySelector('.header-mobile-menu')
const headerList = document.querySelector(".header-list");
const searchBar = document.querySelector(".searchBarContainer");
const dropBtn = document.querySelector('.drop-mobile');
const dropdownContent = document.querySelector('.dropdown-content');
const contentMobile = document.querySelector('.content-mobile')
const dropdown = document.querySelector('.dropdown');
const headerListItens = document.querySelectorAll(".header-list-itens");
const voltarBtn = document.querySelectorAll('.item-title-container');
const prodEmDestaque = document.querySelector('.prod-em-destaque');
const backOverlay = document.querySelector('.back-overlay');
const subMenuItens = document.querySelectorAll('subMenu-itens')


document.addEventListener('DOMContentLoaded', function () {
    const descartaveisSubMenu = document.querySelector('.descartaveis-subMenu');
    const domesticosSubMenu = document.querySelector('.domesticos-subMenu');
    const festaSubMenu = document.querySelector('.festa-subMenu');
    const limpezaSubMenu = document.querySelector('.limpeza-subMenu');

    const descartaveisSubMenuItems = document.querySelector('.descartaveis-subMenu-itens');
    const domesticosSubMenuItems = document.querySelector('.domesticos-subMenu-itens');
    const festaSubMenuItems = document.querySelector('.festa-subMenu-itens');
    const limpezaSubMenuItems = document.querySelector('.limpeza-subMenu-itens');

    function toggleSubMenu(subMenu) {
        subMenu.classList.toggle('show');
    }

    function closeOtherSubMenus(currentSubMenu) {
        const allSubMenus = [descartaveisSubMenuItems, domesticosSubMenuItems, festaSubMenuItems, limpezaSubMenuItems];
        allSubMenus.forEach(subMenu => {
            if (subMenu !== currentSubMenu && subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
            }
        });
    }

    descartaveisSubMenu.addEventListener('click', function (event) {
        event.preventDefault();
        toggleSubMenu(descartaveisSubMenuItems);
        closeOtherSubMenus(descartaveisSubMenuItems);
    });

    domesticosSubMenu.addEventListener('click', function (event) {
        event.preventDefault();
        toggleSubMenu(domesticosSubMenuItems);
        closeOtherSubMenus(domesticosSubMenuItems);
    });

    festaSubMenu.addEventListener('click', function (event) {
        event.preventDefault();
        toggleSubMenu(festaSubMenuItems);
        closeOtherSubMenus(festaSubMenuItems);
    });

    limpezaSubMenu.addEventListener('click', function (event) {
        event.preventDefault();
        toggleSubMenu(limpezaSubMenuItems);
        closeOtherSubMenus(limpezaSubMenuItems);
    });







    const allSubMenus = [descartaveisSubMenuItems, domesticosSubMenuItems, festaSubMenuItems, limpezaSubMenuItems];
    allSubMenus.forEach(subMenu => {
        subMenu.addEventListener('click', function () {
            if (subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
            }
        });
    });

    // Adicionando um listener para fechar os submenus ao clicar fora deles
    document.addEventListener('mouseout', function (event) {
        allSubMenus.forEach(subMenu => {
            if (!event.target.closest('.dropdown') && subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
            }
        });
    });

    voltarBtn[0].addEventListener('click', function () {

        dropdownContent.classList.remove('showContent')

    })

    voltarBtn.forEach(voltar => {
        voltar.addEventListener('click', function () {


            const allSubMenus = [descartaveisSubMenuItems, domesticosSubMenuItems, festaSubMenuItems, limpezaSubMenuItems];
            allSubMenus.forEach(subMenu => {

                subMenu.classList.remove('show')

            });

        });
    });



    btnMobile.addEventListener('click', openMobileMenu)


    function openMobileMenu() {
        headerList.classList.toggle('dropdown-content-mobile')
        btnMobile.classList.toggle('active')
        backOverlay.classList.toggle('overlay')
        searchBar.classList.toggle('searchBarShow')

    }


    dropBtn.addEventListener('click', function () {


        dropdownContent.classList.toggle('showContent')



    })



    btnMobile.addEventListener('click', () => {

        if (!btnMobile.classList.contains('active')) {


            const allSubMenus = [descartaveisSubMenuItems, domesticosSubMenuItems, festaSubMenuItems, limpezaSubMenuItems];
            allSubMenus.forEach(subMenu => {
                subMenu.classList.remove('show')

            });



            dropdownContent.classList.remove('showContent')
            subMenuItens.classList.remove('show')


        }
    })


    headerListItens.forEach((itens) =>
        itens.addEventListener('click', (event) => {

            btnMobile.classList.remove('active')
            headerList.classList.remove('dropdown-content-mobile')
            backOverlay.classList.remove('overlay')
            dropdownContent.classList.remove('showContent')
            subMenuItens.classList.remove('show')



        })
    );


    document.addEventListener("keydown", (event) => {
        if (event.key === 'Escape') {

            headerList.classList.remove('dropdown-content-mobile');
            btnMobile.classList.remove('active')
            backOverlay.classList.remove('overlay')
            dropdownContent.classList.remove('showContent')

            const allSubMenus = [descartaveisSubMenuItems, domesticosSubMenuItems, festaSubMenuItems, limpezaSubMenuItems];
            allSubMenus.forEach(subMenu => {

                subMenu.classList.remove('show')



            });



        }


    });

    backOverlay.addEventListener('click', function (e) {
        if (e.target == this) {

            headerList.classList.remove('dropdown-content-mobile');
            btnMobile.classList.remove('active')
            backOverlay.classList.remove('overlay')
            dropdownContent.classList.remove('showContent')
            searchBar.classList.toggle('searchBarShow')


        }
    });




    // função para atualizar o ano do rodapé

    var currentYear = new Date().getFullYear();
    document.querySelector('.currentYear').textContent = currentYear;


    //função para manipular o search



    const searchContainer = document.querySelector(".searchBarContainer");
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");
    const container = document.querySelector(".containerItens");
    const titleContainer = document.querySelector(".prodTitle");

    function buscarProdutos() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            window.location.href = `search.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }

    // Evento de clique na lupa para abrir o input e buscar
    searchIcon.addEventListener("click", function (event) {
        event.preventDefault();
        searchContainer.classList.add("active");
        searchInput.focus();

        // Se já houver texto digitado, faz a pesquisa
        if (searchInput.value.trim() !== "") {
            buscarProdutos();
        }
    });

    // Fecha a barra de pesquisa ao clicar fora dela
    document.addEventListener("click", function (event) {
        if (!searchContainer.contains(event.target)) {
            searchContainer.classList.remove("active");
        }
    });

    // Captura a pesquisa ao pressionar "Enter"
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            buscarProdutos();
        }
    });





    // Função para remover acentos e normalizar texto
    function removerAcentos(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // Obtém o parâmetro "search" da URL
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('search');

    console.log("Termo pesquisado:", searchTerm); // Verifica se o termo está correto



    // Exibe um título com o termo pesquisado
    titleContainer.innerHTML = `<h2 class="titulo-destaque-produtos">Resultados para: "${searchTerm}"</h2>`;

    function fetchProdutosFiltrados(searchTerm) {
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
                        <img class="card-img-top" src="${prod.imageUrl}" alt="${prod.name}" loading="lazy">
                        <div class="card-body">
                            <h5 class="card-title">${prod.name}</h5>
                            <div class="card-buttons">
                                <a href="item.html?categoria=${prod.category}&subcategoria=${prod.subcategory}&produtoId=${prod.produtoId}" class="btn btn-primary">Ver Produto</a>
                                <button class="add-to-quote-btn" data-product-id="${prod.produtoId}" onclick="addToQuoteList({
                                    id: '${prod.produtoId}',
                                    name: '${prod.name}',
                                    category: '${prod.category}',
                                    subcategory: '${prod.subcategory}',
                                    imageUrl: '${prod.imageUrl}'
                                })">
                                    <i class="fas fa-plus"></i> Adicionar à Lista
                                </button>
                            </div>
                        </div>
                    </article>
                `).join("")
                    : "<p>Nenhum produto encontrado.</p>";  // Caso não encontre nada

                // Atualizar botões "Adicionar à Lista" se o sistema de orçamento estiver disponível
                if (typeof quoteSystem !== 'undefined') {
                    quoteSystem.updateAddButtons();
                }

            })
            .catch(error => {
                console.error("Erro ao buscar produtos:", error);
                container.innerHTML = "<p>Erro ao buscar produtos. Tente novamente.</p>";
            });
    }

    // Se o termo de pesquisa foi fornecido, chama a função
    if (searchTerm) {
        fetchProdutosFiltrados(searchTerm);
    } else {
        container.innerHTML = "<p>Termo de pesquisa não fornecido.</p>";
    }



});




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
    
    fetch(urlBase)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar produtos em destaque');
            }
            return response.json();
        })
        .then(data => {
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
            
            // Renderizar os produtos em destaque
            renderFeaturedProducts(featuredProducts);
        })
        .catch(error => {
            console.error('Erro ao carregar produtos em destaque:', error);
            // Em caso de erro, manter os produtos mockados como fallback
        });
}

// Função para renderizar os produtos em destaque
function renderFeaturedProducts(products) {
    const container = document.querySelector('.card-produtos');
    if (!container) return;
    
    // Limpar container
    container.innerHTML = '';
    
    // Renderizar cada produto
    products.forEach(produto => {
        const cardHTML = `
            <article class="card">
                <img class="card-img-top" src="${produto.imageUrl}" alt="${produto.name}" loading="lazy">
                <div class="card-body">
                    <div class="card-text-container">
                        <h5 class="card-title">${produto.name}</h5>
                        
                    </div>
                    <a href="item.html?categoria=${produto.categoria}&subcategoria=${produto.subcategoria}&produtoId=${produto.id}" class="btn btn-primary">Ver Produto</a>
                </div>
            </article>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
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
