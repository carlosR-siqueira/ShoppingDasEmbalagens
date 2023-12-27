// menu dropdown ↓↓

const btnMobile = document.querySelector('.btn-mobile-menu');
const headerMobileMenu = document.querySelector('.header-mobile-menu')
const headerList = document.querySelector(".header-list");
const dropBtn = document.querySelector('.drop-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector('.dropdown');
const headerListItens = document.querySelectorAll(".header-list-itens");
const voltarBtn = document.querySelectorAll('.item-title-container');
const prodEmDestaque = document.querySelector('.prod-em-destaque');
const backOverlay = document.querySelector('.back-overlay');


document.addEventListener('DOMContentLoaded', function () {
    const descartaveisSubMenu = document.querySelector('.descartaveis-subMenu');
    const domesticosSubMenu = document.querySelector('.domesticos-subMenu');
    const festaSubMenu = document.querySelector('.festa-subMenu');
    const limpezaSubMenu = document.querySelector('.limpeza-subMenu');

    const descartaveisSubMenuItems = document.querySelector('.descartaveis-subMenu-itens');
    const domesticosSubMenuItems = document.querySelector('.domesticos-subMenu-itens');
    const festaSubMenuItems = document.querySelector('.festa-subMenu-itens');
    const limpezaSubMenuItems = document.querySelector('.limpeza-subMenu-itens');

    function toggleSubMenu(subMenu) {
        subMenu.classList.toggle('show');
    }

    function closeOtherSubMenus(currentSubMenu) {
        const allSubMenus = [descartaveisSubMenuItems, domesticosSubMenuItems, festaSubMenuItems, limpezaSubMenuItems];
        allSubMenus.forEach(subMenu => {
            if (subMenu !== currentSubMenu && subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
            }
        });
    }

    descartaveisSubMenu.addEventListener('click', function (event) {
        event.preventDefault();
        toggleSubMenu(descartaveisSubMenuItems);
        closeOtherSubMenus(descartaveisSubMenuItems);
    });

    domesticosSubMenu.addEventListener('click', function (event) {
        event.preventDefault();
        toggleSubMenu(domesticosSubMenuItems);
        closeOtherSubMenus(domesticosSubMenuItems);
    });

    festaSubMenu.addEventListener('click', function (event) {
        event.preventDefault();
        toggleSubMenu(festaSubMenuItems);
        closeOtherSubMenus(festaSubMenuItems);
    });

    limpezaSubMenu.addEventListener('click', function (event) {
        event.preventDefault();
        toggleSubMenu(limpezaSubMenuItems);
        closeOtherSubMenus(limpezaSubMenuItems);
    });

    const allSubMenus = [descartaveisSubMenuItems, domesticosSubMenuItems, festaSubMenuItems, limpezaSubMenuItems];
    allSubMenus.forEach(subMenu => {
        subMenu.addEventListener('mouseleave', function () {
            if (subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
            }
        });
    });

    // Adicionando um listener para fechar os submenus ao clicar fora deles
    document.addEventListener('click', function (event) {
        allSubMenus.forEach(subMenu => {
            if (!event.target.closest('.dropdown') && subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
            }
        });
    });
});



btnMobile.addEventListener('click', openMobileMenu)


function openMobileMenu() {

    btnMobile.classList.toggle('active')
    headerList.classList.toggle('dropdown-content-mobile')
    backOverlay.classList.toggle('overlay')
}


dropBtn.addEventListener('click', function() {


    dropdownContent.classList.add('showMenu')



})




const descItens = document.querySelector('.descartaveis-subMenu-itens')



const domestItens = document.querySelector('.domesticos-subMenu-itens')


const festItens = document.querySelector('.festa-subMenu-itens')



const limpItens = document.querySelector('.cozinha-subMenu-itens')



btnMobile.addEventListener('click', () => {

    if (btnMobile.classList.contains('active')) {

        dropdownContent.style.display = ''

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
        
        dropdownContent.style.display = ''

        headerList.classList.remove('dropdown-content-mobile')
        backOverlay.classList.remove('overlay')

    })
);


document.addEventListener("keydown", (event) => {
    if (event.key === 'Escape') {

        headerList.classList.remove('dropdown-content-mobile');
        btnMobile.classList.remove('active')
        backOverlay.classList.remove('overlay')



    }


});

backOverlay.addEventListener('click', function (e) {
    if (e.target == this) {

        headerList.classList.remove('dropdown-content-mobile');
        btnMobile.classList.remove('active')
        backOverlay.classList.remove('overlay')
    }
});


if(!headerMobileMenu.style.display === 'block'){

    btnMobile.classList.add('menuNone')
    

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