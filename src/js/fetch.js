document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');
    const produtoId = urlParams.get('produtoId');

    if (produtoId) {
        fetchDetalhesProduto(categoria, produtoId);
    } else {
        fetchProdutos(categoria);
    }
});

function fetchProdutos(categoria) {
    const descartaveisDB = `https://teste-908b8-default-rtdb.firebaseio.com/produto/${categoria}.json`;

    fetch(descartaveisDB, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados adicionais');
            }
            return response.json();
        })
        .then((data) => {
            document.querySelector('.prodTitle').innerHTML = `<h2 class="titulo-destaque-produtos ">${categoria}</h2>`;
            document.querySelector('.containerItens').innerHTML = '';

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const produto = data[key];
                    const prodCard = `<article class="card" data-id="${key}">
                                    <img class="card-img-top" src="${produto.imagemUrl}">
                                    <div class="card-body">
                                        <div class="card-text-container">
                                            <h5 class="card-title">${produto.nome}</h5>
                                            
                                        </div>
                                        <a href="item.html?categoria=${categoria}&produtoId=${key}" class="btn btn-primary">Ver Produto</a>
                                    </div>
                                 </article>`;
                    document.querySelector('.containerItens').insertAdjacentHTML('beforeend', prodCard);
                }
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

function fetchDetalhesProduto(categoria, produtoId) {
    const descartaveisDB = `https://teste-908b8-default-rtdb.firebaseio.com/produto/${categoria}/${produtoId}.json`;

    fetch(descartaveisDB, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados adicionais');
            }
            return response.json();
        })
        .then((produto) => {
            exibirDetalhesProduto(produto);
            voltarParaCategoria(categoria)
        })
        .catch((err) => {
            console.error(err);
        });
}

function exibirDetalhesProduto(produto) {
    const detalhesProduto = `
        <div class="detalhes-produto">
            <div class="imgContainer">
                <img src="${produto.imagemUrl}" alt="${produto.nome}">
            </div>
            <div class="descricao-produto-container">
                <h2>${produto.nome}</h2>
                <p>${produto.descricao}</p>
            </div>
        </div>
    `;
    document.querySelector('.detalhes-produto-container').innerHTML = detalhesProduto;
}

function voltarParaCategoria(categoria) {
    const voltarBtn =
        
    `<a href="produtos.html?categoria=${categoria}" class="voltarBtn btn btn-primary">Voltar</a>`

    document.querySelector(".voltarBtnContainer").innerHTML = voltarBtn;
}

