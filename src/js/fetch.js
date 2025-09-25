document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');  // Exemplo: "Descartáveis"
    const subcategoria = urlParams.get('subcategoria'); // Exemplo: "Plástico"
    const produtoId = urlParams.get('produtoId');
    const pageParam = urlParams.get('page'); // Página atual da paginação

    if (produtoId) {
        fetchDetalhesProduto(categoria, subcategoria, produtoId);
    } else {
        // Se há parâmetro de página na URL, usar ele; senão usar página 1
        const initialPage = pageParam ? parseInt(pageParam) : 1;
        fetchProdutos(categoria, subcategoria, initialPage);
    }
});

// Variáveis globais para paginação
let allProducts = [];
let currentPage = 1;
const productsPerPage = 8;
let currentCategoria = '';
let currentSubcategoria = '';

function fetchProdutos(categoria, subcategoria, initialPage = 1) {
    if (!categoria || !subcategoria) {
        console.error("Categoria ou Subcategoria não definida!");
        return;
    }

    // Armazenar categoria e subcategoria atuais
    currentCategoria = categoria;
    currentSubcategoria = subcategoria;

    // Atualizar o título da página com o nome da subcategoria
    document.querySelector('.prodTitle.destaque-produtos-titulo-container').innerHTML = `<h2 class="titulo-destaque-produtos">${subcategoria}</h2>`;

    // URL direta do Firebase
    const baseUrl = 'https://shopping-das-embalagens-default-rtdb.firebaseio.com';
    const url = `${baseUrl}/products/${categoria}/${subcategoria}.json`;
    
    console.log(`🔄 Carregando produtos de ${categoria} > ${subcategoria}`);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os produtos');
            }
            return response.json();
        })
        .then(data => {
            // Converter dados para array
            allProducts = [];
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    allProducts.push({
                        id: key,
                        ...data[key]
                    });
                }
            }

            // Definir página inicial (validar se está dentro do range válido)
            const totalPages = Math.ceil(allProducts.length / productsPerPage);
            currentPage = Math.min(Math.max(initialPage, 1), totalPages || 1);
            
            // Renderizar produtos e paginação
            renderProducts();
            setupPagination();
        })
        .catch(error => console.error("Erro ao carregar produtos:", error));
}

function renderProducts() {
    const container = document.querySelector('.containerItens');
    container.innerHTML = ''; // Limpa os produtos anteriores

    // Calcular índices para a página atual
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = allProducts.slice(startIndex, endIndex);

    // Renderizar produtos da página atual
    productsToShow.forEach(produto => {
        const prodCard = `
            <article class="card" data-id="${produto.id}">
                <div class="card-img-container">
                    <img class="card-img-top" src="${produto.imageUrl}" alt="${produto.name}" loading="lazy">
                </div>
                <div class="card-body">
                    <div class="card-text-container">
                        <h5 class="card-title">${produto.name}</h5>
                    </div>
                    <div class="card-buttons">
                        <a href="item.html?categoria=${currentCategoria}&subcategoria=${currentSubcategoria}&produtoId=${produto.id}" class="btn btn-primary">Ver Produto</a>
                        <button class="add-to-quote-btn" data-product-id="${produto.id}" onclick="addToQuoteList({
                            id: '${produto.id}',
                            name: '${produto.name}',
                            category: '${currentCategoria}',
                            subcategory: '${currentSubcategoria}',
                            imageUrl: '${produto.imageUrl}'
                        })">
                            <i class="fas fa-plus"></i> Adicionar à Lista
                        </button>
                    </div>
                </div>
            </article>`;
        container.insertAdjacentHTML('beforeend', prodCard);
    });

    // Atualizar informações de paginação
    updatePaginationInfo();
    
    // Atualizar botões "Adicionar à Lista" se o sistema de orçamento estiver disponível
    if (typeof quoteSystem !== 'undefined') {
        quoteSystem.updateAddButtons();
    }
}

