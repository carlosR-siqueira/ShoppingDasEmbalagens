// menu dropdown ↓↓

const btnMobile = document.querySelector('.btn-mobile-menu');
const headerMobileMenu = document.querySelector('.header-mobile-menu')
const headerList = document.querySelector(".header-list");
const dropBtn = document.querySelector('.drop-mobile');
const dropdownContent = document.querySelector('.dropdown-content');
const contentMobile = document.querySelector('.content-mobile')
const dropdown = document.querySelector('.dropdown');
const headerListItens = document.querySelectorAll(".header-list-itens");
const voltarBtn = document.querySelectorAll('.item-title-container');
const prodEmDestaque = document.querySelector('.prod-em-destaque');
const backOverlay = document.querySelector('.back-overlay');
const subMenuItens = document.querySelectorAll('subMenu-itens')


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
        subMenu.addEventListener('click', function () {
            if (subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
            }
        });
    });

    // Adicionando um listener para fechar os submenus ao clicar fora deles
    document.addEventListener('mouseout', function (event) {
        allSubMenus.forEach(subMenu => {
            if (!event.target.closest('.dropdown') && subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
            }
        });
    });

    voltarBtn[0].addEventListener('click', function () {

        dropdownContent.classList.remove('showContent')

    })

    voltarBtn.forEach(voltar => {
        voltar.addEventListener('click', function () {


            const allSubMenus = [descartaveisSubMenuItems, domesticosSubMenuItems, festaSubMenuItems, limpezaSubMenuItems];
            allSubMenus.forEach(subMenu => {

                subMenu.classList.remove('show')

            });

        });
    });



    btnMobile.addEventListener('click', openMobileMenu)


    function openMobileMenu() {

        headerList.classList.toggle('dropdown-content-mobile')
        btnMobile.classList.toggle('active')
        backOverlay.classList.toggle('overlay')

    }


    dropBtn.addEventListener('click', function () {


        dropdownContent.classList.toggle('showContent')



    })



    btnMobile.addEventListener('click', () => {

        if (!btnMobile.classList.contains('active')) {


            const allSubMenus = [descartaveisSubMenuItems, domesticosSubMenuItems, festaSubMenuItems, limpezaSubMenuItems];
            allSubMenus.forEach(subMenu => {
                subMenu.classList.remove('show')

            });
          
            

            dropdownContent.classList.remove('showContent')
            subMenuItens.classList.remove('show')


        } 
    })









    headerListItens.forEach((itens) =>
        itens.addEventListener('click', (event) => {

            btnMobile.classList.remove('active')
            headerList.classList.remove('dropdown-content-mobile')
            backOverlay.classList.remove('overlay')

        })
    );


    document.addEventListener("keydown", (event) => {
        if (event.key === 'Escape') {

            headerList.classList.remove('dropdown-content-mobile');
            btnMobile.classList.remove('active')
            backOverlay.classList.remove('overlay')
            dropdownContent.classList.remove('showContent')

            const allSubMenus = [descartaveisSubMenuItems, domesticosSubMenuItems, festaSubMenuItems, limpezaSubMenuItems];
            allSubMenus.forEach(subMenu => {

                subMenu.classList.remove('show')



            });



        }


    });

    backOverlay.addEventListener('click', function (e) {
        if (e.target == this) {

            headerList.classList.remove('dropdown-content-mobile');
            btnMobile.classList.remove('active')
            backOverlay.classList.remove('overlay')
            dropdownContent.classList.remove('showContent')

        }
    });




});



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
