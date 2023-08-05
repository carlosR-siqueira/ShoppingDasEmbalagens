
const btnMobile = document.querySelector('.btn-mobile-menu')
const headerList = document.querySelector(".header-list")
const dropBtn = document.querySelector('.drop-btn')
const dropdownContent = document.querySelector('.dropdown-content')
const headerListItens = document.querySelector(".header-list-itens")


btnMobile.addEventListener('click', openMobileMenu)


function openMobileMenu() {

    btnMobile.classList.toggle('active')
    headerList.classList.toggle('open-mobile-menu')
}

/*dropBtn.addEventListener('click', openDropMenu)

function openDropMenu(){

    headerListItens.style.display = 'none'
    dropdownContent.classList.add('drop-menu') 

    
}

*/
document.addEventListener("keydown", (event) => {
    if (event.key === 'Escape') {
        headerList.classList.remove('open-mobile-menu');
        btnMobile.classList.remove('active')

    }
});



