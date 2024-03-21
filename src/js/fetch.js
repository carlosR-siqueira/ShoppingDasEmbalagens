
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');

    console.log(categoria);
    fetchProdutos(categoria);
});
    function fetchProdutos(categoria) {

    

    const descartaveisDB = `https://teste-908b8-default-rtdb.firebaseio.com/produto/${categoria}.json`;
    
    fetch(descartaveisDB, {
        method: 'GET',
        mode: 'cors', // Define o modo CORS
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

            

            
            document.querySelector('.prodTitle').innerHTML = `<h2 class="titulo-destaque-produtos ">${categoria}</h2>`
            
            document.querySelector('.containerItens').innerHTML = '';
            
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const produto = data[key];
                    prodCard = `<article class="card" category="${produto.categoria} data-id="${key}" subCategory="${produto.subCategoria}"><img class="card-img-top" src="${produto.imagemUrl}"><div class="card-body"><div class="card-text-container"><h5 class="card-title">${produto.nome}</h5><p class="card-text">${produto.descricao}</p></div><a href="item.html" class="btn btn-primary">Ver Produto</a></div></article>`



                    document.querySelector('.containerItens').insertAdjacentHTML('beforeend', prodCard);
                }
            }

        })
        .catch((err) => {
            console.error(err);
        });
    }