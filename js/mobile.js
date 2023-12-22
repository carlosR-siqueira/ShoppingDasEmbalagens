
    let descSubMenuAdded = false;
    let domestSubMenuAdded = false;
    let festSubMenuAdded = false;
    let limpzaSubMenuAdded = false;
    
    function removeClickListeners() {
        const descSubMenu = document.querySelector('.descartaveis-subMenu');
        const descItens = document.querySelector('.descartaveis-subMenu-itens');
        if (descSubMenu && descItens && descSubMenuAdded) {
            descSubMenu.removeEventListener('click', displayDescItens);
            descSubMenuAdded = false;
        }
    
        const domestSubMenu = document.querySelector('.domesticos-subMenu');
        const domestItens = document.querySelector('.domesticos-subMenu-itens');
        if (domestSubMenu && domestItens && domestSubMenuAdded) {
            domestSubMenu.removeEventListener('click', displayDomestItens);
            domestSubMenuAdded = false;
        }
    
        const festSubMenu = document.querySelector('.festa-subMenu');
        const festItens = document.querySelector('.festa-subMenu-itens');
        if (festSubMenu && festItens && festSubMenuAdded) {
            festSubMenu.removeEventListener('click', displayFestItens);
            festSubMenuAdded = false;
        }
    
        const limpzaSubMenu = document.querySelector('.cozinha-subMenu');
        const limpItens = document.querySelector('.cozinha-subMenu-itens');
        if (limpzaSubMenu && limpItens && limpzaSubMenuAdded) {
            limpzaSubMenu.removeEventListener('click', displayLimpItens);
            limpzaSubMenuAdded = false;
        }
    }
    const btnMobile = document.querySelector('.btn-mobile-menu')
    const headerList = document.querySelector(".header-list")
    const dropBtn = document.querySelector('.drop-btn')
    const dropdownContent = document.querySelector('.dropdown-content')
    
    const headerListItens = document.querySelectorAll(".header-list-itens")
    const voltarBtn = document.querySelectorAll('.item-title-container')

    const backOverlay = document.querySelector('.back-overlay')

    removeClickListeners()




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



