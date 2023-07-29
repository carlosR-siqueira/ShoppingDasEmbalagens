let openBtn = document.querySelector("#menu-btn")
let closeBtn = document.querySelector("#close-btn")
let headerList = document.querySelector(".header-list")

let formSubmitBtn = document.querySelector("#enviar-btn")

openBtn.addEventListener("click", openMenu)
closeBtn.addEventListener("click", closeMenu)


function openMenu() {
    headerList.classList.add('open-mobile-menu')
    openBtn.style.display = 'none'
    closeBtn.style.display = "block"
}

function closeMenu() {
    headerList.classList.remove('open-mobile-menu')

    closeBtn.style.display = "none"
    openBtn.style.display = 'block'
}




/*const openBtn = document.querySelector('.header-mobile-menu')
const navHeader = document.querySelector('.header-list')

openBtn.addEventListener('click', openMenu)

function openMenu(){
    navHeader.style.display = 'flex'
}*/