

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

