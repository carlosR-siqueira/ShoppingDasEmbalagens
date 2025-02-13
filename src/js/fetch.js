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
    const detalhesProduto = `
        <div class="detalhes-produto">
            <div class="imgContainer">
                <img src="${produto.imageUrl}" alt="${produto.name}">
            </div>
            <div class="descricao-produto-container">
                <h2>${produto.name}</h2>
                <p>${produto.description}</p>
            </div>
        </div>
    `;
    document.querySelector('.detalhes-produto-container').innerHTML = detalhesProduto;
}

function voltarParaCategoria(categoria, subcategoria) {
    const voltarBtn = `<a href="produtos.html?categoria=${categoria}&subcategoria=${subcategoria}" class="voltarBtn btn btn-primary">Voltar</a>`;
    document.querySelector(".voltarBtnContainer").innerHTML = voltarBtn;
}







