
const btnMobile = document.querySelector('.btn-mobile-menu')
const headerList = document.querySelector(".header-list")
const dropBtn = document.querySelector('.drop-btn')
const dropdownContent = document.querySelector('.dropdown-content')
const dropdown = document.querySelector('.dropdown')
const headerListItens = document.querySelectorAll(".header-list-itens")
const voltarBtn = document.querySelectorAll('.item-title-container')
const prodEmDestaque = document.querySelector('.prod-em-destaque')
const backOverlay = document.querySelector('.back-overlay')






// Adiciona um evento de redimensionamento para verificar sempre que a tela é redimensionada
window.addEventListener("resize", verificarTamanhoDaTela);
// Verifica o tamanho da tela quando a página é carregada
// verificarTamanhoDaTela()
verificarTamanhoDaTela()



function verificarTamanhoDaTela() {
    if (window.innerWidth <= 921) {mobileSize()}
    else if (window.innerWidth > 921) { desktopSize() }
}
function mobileSize() {




    btnMobile.addEventListener('click', openMobileMenu)



    function openMobileMenu() {

        btnMobile.classList.toggle('active')
        headerList.classList.toggle('open-mobile-menu')
        backOverlay.classList.toggle('overlay')
    }

    dropBtn.addEventListener('click', openDropMenu)



    function openDropMenu() {


        dropdownContent.style.display = 'flex'


    }



    const descItens = document.querySelector('.descartaveis-subMenu-itens')
    const descSubMenu = document.querySelector('.descartaveis-subMenu').addEventListener("click", () => {
        descItens.style.display = 'flex'

    })


    const domestItens = document.querySelector('.domesticos-subMenu-itens')
    const domestSubMenu = document.querySelector('.domesticos-subMenu').addEventListener('click', () => {
        domestItens.style.display = 'flex'

    })

    const festItens = document.querySelector('.festa-subMenu-itens')
    const festSubMenu = document.querySelector('.festa-subMenu').addEventListener('click', () => {
        festItens.style.display = 'flex'

    })


    const limpItens = document.querySelector('.cozinha-subMenu-itens')
    const limpzaSubMenu = document.querySelector('.cozinha-subMenu').addEventListener('click', () => {
        limpItens.style.display = 'flex'

    })

    btnMobile.addEventListener('click', () => {

        if (btnMobile.classList.contains('active')) {

            dropdownContent.style.display = ''
            descItens.style.display = ''
            domestItens.style.display = ''
            festItens.style.display = ''
            limpItens.style.display = ''


        }
    })



    voltarBtn[0].addEventListener('click', () => {

        dropdownContent.style.display = ''
    })


    voltarBtn[1].addEventListener('click', () => {

        descItens.style.display = ''
    })

    voltarBtn[2].addEventListener('click', () => {

        domestItens.style.display = ''
    })


    voltarBtn[3].addEventListener('click', () => {

        festItens.style.display = ''
    })


    voltarBtn[4].addEventListener('click', () => {

        limpItens.style.display = ''
    })


    headerListItens.forEach((itens) =>
        itens.addEventListener('click', (event) => {

            btnMobile.classList.remove('active')

            headerList.classList.remove('open-mobile-menu')
            backOverlay.classList.remove('overlay')

        })
    );


    document.addEventListener("keydown", (event) => {
        if (event.key === 'Escape') {

            headerList.classList.remove('open-mobile-menu');
            btnMobile.classList.remove('active')
            backOverlay.classList.remove('overlay')



        }


    });

    backOverlay.addEventListener('click', function (e) {
        if (e.target == this) {

            headerList.classList.remove('open-mobile-menu');
            btnMobile.classList.remove('active')
            backOverlay.classList.remove('overlay')
        }
    });

}


function desktopSize() {


    dropBtn.addEventListener('click', closeUp)

    function closeUp() {

        dropdownContent.style.display = ''
    }

    dropdownContent.style.display = ''

    //script do header doropdown!


    //itens descartáveis

    const descItens = document.querySelector('.descartaveis-subMenu-itens')
    const descSubMenu = document.querySelector('.descartaveis-subMenu').addEventListener("click", () => {
        descItens.style.display = ''

    })



    function addSubMenuEventListeners(subMenu, subMenuItens) {
        function onMouseOver() {
            subMenuItens.classList.add('subMenu');
        }

        function onMouseOut() {
            subMenuItens.classList.remove('subMenu');
        }

        subMenu.addEventListener('mouseover', onMouseOver);
        subMenuItens.addEventListener('mouseover', onMouseOver);
        subMenu.addEventListener('mouseout', onMouseOut);
        subMenuItens.addEventListener('mouseout', onMouseOut);
    }

    let descartaveisSubMenu = document.querySelector('.descartaveis-subMenu');
    let descartaveisSubMenuItens = document.querySelector('.descartaveis-subMenu-itens');
    addSubMenuEventListeners(descartaveisSubMenu, descartaveisSubMenuItens);

    // Utensílios Domésticos

    const domestItens = document.querySelector('.domesticos-subMenu-itens')
    const domestSubMenu = document.querySelector('.domesticos-subMenu').addEventListener('click', () => {
        domestItens.style.display = ''

    })

    let subMenuDomesticos = document.querySelector('.domesticos-subMenu');
    let subMenuDomesticosItens = document.querySelector('.domesticos-subMenu-itens');
    addSubMenuEventListeners(subMenuDomesticos, subMenuDomesticosItens);

    // Cozinha
    let subMenuCozinha = document.querySelector('.cozinha-subMenu');
    let subMenuCozinhaItens = document.querySelector('.cozinha-subMenu-itens');
    addSubMenuEventListeners(subMenuCozinha, subMenuCozinhaItens);

    // Artigos para Festa

    const festItens = document.querySelector('.festa-subMenu-itens')
    const festSubMenu = document.querySelector('.festa-subMenu').addEventListener('click', () => {
        festItens.style.display = ''

    })

    let subMenuFesta = document.querySelector('.festa-subMenu');
    let subMenuFestaItens = document.querySelector('.festa-subMenu-itens');
    addSubMenuEventListeners(subMenuFesta, subMenuFestaItens);

    // Utensílios para Limpeza

    const limpItens = document.querySelector('.cozinha-subMenu-itens')
    const limpzaSubMenu = document.querySelector('.cozinha-subMenu').addEventListener('click', () => {
        limpItens.style.display = ''

    })


    let subMenuLimpeza = document.querySelector('.limpeza-subMenu');
    let subMenuLimpezaItens = document.querySelector('.limpeza-subMenu-itens');
    addSubMenuEventListeners(subMenuLimpeza, subMenuLimpezaItens);

    // Utensílios para Higiene
    let subMenuHigiene = document.querySelector('.higiene-subMenu');
    let subMenuHigieneItens = document.querySelector('.higiene-subMenu-itens');
    addSubMenuEventListeners(subMenuHigiene, subMenuHigieneItens);

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



window.addEventListener("scroll", function () {
    var whatsappIcon = document.querySelector(".whatsapp-icon");
    var distanceFromTop = window.scrollY;

    if (distanceFromTop > 200) {
        whatsappIcon.style.transform = "scale(1)";
    } else {
        whatsappIcon.style.transform = "scale(0)";
    }
});