function setupPagination() {
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    const paginationContainer = document.querySelector('.pagination-container');
    const paginationList = document.getElementById('pagination-list');
    
    // Mostrar container de paginação se houver mais de 8 produtos
    if (allProducts.length > productsPerPage) {
        paginationContainer.style.display = 'block';
    } else {
        paginationContainer.style.display = 'none';
        return;
    }

    // Obter botões Previous e Next
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    // Limpar lista de páginas
    paginationList.innerHTML = '';

    // Criar números de página
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        
        const pageLink = document.createElement('a');
        pageLink.className = `pagination-link ${i === currentPage ? 'is-current' : ''}`;
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.setAttribute('aria-label', `Página ${i}`);
        if (i === currentPage) {
            pageLink.setAttribute('aria-current', 'page');
        }
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            goToPage(i);
        });

        pageItem.appendChild(pageLink);
        paginationList.appendChild(pageItem);
    }

    // Configurar botões anterior/próximo
    if (currentPage === 1) {
        prevButton.classList.add('is-disabled');
        prevButton.setAttribute('disabled', 'disabled');
    } else {
        prevButton.classList.remove('is-disabled');
        prevButton.removeAttribute('disabled');
    }

    if (currentPage === totalPages) {
        nextButton.classList.add('is-disabled');
        nextButton.setAttribute('disabled', 'disabled');
    } else {
        nextButton.classList.remove('is-disabled');
        nextButton.removeAttribute('disabled');
    }

    prevButton.onclick = (e) => {
        e.preventDefault();
        if (currentPage > 1) goToPage(currentPage - 1);
    };

    nextButton.onclick = (e) => {
        e.preventDefault();
        if (currentPage < totalPages) goToPage(currentPage + 1);
    };
}

