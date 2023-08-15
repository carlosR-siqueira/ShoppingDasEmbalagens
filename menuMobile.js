
    const btnMobile = document.querySelector('.btn-mobile-menu')
    const headerList = document.querySelector(".header-list")
    const dropBtn = document.querySelector('.drop-btn')
    const dropdownContent = document.querySelector('.dropdown-content')
    const headerListItens = document.querySelector(".header-list-itens")
    

    function verificarTamanhoDaTela() {
  if (window.innerWidth <= 921) {
    btnMobile.addEventListener('click', openMobileMenu)
    
    
    
    function openMobileMenu() {
        
        btnMobile.classList.toggle('active')
        headerList.classList.add('open-mobile-menu')
        
    }
    
    dropBtn.addEventListener('click', openDropMenu)
    
    

    function openDropMenu() {

        headerList.removeChild(headerListItens)
        dropdownContent.style.display = 'flex'

    }
    console.log("Modo mobile ativado");
 
  }}

// Verifica o tamanho da tela quando a página é carregada
verificarTamanhoDaTela();

// Adiciona um evento de redimensionamento para verificar sempre que a tela é redimensionada
window.addEventListener("resize", verificarTamanhoDaTela);


 









document.addEventListener("keydown", (event) => {
    if (event.key === 'Escape') {
        headerList.classList.remove('open-mobile-menu');
        btnMobile.classList.remove('active')

    }
});



