/**
 * Menu Loader - Carrega dinamicamente as categorias e subcategorias a partir do JSON
 * Mantém a funcionalidade existente enquanto simplifica a manutenção
 */

// Variável para controlar se o menu está sendo carregado
let isMenuLoading = false;

document.addEventListener('DOMContentLoaded', function() {
    // Carrega as categorias do arquivo JSON
    fetch('/categorias.json')
        .then(response => response.json())
        .then(categories => {
            // Encontra o container do menu de navegação
            const navHeader = document.querySelector('.nav-header');
            const dropdownMenu = navHeader.querySelector('.dropdown .dropdown-content');
            
            // Limpa o conteúdo existente, mantendo a estrutura básica
            while (dropdownMenu.firstChild) {
                dropdownMenu.removeChild(dropdownMenu.firstChild);
            }
            
            // Cria o título do menu
            const titleContainer = document.createElement('div');
            titleContainer.className = 'item-title-container';
            titleContainer.style.display = 'none';
            
            const backButtonContainer = document.createElement('div');
            backButtonContainer.className = 'voltar-btn-container';
            
            const backButton = document.createElement('button');
            backButton.className = 'voltar-btn';
            backButton.innerHTML = '<i class="fa fa-angle-double-left"></i>';
            
            backButtonContainer.appendChild(backButton);
            
            const titleDiv = document.createElement('div');
            titleDiv.className = 'title-container';
            const title = document.createElement('p');
            title.textContent = 'Produtos';
            titleDiv.appendChild(title);
            
            titleContainer.appendChild(backButtonContainer);
            titleContainer.appendChild(titleDiv);
            
            const hr = document.createElement('div');
            hr.className = 'hr-header';
            hr.innerHTML = '<hr>';
            
            // Adiciona o link para Produtos em Destaque
            const featuredLink = document.createElement('a');
            featuredLink.className = 'header-list-itens';
            featuredLink.href = window.location.pathname.endsWith('index.html') ? '#produtos' : 'index.html#produtos';
            featuredLink.textContent = 'Produtos em Destaque';
            
            // Adiciona os elementos ao dropdown
            dropdownMenu.appendChild(titleContainer);
            dropdownMenu.appendChild(hr.cloneNode(true));
            dropdownMenu.appendChild(featuredLink);
            
            // Para cada categoria, cria o menu e submenu
            categories.forEach(category => {
                // Cria o link da categoria
                const categoryLink = document.createElement('a');
                const categorySlug = category.category.toLowerCase().replace(/\s+/g, '-');
                categoryLink.className = `${categorySlug}-subMenu dropdown-itens`;
                categoryLink.innerHTML = `${category.category}<span class="fa fa-angle-right arrow-right-menu"></span>`;
                
                // Cria o container do submenu
                const subMenu = document.createElement('div');
                subMenu.className = `${categorySlug}-subMenu-itens subMenu-itens`;
                
                // Cria o cabeçalho do submenu
                const subMenuTitle = document.createElement('div');
                subMenuTitle.className = 'item-title-container';
                subMenuTitle.style.display = 'none';
                
                const subMenuBackButton = document.createElement('div');
                subMenuBackButton.className = 'voltar-btn-container';
                
                const subMenuBackBtn = document.createElement('button');
                subMenuBackBtn.className = 'voltar-btn';
                subMenuBackBtn.innerHTML = '<i class="fa fa-angle-double-left"></i>';
                
                subMenuBackButton.appendChild(subMenuBackBtn);
                
                const subMenuTitleDiv = document.createElement('div');
                subMenuTitleDiv.className = 'title-container';
                const subMenuTitleText = document.createElement('p');
                subMenuTitleText.textContent = category.category;
                subMenuTitleDiv.appendChild(subMenuTitleText);
                
                subMenuTitle.appendChild(subMenuBackButton);
                subMenuTitle.appendChild(subMenuTitleDiv);
                
                const subMenuHr = document.createElement('div');
                subMenuHr.className = 'hr-header';
                subMenuHr.innerHTML = '<hr>';
                
                subMenu.appendChild(subMenuTitle);
                subMenu.appendChild(subMenuHr);
                
                // Adiciona as subcategorias
                category.subcategory.forEach(subcategory => {
                    const subcategoryLink = document.createElement('a');
                    subcategoryLink.href = `produtos.html?categoria=${encodeURIComponent(category.category)}&subcategoria=${encodeURIComponent(subcategory)}`;
                    subcategoryLink.textContent = subcategory;
                    subMenu.appendChild(subcategoryLink);
                });
                
                // Adiciona os elementos ao DOM
                dropdownMenu.appendChild(categoryLink);
                dropdownMenu.appendChild(subMenu);
            });
            
            // Inicializa os event listeners para os menus
            // Usamos setTimeout para garantir que o DOM esteja completamente atualizado
            setTimeout(() => {
                initializeMenuEvents();
                isMenuLoading = false;
                
                // Adiciona a classe dropdown-content-mobile para estilização do menu mobile
                const dropdownContent = document.querySelector('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.classList.add('dropdown-content-mobile');
                }
            }, 100);
        })
        .catch(error => {
            console.error('Erro ao carregar o menu:', error);
        });
});

