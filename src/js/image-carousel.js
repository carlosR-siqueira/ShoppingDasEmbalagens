/**
 * Sistema de Troca de Imagens para Cards de Produtos
 * Muda apenas o src da imagem quando o mouse estiver sobre o card
 * Inclui cards normais e relacionados, sem interferir no carrossel principal
 */

console.log('🔄 Carregando sistema de troca de imagens...');

class ImageCarousel {
    constructor() {
        this.carousels = new Map();
        this.intervalTime = 2000; // 2 segundos entre as trocas
        this.init();
    }

    init() {
        console.log('🚀 Inicializando sistema de troca de imagens...');
        
        // Aguardar o carregamento completo da página
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupCarousels());
        } else {
            this.setupCarousels();
        }
    }

    setupCarousels() {
        console.log('🔍 Procurando cards de produtos...');
        // Buscar todos os cards de produtos (incluindo relacionados)
        const productCards = document.querySelectorAll('.card, .related-card');
        console.log(`📦 Encontrados ${productCards.length} cards`);
        
        productCards.forEach((card, index) => {
            this.setupCardCarousel(card, index);
        });

        // Observar mudanças no DOM para novos cards
        this.observeNewCards();
    }

    setupCardCarousel(card, cardIndex) {
        const img = card.querySelector('.card-img-top');
        
        if (!img) {
            console.log(`❌ Card ${cardIndex}: Imagem não encontrada`);
            return;
        }

        console.log(`✅ Card ${cardIndex}: Configurando troca de imagens...`);
        
        // Verificar se o produto tem múltiplas imagens
        const productId = card.getAttribute('data-id');
        if (!productId) {
            console.log(`❌ Card ${cardIndex}: ID do produto não encontrado`);
            return;
        }

        console.log(`🔍 Card ${cardIndex}: Verificando imagens do produto ${productId}...`);
        
        // Buscar dados do produto para verificar se tem múltiplas imagens
        this.checkProductImages(productId, card, cardIndex);
    }

    async checkProductImages(productId, card, cardIndex) {
        try {
            console.log(`📡 Buscando dados do produto ${productId}...`);
            
            // Buscar dados do produto do Firebase
            const productData = await this.fetchProductData(productId);
            
            if (!productData) {
                console.log(`❌ Produto ${productId}: Dados não encontrados`);
                return;
            }

            console.log(`✅ Produto ${productId}: Dados carregados`, productData);
            
            const images = this.extractImages(productData);
            console.log(`🖼️ Produto ${productId}: ${images.length} imagens encontradas`, images);
            
            if (images.length > 1) {
                console.log(`🎠 Configurando troca de imagens para produto ${productId}...`);
                this.setupImageSwitching(card, images, cardIndex);
            } else {
                console.log(`ℹ️ Produto ${productId}: Apenas ${images.length} imagem, pulando troca`);
            }
        } catch (error) {
            console.error(`❌ Erro ao verificar imagens do produto ${productId}:`, error);
        }
    }

    async fetchProductData(productId) {
        // Buscar em todas as categorias e subcategorias
        const baseUrl = 'https://shopping-das-embalagens-default-rtdb.firebaseio.com/products.json';
        
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) return null;
            
            const data = await response.json();
            
            // Procurar o produto em todas as categorias
            for (const categoria in data) {
                for (const subcategoria in data[categoria]) {
                    for (const id in data[categoria][subcategoria]) {
                        if (id === productId) {
                            return data[categoria][subcategoria][id];
                        }
                    }
                }
            }
            
            return null;
        } catch (error) {
            console.error('Erro ao buscar dados do produto:', error);
            return null;
        }
    }

    extractImages(productData) {
        const images = [];
        
        // Adicionar imagens se existirem
        if (productData.imageUrl) images.push(productData.imageUrl);
        if (productData.imageUrl2) images.push(productData.imageUrl2);
        if (productData.imageUrl3) images.push(productData.imageUrl3);
        
        return images;
    }

    setupImageSwitching(card, images, cardIndex) {
        const img = card.querySelector('.card-img-top');
        
        if (!img) return;

        console.log(`🎨 Configurando troca de imagens para card ${cardIndex}...`);

        // Armazenar dados do carrossel
        this.carousels.set(cardIndex, {
            card: card,
            img: img,
            images: images,
            currentIndex: 0,
            intervalId: null,
            isHovering: false
        });
        
        console.log(`✅ Troca de imagens configurada para card ${cardIndex} com ${images.length} imagens`);
        
        // Adicionar eventos de hover para iniciar/parar a troca
        this.addHoverEvents(card, cardIndex);
    }

    addHoverEvents(card, cardIndex) {
        card.addEventListener('mouseenter', () => {
            console.log(`🖱️ Mouse entrou no card ${cardIndex}`);
            this.startImageSwitching(cardIndex);
        });
        
        card.addEventListener('mouseleave', () => {
            console.log(`🖱️ Mouse saiu do card ${cardIndex}`);
            this.stopImageSwitching(cardIndex);
        });
    }

    startImageSwitching(cardIndex) {
        const carousel = this.carousels.get(cardIndex);
        if (!carousel) return;

        console.log(`▶️ Iniciando troca de imagens do card ${cardIndex}`);
        carousel.isHovering = true;
        
        // Se já existe um intervalo, limpar primeiro
        if (carousel.intervalId) {
            clearInterval(carousel.intervalId);
        }

        // Iniciar a troca de imagens
        carousel.intervalId = setInterval(() => {
            this.nextImage(cardIndex);
        }, this.intervalTime);
    }

    stopImageSwitching(cardIndex) {
        const carousel = this.carousels.get(cardIndex);
        if (!carousel) return;

        console.log(`⏹️ Parando troca de imagens do card ${cardIndex}`);
        carousel.isHovering = false;
        
        if (carousel.intervalId) {
            clearInterval(carousel.intervalId);
            carousel.intervalId = null;
        }

        // Voltar para a primeira imagem quando sair do hover
        carousel.currentIndex = 0;
        carousel.img.src = carousel.images[0];
    }

    nextImage(cardIndex) {
        const carousel = this.carousels.get(cardIndex);
        if (!carousel || !carousel.isHovering) return;

        const nextIndex = (carousel.currentIndex + 1) % carousel.images.length;
        console.log(`🔄 Mudando para imagem ${nextIndex} do card ${cardIndex}`);
        
        // Atualizar índice atual
        carousel.currentIndex = nextIndex;
        
        // Trocar a imagem
        carousel.img.src = carousel.images[nextIndex];
    }

    observeNewCards() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Verificar se é um card ou contém cards (incluindo relacionados)
                        const cards = node.classList?.contains('card') || node.classList?.contains('related-card')
                            ? [node] 
                            : node.querySelectorAll?.('.card, .related-card');
                        
                        if (cards) {
                            console.log(`🆕 Novos cards detectados: ${cards.length}`);
                            cards.forEach((card, index) => {
                                const cardIndex = this.carousels.size + index;
                                this.setupCardCarousel(card, cardIndex);
                            });
                        }
                    }
                });
            });
        });

        // Observar mudanças no container de produtos
        const productContainer = document.querySelector('.card-produtos') || 
                                document.querySelector('.containerItens') ||
                                document.querySelector('#featured-products') ||
                                document.querySelector('#produtos-relacionados-container');
        
        if (productContainer) {
            console.log('👀 Observando mudanças no container de produtos');
            observer.observe(productContainer, {
                childList: true,
                subtree: true
            });
        }
    }

    // Método público para reinicializar carrosséis
    reinitialize() {
        console.log('🔄 Reinicializando sistema de troca de imagens...');
        this.carousels.forEach((carousel, cardIndex) => {
            this.stopImageSwitching(cardIndex);
        });
        this.carousels.clear();
        this.setupCarousels();
    }
}

// Inicializar o sistema quando a página carregar
let imageCarousel;

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM carregado, aguardando produtos...');
    // Aguardar um pouco para garantir que os produtos foram carregados
    setTimeout(() => {
        console.log('⏰ Iniciando sistema de troca de imagens após delay...');
        imageCarousel = new ImageCarousel();
    }, 2000);
});

// Reinicializar quando produtos forem carregados dinamicamente
window.addEventListener('productsLoaded', function() {
    console.log('📦 Evento productsLoaded disparado');
    if (imageCarousel) {
        imageCarousel.reinitialize();
    }
});

console.log('✅ Script de troca de imagens carregado');