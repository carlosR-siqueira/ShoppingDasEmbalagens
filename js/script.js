window.addEventListener('resize', verificarTamanhoDaTela);

function verificarTamanhoDaTela() {
    if (window.innerWidth <= 921) {
        const script = document.querySelector('.script')
        script.src = "../js/mobile.js";
       
    } else {
        const script = document.querySelector('.script')
        script.src = "../js/desktop.js";
        
    }
}
// Verificar o tamanho da tela quando a página é carregada
verificarTamanhoDaTela();

// Adicionar um ouvinte de evento para redimensionamento da tela



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



window.addEventListener("scroll", function () {
    var whatsappIcon = document.querySelector(".whatsapp-icon");
    var distanceFromTop = window.scrollY;

    if (distanceFromTop > 200) {
        whatsappIcon.style.transform = "scale(1)";
    } else {
        whatsappIcon.style.transform = "scale(0)";
    }
});