/**
 * Inicializa os event listeners para os menus dinâmicos
 */
function initializeMenuEvents() {
    // Evento para itens de menu com submenu
    document.querySelectorAll('.dropdown-itens').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Verifica se é mobile
            const isMobile = window.innerWidth <= 921;
            
            // Fecha outros submenus abertos
            document.querySelectorAll('.subMenu-itens').forEach(menu => {
                if (menu !== this.nextElementSibling) {
                    menu.classList.remove('show');
                }
            });
            
            // Abre/fecha o submenu atual
            const subMenu = this.nextElementSibling;
            if (subMenu && subMenu.classList.contains('subMenu-itens')) {
                // Em mobile, adiciona uma classe específica para estilização
                if (isMobile) {
                    subMenu.classList.add('mobile-submenu');
                }
                subMenu.classList.toggle('show');
                
                // Rola até o submenu em dispositivos móveis
                if (isMobile && subMenu.classList.contains('show')) {
                    subMenu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });
    
    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.subMenu-itens a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Permite que o link seja seguido normalmente
            // Fecha o menu mobile após clicar em um link (apenas em telas pequenas)
            if (window.innerWidth <= 921) {
                const headerList = document.querySelector('.header-list');
                const btnMobile = document.querySelector('.btn-mobile-menu');
                const backOverlay = document.querySelector('.back-overlay');
                
                if (headerList) headerList.classList.remove('dropdown-content-mobile');
                if (btnMobile) btnMobile.classList.remove('active');
                if (backOverlay) backOverlay.classList.remove('overlay');
            }
        });
    });
    
    // Adiciona um evento de redimensionamento para ajustar o menu quando a tela for redimensionada
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Remove a classe de submenu mobile se a tela for maior que 921px
            if (window.innerWidth > 921) {
                document.querySelectorAll('.subMenu-itens').forEach(menu => {
                    menu.classList.remove('mobile-submenu');
                });
            }
        }, 250);
    });
}

/**
 * Fecha os menus ao clicar fora
 */
function setupMenuCloseOnClickOutside() {
    document.addEventListener('click', function(event) {
        // Não fecha o menu se estiver clicando no botão do menu mobile ou na barra de pesquisa
        if (event.target.closest('.btn-mobile-menu') || event.target.closest('.searchBarContainer')) {
            return;
        }
        
        // Se estiver em uma visualização mobile
        if (window.innerWidth <= 921) {
            // Se clicar em um item de menu, não faz nada (deixa o menu aberto)
            if (event.target.closest('.dropdown-itens') || event.target.closest('.subMenu-itens a')) {
                return;
            }
            
            // Fecha apenas os submenus se clicar fora deles
            if (!event.target.closest('.subMenu-itens')) {
                document.querySelectorAll('.subMenu-itens').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        } else {
            // Em desktop, fecha o menu se clicar fora
            if (!event.target.closest('.dropdown') && !event.target.closest('.subMenu-itens')) {
                document.querySelectorAll('.subMenu-itens').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        }
    });
}

// Inicializa o fechamento do menu ao clicar fora
setupMenuCloseOnClickOutside();