function goToPage(page) {
    currentPage = page;
    renderProducts();
    setupPagination();
    
    // Atualizar URL com a página atual
    updateURLWithPage(page);
    
    // Scroll para o título da seção de produtos (mais visível)
    const titleElement = document.querySelector('.prodTitle.destaque-produtos-titulo-container');
    if (titleElement) {
        titleElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    } else {
        // Fallback para o container de produtos
        document.querySelector('.containerItens').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

function updateURLWithPage(page) {
    const url = new URL(window.location);
    
    if (page === 1) {
        // Se for página 1, remover o parâmetro 'page' da URL
        url.searchParams.delete('page');
    } else {
        // Caso contrário, definir o parâmetro 'page'
        url.searchParams.set('page', page);
    }
    
    // Atualizar URL sem recarregar a página
    window.history.replaceState({}, '', url);
}

function updatePaginationInfo() {
    const startIndex = (currentPage - 1) * productsPerPage + 1;
    const endIndex = Math.min(currentPage * productsPerPage, allProducts.length);
    
    document.getElementById('showing-start').textContent = startIndex;
    document.getElementById('showing-end').textContent = endIndex;
    document.getElementById('total-products').textContent = allProducts.length;
}


function fetchDetalhesProduto(categoria, subcategoria, produtoId) {
    console.log('fetchDetalhesProduto chamado com:', { categoria, subcategoria, produtoId });
    
    // Verificar se os parâmetros necessários estão presentes
    if (!categoria || !subcategoria || !produtoId) {
        const errorMsg = `Parâmetros ausentes: categoria=${categoria}, subcategoria=${subcategoria}, produtoId=${produtoId}`;
        console.error("Erro:", errorMsg);
        document.querySelector('.detalhes-produto-container').innerHTML = `
            <div class="error-message">
                <p>Erro ao carregar o produto. Parâmetros insuficientes.</p>
                <p>${errorMsg}</p>
                <a href="index.html" class="btn btn-primary">Voltar para a página inicial</a>
            </div>
        `;
        return;
    }

    // Codificar os parâmetros para URL
    const categoriaCodificada = encodeURIComponent(categoria);
    const subcategoriaCodificada = encodeURIComponent(subcategoria);
    const produtoIdCodificado = encodeURIComponent(produtoId);
    
    // URL direta do Firebase (mesma usada na função fetchProdutos)
    const baseUrl = 'https://shopping-das-embalagens-default-rtdb.firebaseio.com';
    const url = `${baseUrl}/products/${categoriaCodificada}/${subcategoriaCodificada}/${produtoIdCodificado}.json`;
    
    console.log('Buscando detalhes do produto em:', url);

    fetch(url)
        .then(response => {
            console.log('Resposta da API recebida. Status:', response.status);
            if (!response.ok) {
                throw new Error(`Erro HTTP ${response.status} ao buscar os detalhes do produto`);
            }
            return response.json();
        })
        .then(produto => {
            console.log('Dados do produto recebidos:', produto);
            
            if (!produto || Object.keys(produto).length === 0) {
                const errorMsg = "Produto não encontrado ou dados inválidos!";
                console.error(errorMsg);
                document.querySelector('.detalhes-produto-container').innerHTML = `
                    <div class="error-message">
                        <p>Produto não encontrado.</p>
                        <a href="index.html" class="btn btn-primary">Voltar para a página inicial</a>
                    </div>
                `;
                return;
            }
            
            // Adicionar ID ao objeto do produto para referência
            produto.id = produtoId;
            
            // Chamar exibirDetalhesProduto com o produto e parâmetros adicionais
            exibirDetalhesProduto(produto, categoria, subcategoria);
            
            // Atualizar o botão de voltar com as categorias corretas
            voltarParaCategoria(categoria, subcategoria);
        })
        .catch(error => {
            console.error("Erro ao carregar detalhes do produto:", error);
            document.querySelector('.detalhes-produto-container').innerHTML = `
                <div class="error-message">
                    <p>Ocorreu um erro ao carregar os detalhes do produto.</p>
                    <p>${error.message}</p>
                    <a href="index.html" class="btn btn-primary">Voltar para a página inicial</a>
                </div>
            `;
        });
}

// Função para buscar produtos da mesma subcategoria (exceto o produto atual)
async function buscarProdutosRelacionados(categoria, subcategoria, produtoAtualId) {
    console.log('buscarProdutosRelacionados chamado com:', { categoria, subcategoria, produtoAtualId });
    
    try {
        // Verificar se os parâmetros necessários estão presentes
        if (!categoria || !subcategoria) {
            console.error('Categoria ou subcategoria não fornecida');
            return [];
        }
        
        const baseUrl = 'https://shopping-das-embalagens-default-rtdb.firebaseio.com';
        const urlSafeCategoria = encodeURIComponent(categoria);
        const urlSafeSubcategoria = encodeURIComponent(subcategoria);
        const url = `${baseUrl}/products/${urlSafeCategoria}/${urlSafeSubcategoria}.json`;
        
        console.log('Buscando produtos em:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Erro na resposta da API:', response.status, response.statusText);
            throw new Error('Erro ao buscar produtos relacionados');
        }
        
        const data = await response.json();
        console.log('Dados recebidos da API:', data);
        
        // Se não houver dados ou for um objeto vazio, retornar array vazio
        if (!data) {
            console.log('Nenhum dado retornado para a categoria/subcategoria fornecida');
            return [];
        }
        
        const produtos = [];
        
        // Converter para array e remover o produto atual
        for (const id in data) {
            if (id !== produtoAtualId) { // Não incluir o produto atual
                produtos.push({
                    id: id,
                    name: data[id].name || 'Produto sem nome',
                    imageUrl: data[id].imageUrl || '',
                    // Adicionar outros campos necessários aqui
                    ...data[id]
                });
            }
        }
        
        console.log('Produtos encontrados:', produtos);
        
        // Retornar no máximo 4 produtos relacionados, embaralhados para variedade
        const produtosEmbaralhados = [...produtos].sort(() => 0.5 - Math.random());
        const produtosLimitados = produtosEmbaralhados.slice(0, 4);
        
        console.log('Produtos relacionados retornados:', produtosLimitados);
        return produtosLimitados;
        
    } catch (error) {
        console.error('Erro ao buscar produtos relacionados:', error);
        return [];
    }
}

// Função para renderizar os produtos relacionados
function renderizarProdutosRelacionados(produtos, categoria, subcategoria) {
    console.log('renderizarProdutosRelacionados chamado com:', { 
        produtos, 
        categoria, 
        subcategoria,
        produtosCount: produtos.length 
    });
    
    if (produtos.length === 0) return '';
    
    const produtosHtml = produtos.map(produto => {
        // Garantir que os valores sejam strings e estejam codificados para URL
        const categoriaEncoded = encodeURIComponent(categoria || '');
        const subcategoriaEncoded = encodeURIComponent(subcategoria || '');
        const produtoIdEncoded = encodeURIComponent(produto.id || '');
        const nomeProdutoEncoded = encodeURIComponent(produto.name || '');
        
        // Log para depuração
        console.log('Processando produto:', {
            id: produto.id,
            nome: produto.name,
            categoria,
            subcategoria,
            url: `item.html?categoria=${categoriaEncoded}&subcategoria=${subcategoriaEncoded}&produtoId=${produtoIdEncoded}`
        });
        
        return `
            <article class="card" data-id="${produto.id}">
                <div class="card-img-container">
                    <img class="card-img-top" src="${produto.imageUrl || ''}" alt="${produto.name || ''}" loading="lazy">
                </div>
                <div class="card-body">
                    <div class="card-text-container">
                        <h5 class="card-title">${produto.name || ''}</h5>
                    </div>
                    <div class="card-buttons">
                        <a href="item.html?categoria=${categoriaEncoded}&subcategoria=${subcategoriaEncoded}&produtoId=${produtoIdEncoded}" 
                           class="btn btn-primary" 
                           data-categoria="${categoriaEncoded}" 
                           data-subcategoria="${subcategoriaEncoded}"
                           data-produto-id="${produtoIdEncoded}">
                            Ver Produto
                        </a>
                        <button class="add-to-quote-btn" 
                                data-product-id="${produtoIdEncoded}" 
                                onclick="addToQuoteList({
                                    id: '${produtoIdEncoded.replace(/'/g, "\\'")}',
                                    name: '${nomeProdutoEncoded.replace(/'/g, "\\'")}',
                                    category: '${categoriaEncoded.replace(/'/g, "\\'")}',
                                    subcategory: '${subcategoriaEncoded.replace(/'/g, "\\'")}',
                                    imageUrl: '${(produto.imageUrl || '').replace(/'/g, "\\'")}'
                                }); return false;">
                            <i class="fas fa-plus"></i> Adicionar à Lista
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
    
    return `
        <div class="produtos-relacionados-container related-products-container">
            <h3>Produtos Relacionados</h3>
            <div class="produtos-relacionados-lista">
                ${produtosHtml}
            </div>
        </div>
    `;
}

function exibirDetalhesProduto(produto) {
    let imagens = [];

    // Coletar até 3 imagens (se existirem)
    if (produto.imageUrl) imagens.push(produto.imageUrl);
    if (produto.imageUrl2) imagens.push(produto.imageUrl2);
    if (produto.imageUrl3) imagens.push(produto.imageUrl3);

    let miniaturasHtml = `
        <div class="thumbnails">
            ${imagens.map((img, index) => `
                <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" onclick="mudarImagem(${index})">
            `).join("")}
        </div>
    `;

    let carrosselHtml = `
    <div class="mobile-caption">${1} / ${imagens.length}</div> <!-- Legenda para mobile -->
        <div class="carousel">
            <div class="carousel-images">
                ${imagens.map((img, index) => `
                    <img src="${img}" class="carousel-img ${index === 0 ? 'active' : ''}" onclick="abrirModal(${index})">
                `).join("")}
            </div>
        </div>
    `;

    let indicadoresHtml = "";
    if (imagens.length > 1) {
        indicadoresHtml = `
            <div class="carousel-indicators">
                ${imagens.map((_, index) => `
                    <span class="dot ${index === 0 ? 'active' : ''}" onclick="mudarImagem(${index})"></span>
                `).join("")}
            </div>
        `;
    }

    // Obter categoria e subcategoria da URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');
    const subcategoria = urlParams.get('subcategoria');
    const produtoId = urlParams.get('produtoId');

    const detalhesProduto = `
        <div class="detalhes-produto">
        <div class="produto-coluna-esquerda">
        <div class="imgContainer">
        ${miniaturasHtml}  <!-- Miniaturas à esquerda -->
                    ${carrosselHtml}
                    ${indicadoresHtml}
                </div>
                <!-- Container para produtos relacionados será inserido aqui -->
                <div id="produtos-relacionados-container"></div>
            </div>
            <div class="produto-coluna-direita">
                <div class="descricao-produto-container">
                    <h2>${produto.name}</h2>
                    <p>${produto.description}</p>
                    <div class="produto-actions">
                        <button class="add-to-quote-btn" data-product-id="${produtoId}" onclick="addToQuoteList({
                            id: '${produtoId}',
                            name: '${produto.name}',
                            category: '${categoria}',
                            subcategory: '${subcategoria}',
                            imageUrl: '${produto.imageUrl}'
                        })">
                            <i class="fas fa-plus"></i> Adicionar à Lista de Orçamento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inserir os detalhes do produto
    document.querySelector('.detalhes-produto-container').innerHTML = detalhesProduto;
    
    // Buscar e exibir produtos relacionados
    const urlParamsRelacionados = new URLSearchParams(window.location.search);
    const categoriaRelacionados = urlParamsRelacionados.get('categoria');
    const subcategoriaRelacionados = urlParamsRelacionados.get('subcategoria');
    const produtoIdRelacionados = urlParamsRelacionados.get('produtoId');
    
    // Buscar e exibir produtos relacionados dentro do container específico
    buscarProdutosRelacionados(categoriaRelacionados, subcategoriaRelacionados, produtoIdRelacionados)
        .then(produtosRelacionados => {
            if (produtosRelacionados && produtosRelacionados.length > 0) {
                const html = renderizarProdutosRelacionados(produtosRelacionados, categoriaRelacionados, subcategoriaRelacionados);
                const produtosRelacionadosElement = document.getElementById('produtos-relacionados-container');
                if (produtosRelacionadosElement) {
                    produtosRelacionadosElement.innerHTML = html;
                }
            }
        })
        .catch(error => console.error('Erro ao carregar produtos relacionados:', error));
    
    // Atualizar botão "Adicionar à Lista" se o sistema de orçamento estiver disponível
    if (typeof quoteSystem !== 'undefined') {
        setTimeout(() => {
            quoteSystem.updateAddButtons();
        }, 100);
    }
}




let imagemAtual = 0;
let startX = 0;
let isDragging = false;

function mudarImagem(index) {
    const imagens = document.querySelectorAll(".carousel-img");
    const dots = document.querySelectorAll(".dot");
    const thumbnails = document.querySelectorAll(".thumbnail");

    imagens[imagemAtual].classList.remove("active");
    dots[imagemAtual]?.classList.remove("active");
    thumbnails[imagemAtual].classList.remove("active");

    imagemAtual = index;

    imagens[imagemAtual].classList.add("active");
    dots[imagemAtual]?.classList.add("active");
    thumbnails[imagemAtual].classList.add("active");
}

 // Atualizar a legenda na versão mobile
 if (mobileCaption) {
    mobileCaption.textContent = `${imagemAtual + 1} / ${imagens.length}`;
}


// Função para abrir o modal
function abrirModal(index) {
    imagemAtual = index;
    const imagens = document.querySelectorAll(".carousel-img");
    const totalImagens = imagens.length;

    // Criar o conteúdo do modal com a legenda no topo
    const modalHtml = `
        <div class="modal-content">
            <span class="close" onclick="fecharModal()">&times;</span>
            <div class="modal-caption">${imagemAtual + 1} / ${totalImagens}</div> <!-- Legenda aqui -->
            <img src="${imagens[imagemAtual].src}" class="modal-img">
            <div class="modal-navigation">
                <span class="left-btn" onclick="mudarImagemModal(-1)"> &#10094;</span>
                <span class="right-btn" onclick="mudarImagemModal(1)"> &#10095;</span>
            </div>
        </div>
    `;

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = modalHtml;

    document.body.appendChild(modal);
    modal.style.display = "flex"; // Exibir o modal
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.querySelector(".modal");
    if (modal) {
        modal.style.display = "none";
        document.body.removeChild(modal);
    }
}

// Função para navegar pelas imagens no modal e atualizar a legenda
function mudarImagemModal(direcao) {
    const imagens = document.querySelectorAll(".carousel-img");
    const totalImagens = imagens.length;

    imagemAtual = (imagemAtual + direcao + totalImagens) % totalImagens; // Circular entre as imagens

    const modalImg = document.querySelector(".modal-img");
    modalImg.src = imagens[imagemAtual].src; // Atualizar imagem do modal

    // Atualizar a legenda do modal
    const modalCaption = document.querySelector(".modal-caption");
    modalCaption.textContent = `${imagemAtual + 1} / ${totalImagens}`;
}




// Arrastar para os lados (Swipe)
function startDrag(event) {
    isDragging = true;
    startX = event.touches ? event.touches[0].clientX : event.clientX;

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", onDrag);
    document.addEventListener("touchend", stopDrag);
}

function onDrag(event) {
    if (!isDragging) return;
    
    let currentX = event.touches ? event.touches[0].clientX : event.clientX;
    let diff = startX - currentX;

    if (diff > 50) {
        mudarImagem((imagemAtual + 1) % document.querySelectorAll(".carousel-img").length);
        stopDrag();
    } else if (diff < -50) {
        mudarImagem((imagemAtual - 1 + document.querySelectorAll(".carousel-img").length) % document.querySelectorAll(".carousel-img").length);
        stopDrag();
    }
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("touchend", stopDrag);
}



function voltarParaCategoria(categoria, subcategoria) {
    const voltarBtn = `<a href="produtos.html?categoria=${categoria}&subcategoria=${subcategoria}" class="voltarBtn btn btn-primary">Voltar</a>`;
    document.querySelector(".voltarBtnContainer").innerHTML = voltarBtn;
}







