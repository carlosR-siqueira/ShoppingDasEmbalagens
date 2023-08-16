
const btnMobile = document.querySelector('.btn-mobile-menu')
const headerList = document.querySelector(".header-list")
const dropBtn = document.querySelector('.drop-btn')
const dropdownContent = document.querySelector('.dropdown-content')
const headerListItens = document.querySelector(".header-list-itens")
const voltarBtn = document.querySelector('.item-title-container')



function verificarTamanhoDaTela() {
    if (window.innerWidth <= 921) {
        btnMobile.addEventListener('click', openMobileMenu)



        function openMobileMenu() {

            btnMobile.classList.toggle('active')
            headerList.classList.toggle('open-mobile-menu')

        }

        dropBtn.addEventListener('click', openDropMenu)



        function openDropMenu() {


            dropdownContent.style.display = 'flex'

        }

        voltarBtn.addEventListener('click', itenBtnVoltar)

        function itenBtnVoltar() {


            dropdownContent.style.display = 'none'

        }
        
        function fecharMenu(){
            dropdownContent.style.display = 'none'

        }

        btnMobile.addEventListener('click', verificarClasse);

        function verificarClasse() {
            if (btnMobile.classList.contains('active')) {
                fecharMenu();
                
            }
        }

        

    }else{
        dropdownContent.style.display = ''
        
    }
}

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



