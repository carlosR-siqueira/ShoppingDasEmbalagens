
const btnMobile = document.querySelector('.btn-mobile-menu')
const headerList = document.querySelector(".header-list")
const dropBtn = document.querySelector('.drop-btn')
const dropdownContent = document.querySelector('.dropdown-content')
const dropdown = document.querySelector('.dropdown')
const headerListItens = document.querySelectorAll(".header-list-itens")
const voltarBtn = document.querySelectorAll('.item-title-container')
const prodEmDestaque = document.querySelector('.prod-em-destaque')






// Adiciona um evento de redimensionamento para verificar sempre que a tela é redimensionada
window.addEventListener("resize", verificarTamanhoDaTela);
// Verifica o tamanho da tela quando a página é carregada
verificarTamanhoDaTela();
function verificarTamanhoDaTela() {
    if (window.innerWidth <= 921 ) {

        

        btnMobile.addEventListener('click', openMobileMenu)



        function openMobileMenu() {

            btnMobile.classList.toggle('active')
            headerList.classList.toggle('open-mobile-menu')
        }

        dropBtn.addEventListener('click', openDropMenu)



        function openDropMenu() {


            dropdownContent.style.display = 'flex'


        }

        var voltarBtn = document.querySelectorAll('.item-title-container')[0]

        voltarBtn.addEventListener('click', () => {

            dropdownContent.style.display = ''
        })

        var voltarBtn = document.querySelectorAll('.item-title-container')[1]

        voltarBtn.addEventListener('click', () => {

            descartaveisItens.style.display = ''
        })
        var voltarBtn = document.querySelectorAll('.item-title-container')[2]

        voltarBtn.addEventListener('click', () => {

            domesticosItens.style.display = ''
        })

        var voltarBtn = document.querySelectorAll('.item-title-container')[3]

        voltarBtn.addEventListener('click', () => {

            festaItens.style.display = ''
        })

        var voltarBtn = document.querySelectorAll('.item-title-container')[4]

        voltarBtn.addEventListener('click', () => {

            limpezaItens.style.display = ''
        })
        


        btnMobile.addEventListener('click', () => {

            if (btnMobile.classList.contains('active')) {
                dropdownContent.style.display = ''
                descartaveisItens.style.display = ''
                domesticosItens.style.display = ''
                festaItens.style.display = ''
                limpezaItens.style.display = ''
                

            }
        })


        const descartaveisSubMenu = document.querySelector('.descartaveis-subMenu')
        const descartaveisItens = document.querySelector('.descartaveis-subMenu-itens')

        const dometicosSubMenu = document.querySelector('.domesticos-subMenu')
        const domesticosItens = document.querySelector('.domesticos-subMenu-itens')

        const festaSubMenu = document.querySelector('.festa-subMenu')
        const festaItens = document.querySelector('.festa-subMenu-itens')

        const limpezaSubMenu = document.querySelector('.cozinha-subMenu')
        const limpezaItens = document.querySelector('.cozinha-subMenu-itens')


        descartaveisSubMenu.addEventListener('click', () => {
            descartaveisItens.style.display = 'flex'

        })
        dometicosSubMenu.addEventListener('click', () => {
            domesticosItens.style.display = 'flex'

        })
        festaSubMenu.addEventListener('click', () => {
            festaItens.style.display = 'flex'

        })
        limpezaSubMenu.addEventListener('click', () => {
            limpezaItens.style.display = 'flex'

        })



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
        
    }else {

        
        dropBtn.addEventListener('click', closeUp)

        function closeUp() {

            dropdownContent.style.display = ''
        }

        dropdownContent.style.display = ''

        //script do header doropdown!


        //itens descartáveis
        let descartaveisSubMenu = document.querySelector('.descartaveis-subMenu')
        let subMenuDescartaveisItens = document.querySelector('.descartaveis-subMenu-itens')

        descartaveisSubMenu.addEventListener('mouseover', descartaveisMouseEnter)
        subMenuDescartaveisItens.addEventListener('mouseover', descartaveisMouseEnter)
        descartaveisSubMenu.addEventListener('mouseout', descartaveisMouseOut)
        subMenuDescartaveisItens.addEventListener('mouseout', descartaveisMouseOut)

        function descartaveisMouseEnter() {
            subMenuDescartaveisItens.classList.add('subMenu')
        }

        function descartaveisMouseOut() {
            subMenuDescartaveisItens.classList.remove('subMenu')
        }

        //itens utensílios domésticos
        let subMenuDomesticos = document.querySelector('.domesticos-subMenu')
        let subMenuDomesticosItens = document.querySelector('.domesticos-subMenu-itens')

        subMenuDomesticos.addEventListener('mouseover', domesticosMouseEnter)
        subMenuDomesticosItens.addEventListener('mouseover', domesticosMouseEnter)
        subMenuDomesticos.addEventListener('mouseout', domesticosMouseOut)
        subMenuDomesticosItens.addEventListener('mouseout', domesticosMouseOut)

        function domesticosMouseEnter() {
            subMenuDomesticosItens.classList.add('subMenu')
        }

        function domesticosMouseOut() {
            subMenuDomesticosItens.classList.remove('subMenu')
        }

        // itens cozinha

        let subMenuCozinha = document.querySelector('.cozinha-subMenu')
        let subMenuCozinhaItens = document.querySelector('.cozinha-subMenu-itens')

        subMenuCozinha.addEventListener('mouseover', cozinhaMouseEnter)
        subMenuCozinhaItens.addEventListener('mouseover', cozinhaMouseEnter)
        subMenuCozinha.addEventListener('mouseout', cozinhaMouseOut)
        subMenuCozinhaItens.addEventListener('mouseout', cozinhaMouseOut)

        function cozinhaMouseEnter() {
            subMenuCozinhaItens.classList.add('subMenu')
        }

        function cozinhaMouseOut() {
            subMenuCozinhaItens.classList.remove('subMenu')

        }

        // itens Artigos para festa

        let subMenuFesta = document.querySelector('.festa-subMenu')
        let subMenuFestaItens = document.querySelector('.festa-subMenu-itens')

        subMenuFesta.addEventListener('mouseover', festaMouseEnter)
        subMenuFestaItens.addEventListener('mouseover', festaMouseEnter)
        subMenuFesta.addEventListener('mouseout', festaMouseOut)
        subMenuFestaItens.addEventListener('mouseout', festaMouseOut)

        function festaMouseEnter() {
            subMenuFestaItens.classList.add('subMenu')
        }

        function festaMouseOut() {
            subMenuFestaItens.classList.remove('subMenu')
        }

        //itens utensílios para Limpeza

        let subMenuLimpeza = document.querySelector('.limpeza-subMenu')
        let subMenuLimpezaItens = document.querySelector('.limpeza-subMenu-itens')

        subMenuLimpeza.addEventListener('mouseover', limpezaMouseEnter)
        subMenuLimpezaItens.addEventListener('mouseover', limpezaMouseEnter)
        subMenuLimpeza.addEventListener('mouseout', limpezaMouseOut)
        subMenuLimpezaItens.addEventListener('mouseout', limpezaMouseOut)

        function limpezaMouseEnter() {
            subMenuLimpezaItens.classList.add('subMenu')
        }

        function limpezaMouseOut() {
            subMenuLimpezaItens.classList.remove('subMenu')
        }

        // itens utensílios para Higiene

        let subMenuHigiene = document.querySelector('.higiene-subMenu')
        let subMenuHigieneItens = document.querySelector('.higiene-subMenu-itens')

        subMenuHigiene.addEventListener('mouseover', higieneMouseEnter)
        subMenuHigieneItens.addEventListener('mouseover', higieneMouseEnter)
        subMenuHigiene.addEventListener('mouseout', higieneMouseOut)
        subMenuHigieneItens.addEventListener('mouseout', higieneMouseOut)

        function higieneMouseEnter() {
            subMenuHigieneItens.classList.add('subMenu')
        }

        function higieneMouseOut() {
            subMenuHigieneItens.classList.remove('subMenu')
        }



        window.addEventListener("scroll", function () {
            var whatsappIcon = document.querySelector(".whatsapp-icon");
            var distanceFromTop = window.scrollY;

            if (distanceFromTop > 200) {
                whatsappIcon.style.transform = "scale(1)";
            } else {
                whatsappIcon.style.transform = "scale(0)";
            }
        });

       








        

    }
    
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


