const descartaveisDB = 'https://teste-908b8-default-rtdb.firebaseio.com/produto/Descartáveis.json';
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




        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const produto = data[key];

                prodCard = `<div class="card" category="${produto.categoria}" subCategory="${produto.subCategoria}"><div name="button" class="badge-container"></div><img src="${produto.imagemUrl}"><h2>${produto.nome}</h2><p>${produto.descricao}</p></div>`


                document.querySelector('.containerDesc').insertAdjacentHTML('beforeend', prodCard);
            }
        }
    })
    .catch((err) => {
        console.error(err);
    });