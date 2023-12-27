
const btnMobile = document.querySelector('.btn-mobile-menu')
const headerList = document.querySelector(".header-list")
const dropBtn = document.querySelector('.drop-btn')
const dropdownContent = document.querySelector('.dropdown-content')
const dropdown = document.querySelector('.dropdown')
const headerListItens = document.querySelectorAll(".header-list-itens")
const voltarBtn = document.querySelectorAll('.item-title-container')
const prodEmDestaque = document.querySelector('.prod-em-destaque')
const backOverlay = document.querySelector('.back-overlay')



function toggleSubMenu(subMenu) {
    subMenu.classList.toggle('subMenu');
}

function closeOtherSubMenus(currentSubMenu) {
    const allSubMenus = [descartaveisSubMenuItems, domesticosSubMenuItems, festaSubMenuItems, limpezaSubMenuItems];
    allSubMenus.forEach(subMenu => {
        if (subMenu !== currentSubMenu && subMenu.classList.contains('subMenu')) {
            subMenu.classList.remove('subMenu');
        }
    });
}

descartaveisSubMenu.addEventListener('click', function(event) {
    event.preventDefault();
    toggleSubMenu(descartaveisSubMenuItems);
    closeOtherSubMenus(descartaveisSubMenuItems);
});

domesticosSubMenu.addEventListener('click', function(event) {
    event.preventDefault();
    toggleSubMenu(domesticosSubMenuItems);
    closeOtherSubMenus(domesticosSubMenuItems);
});

festaSubMenu.addEventListener('click', function(event) {
    event.preventDefault();
    toggleSubMenu(festaSubMenuItems);
    closeOtherSubMenus(festaSubMenuItems);
});

limpezaSubMenu.addEventListener('click', function(event) {
    event.preventDefault();
    toggleSubMenu(limpezaSubMenuItems);
    closeOtherSubMenus(limpezaSubMenuItems);
});

const allSubMenus = [descartaveisSubMenuItems, domesticosSubMenuItems, festaSubMenuItems, limpezaSubMenuItems];
allSubMenus.forEach(subMenu => {
    subMenu.addEventListener('mouseleave', function() {
        if (subMenu.classList.contains('subMenu')) {
            subMenu.classList.remove('subMenu');
        }
    });
});

// Adicionando um listener para fechar os submenus ao clicar fora deles
document.addEventListener('click', function(event) {
    allSubMenus.forEach(subMenu => {
        if (!event.target.closest('.dropdown') && subMenu.classList.contains('subMenu')) {
            subMenu.classList.remove('subMenu');
        }
    });
});



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

