





const btnMobile = document.querySelector('.btn-mobile-menu')
let headerList = document.querySelector(".header-list")


btnMobile.addEventListener('click', openMobileMenu)
headerList.addEventListener('click', openMobileMenu)

function openMobileMenu(){
    headerList.classList.toggle('open-mobile-menu')
    
    btnMobile.classList.toggle('active')
}





