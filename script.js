//script do header doropdown!


//itens descartáveis
let descartaveisSubMenu = document.querySelector('.descartaveis-subMenu')
let subMenuDescartaveisItens = document.querySelector('.descartaveis-subMenu-itens')

descartaveisSubMenu.addEventListener('mouseover', descartaveisMouseEnter)
subMenuDescartaveisItens.addEventListener('mouseover', descartaveisMouseEnter)
descartaveisSubMenu.addEventListener('mouseout', descartaveisMouseOut)
subMenuDescartaveisItens.addEventListener('mouseout', descartaveisMouseOut)

function descartaveisMouseEnter() {
    subMenuDescartaveisItens.classList.add('subMenu')
}

function descartaveisMouseOut() {
    subMenuDescartaveisItens.classList.remove('subMenu')
}

//itens utensílios domésticos
let subMenuDomesticos = document.querySelector('.domesticos-subMenu')
let subMenuDomesticosItens = document.querySelector('.domesticos-subMenu-itens')

subMenuDomesticos.addEventListener('mouseover', domesticosMouseEnter)
subMenuDomesticosItens.addEventListener('mouseover', domesticosMouseEnter)
subMenuDomesticos.addEventListener('mouseout', domesticosMouseOut)
subMenuDomesticosItens.addEventListener('mouseout', domesticosMouseOut)

function domesticosMouseEnter() {
    subMenuDomesticosItens.classList.add('subMenu')
}

function domesticosMouseOut() {
    subMenuDomesticosItens.classList.remove('subMenu')
}

// itens cozinha

let subMenuCozinha = document.querySelector('.cozinha-subMenu')
let subMenuCozinhaItens = document.querySelector('.cozinha-subMenu-itens')

subMenuCozinha.addEventListener('mouseover', cozinhaMouseEnter)
subMenuCozinhaItens.addEventListener('mouseover', cozinhaMouseEnter)
subMenuCozinha.addEventListener('mouseout', cozinhaMouseOut)
subMenuCozinhaItens.addEventListener('mouseout', cozinhaMouseOut)

function cozinhaMouseEnter() {
    subMenuCozinhaItens.classList.add('subMenu')
}

function cozinhaMouseOut() {
    subMenuCozinhaItens.classList.remove('subMenu')

}

// itens Artigos para festa

let subMenuFesta = document.querySelector('.festa-subMenu')
let subMenuFestaItens = document.querySelector('.festa-subMenu-itens')

subMenuFesta.addEventListener('mouseover', festaMouseEnter)
subMenuFestaItens.addEventListener('mouseover', festaMouseEnter)
subMenuFesta.addEventListener('mouseout', festaMouseOut)
subMenuFestaItens.addEventListener('mouseout', festaMouseOut)

function festaMouseEnter() {
    subMenuFestaItens.classList.add('subMenu')
}

function festaMouseOut() {
    subMenuFestaItens.classList.remove('subMenu')
}

//itens utensílios para Limpeza

let subMenuLimpeza = document.querySelector('.limpeza-subMenu')
let subMenuLimpezaItens = document.querySelector('.limpeza-subMenu-itens')

subMenuLimpeza.addEventListener('mouseover', limpezaMouseEnter)
subMenuLimpezaItens.addEventListener('mouseover', limpezaMouseEnter)
subMenuLimpeza.addEventListener('mouseout', limpezaMouseOut)
subMenuLimpezaItens.addEventListener('mouseout', limpezaMouseOut)

function limpezaMouseEnter() {
    subMenuLimpezaItens.classList.add('subMenu')
}

function limpezaMouseOut() {
    subMenuLimpezaItens.classList.remove('subMenu')
}

// itens utensílios para Higiene

let subMenuHigiene = document.querySelector('.higiene-subMenu')
let subMenuHigieneItens = document.querySelector('.higiene-subMenu-itens')

subMenuHigiene.addEventListener('mouseover', higieneMouseEnter)
subMenuHigieneItens.addEventListener('mouseover', higieneMouseEnter)
subMenuHigiene.addEventListener('mouseout', higieneMouseOut)
subMenuHigieneItens.addEventListener('mouseout', higieneMouseOut)

function higieneMouseEnter() {
    subMenuHigieneItens.classList.add('subMenu')
}

function higieneMouseOut() {
    subMenuHigieneItens.classList.remove('subMenu')
}