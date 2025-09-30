// Animações de Scroll - Versão com Header e Banner com Delay Maior
function initScrollAnimations() {
    console.log('Inicializando animações de scroll');
    
    // Função para adicionar animação a um elemento
    function addAnimation(element, animationClass) {
        if (element) {
            element.classList.add(animationClass);
            console.log('Animação adicionada:', element.className, '->', animationClass);
        } else {
            console.log('Elemento não encontrado para:', animationClass);
        }
    }
    
    // Função para verificar scroll e ativar animações
    function checkScroll() {
        const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
            
            if (isVisible && !element.classList.contains('visible')) {
                element.classList.add('visible');
                console.log('Elemento animado:', element.className);
            }
        });
    }
    
    // Adicionar animações aos elementos
    addAnimation(document.querySelector('.header'), 'fade-in');
    addAnimation(document.querySelector('.banner-container'), 'fade-in');
    addAnimation(document.querySelector('.destaque-produtos-titulo-container'), 'fade-in');
    addAnimation(document.querySelector('.card-produtos'), 'fade-in');
    addAnimation(document.querySelector('.facaContatoContainer'), 'fade-in');
    addAnimation(document.querySelector('.quemSomosImg'), 'slide-left');
    addAnimation(document.querySelector('.quemSomosContent'), 'slide-right');
    addAnimation(document.querySelector('.quemSomosTopicos'), 'fade-in');
    addAnimation(document.querySelector('.localizacao'), 'fade-in');
    addAnimation(document.querySelector('.footer-container'), 'fade-in');
    
    // Adicionar animações aos cards de produtos (quando carregados)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('fade-in');
    });
    
    // Ativar header e banner com delay muito maior
    const header = document.querySelector('.header');
    const banner = document.querySelector('.banner-container');
    
    if (header) {
        setTimeout(() => {
            header.classList.add('visible');
            console.log('Header ativado após delay de 5 segundos');
        }, 5000); // 5 segundos
    }
    
    if (banner) {
        setTimeout(() => {
            banner.classList.add('visible');
            console.log('Banner ativado após delay de 6 segundos');
        }, 6000); // 6 segundos
    }
    
    // Verificar no scroll
    window.addEventListener('scroll', checkScroll);
    
    // Verificar imediatamente
    checkScroll();
}

// Executar quando a página carregar
window.addEventListener('load', initScrollAnimations);

// Também executar quando o DOM estiver pronto (para elementos carregados dinamicamente)
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para elementos dinâmicos carregarem
    setTimeout(initScrollAnimations, 1000);
});