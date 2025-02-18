document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');  // Exemplo: "Descartáveis"
    const subcategoria = urlParams.get('subcategoria'); // Exemplo: "Plástico"
    const produtoId = urlParams.get('produtoId');

    if (produtoId) {
        fetchDetalhesProduto(categoria, subcategoria, produtoId);
    } else {
        fetchProdutos(categoria, subcategoria);
    }
});

function fetchProdutos(categoria, subcategoria) {
    if (!categoria || !subcategoria) {
        console.error("Categoria ou Subcategoria não definida!");
        return;
    }

    // Atualizar o título da página com o nome da subcategoria
    document.querySelector('.prodTitle.destaque-produtos-titulo-container').innerHTML = `<h2 class="titulo-destaque-produtos">${subcategoria}</h2>`;

    const url = `https://shopping-das-embalagens-default-rtdb.firebaseio.com/products/${categoria}/${subcategoria}.json`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os produtos');
            }
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('.containerItens');
            container.innerHTML = ''; // Limpa os produtos anteriores

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const produto = data[key];
                    const prodCard = `
                        <article class="card" data-id="${key}">
                            <img class="card-img-top" src="${produto.imageUrl}">
                            <div class="card-body">
                                <h5 class="card-title">${produto.name}</h5>
                                <a href="item.html?categoria=${categoria}&subcategoria=${subcategoria}&produtoId=${key}" class="btn btn-primary">Ver Produto</a>
                            </div>
                        </article>`;
                    container.insertAdjacentHTML('beforeend', prodCard);
                }
            }
        })
        .catch(error => console.error("Erro ao carregar produtos:", error));
}


function fetchDetalhesProduto(categoria, subcategoria, produtoId) {
    if (!categoria || !subcategoria || !produtoId) {
        console.error("Categoria, Subcategoria ou Produto ID não definidos!");
        return;
    }

    const url = `https://shopping-das-embalagens-default-rtdb.firebaseio.com/products/${categoria}/${subcategoria}/${produtoId}.json`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os detalhes do produto');
            }
            return response.json();
        })
        .then(produto => {
            if (!produto || Object.keys(produto).length === 0) {
                console.error("Produto não encontrado ou dados inválidos!");
                document.querySelector('.detalhes-produto-container').innerHTML = "<p>Produto não encontrado.</p>";
                return;
            }
            exibirDetalhesProduto(produto);
            voltarParaCategoria(categoria, subcategoria);
        })
        .catch(error => console.error("Erro ao carregar detalhes do produto:", error));
}

function exibirDetalhesProduto(produto) {
    let imagens = [];

    // Coletar até 3 imagens (se existirem)
    if (produto.imageUrl) imagens.push(produto.imageUrl);
    if (produto.imageUrl2) imagens.push(produto.imageUrl2);
    if (produto.imageUrl3) imagens.push(produto.imageUrl3);

    let carrosselHtml = "";

    // Sempre permitir o modal ao clicar na imagem, independentemente de quantas imagens existam
    carrosselHtml = `
        <div class="carousel" onmousedown="startDrag(event)" ontouchstart="startDrag(event)">
            <div class="carousel-images">
                ${imagens.map((img, index) => `
                    <img src="${img}" class="carousel-img ${index === 0 ? 'active' : ''}" onclick="abrirModal(${index})">
                `).join("")}
            </div>
        </div>
    `;

    // Se houver mais de uma imagem, adiciona as bolinhas de navegação
    if (imagens.length > 1) {
        carrosselHtml += `
            <div class="carousel-indicators">
                ${imagens.map((_, index) => `
                    <span class="dot ${index === 0 ? 'active' : ''}" onclick="mudarImagem(${index})"></span>
                `).join("")}
            </div>
        `;
    }

    const detalhesProduto = `
        <div class="detalhes-produto">
            <div class="imgContainer">${carrosselHtml}</div>
            <div class="descricao-produto-container">
                <h2>${produto.name}</h2>
                <p>${produto.description}</p>
            </div>
        </div>
    `;

    document.querySelector('.detalhes-produto-container').innerHTML = detalhesProduto;
}


let imagemAtual = 0;
let startX = 0;
let isDragging = false;

function mudarImagem(index) {
    const imagens = document.querySelectorAll(".carousel-img");
    const dots = document.querySelectorAll(".dot");

    imagens[imagemAtual].classList.remove("active");
    dots[imagemAtual].classList.remove("active");

    imagemAtual = index;

    imagens[imagemAtual].classList.add("active");
    dots[imagemAtual].classList.add("active");
}

// Função para abrir o modal
function abrirModal(index) {
    imagemAtual = index;
    const imagens = document.querySelectorAll(".carousel-img");

    // Criar o conteúdo do modal
    const modalHtml = `
        <div class="modal-content">
            <span class="close" onclick="fecharModal()">&times;</span>
            <img src="${imagens[imagemAtual].src}" class="modal-img">
            <div class="modal-navigation">
                <span onclick="mudarImagemModal(-1)">&#10094;</span>
                <span onclick="mudarImagemModal(1)">&#10095;</span>
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

// Função para navegar pelas imagens no modal
function mudarImagemModal(direcao) {
    const imagens = document.querySelectorAll(".carousel-img");
    const totalImagens = imagens.length;

    imagemAtual = (imagemAtual + direcao + totalImagens) % totalImagens; // Circular entre as imagens

    const modalImg = document.querySelector(".modal-img");
    modalImg.src = imagens[imagemAtual].src; // Atualizar imagem do modal

    // Atualizar os indicadores de navegação (opcional)
    const dots = document.querySelectorAll(".dot");
    dots[imagemAtual].classList.add("active");
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







