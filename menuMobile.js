
const btnMobile = document.querySelector('.btn-mobile-menu')
const headerList = document.querySelector(".header-list")
const dropBtn = document.querySelector('.drop-btn')
const dropdownContent = document.querySelector('.dropdown-content')
const dropdown = document.querySelector('.dropdown')
const headerListItens = document.querySelectorAll(".header-list-itens")
const voltarBtn = document.querySelector('.item-title-container')
const prodEmDestaque = document.querySelector('.prod-em-destaque')



// Verifica o tamanho da tela quando a página é carregada
verificarTamanhoDaTela();

// Adiciona um evento de redimensionamento para verificar sempre que a tela é redimensionada
window.addEventListener("resize", verificarTamanhoDaTela);

function verificarTamanhoDaTela() {
    if (window.innerWidth < 921) {
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
            
            dropdownContent.style.display = ''

        }

      

        btnMobile.addEventListener('click', verificarClasse);

        function verificarClasse() {
            if (btnMobile.classList.contains('active')) {
                itenBtnVoltar();

            }
        }


        headerListItens.forEach((itens) =>
            itens.addEventListener('click', (event) => {
                
                btnMobile.classList.remove('active')

                headerList.classList.remove('open-mobile-menu')
            })
        );


        document.addEventListener("keydown", (event) => {
            if (event.key === 'Escape') {
                headerList.classList.remove('open-mobile-menu');
                btnMobile.classList.remove('active')

            }


        });



        /* headerList.addEventListener('blur', (event) => {
             if (btnMobile.classList.contains('active')) {
 
                 headerList.classList.remove('open-mobile-menu');
                 btnMobile.classList.remove('active')
             }
 
         });*/


        function clickOutClose() {
            headerList.classList.remove('open-mobile-menu');
            btnMobile.classList.remove('active')
        }

    } else {
        dropBtn.addEventListener('click', closeUp)

        function closeUp() {

            dropdownContent.style.display = ''
        }

        dropdownContent.style.display = ''


    }

}


