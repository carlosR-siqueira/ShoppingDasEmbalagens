// Sistema de Lista de Orçamento
class QuoteSystem {
    constructor() {
        this.quoteItems = this.loadQuoteFromStorage();
        this.init();
    }

    // Inicializar o sistema
    init() {
        this.createQuoteButton();
        this.createQuoteModal();
        this.updateQuoteCount();
        this.bindEvents();
    }

    // Carregar lista de orçamento do localStorage
    loadQuoteFromStorage() {
        const saved = localStorage.getItem('shoppingQuote');
        return saved ? JSON.parse(saved) : [];
    }

    // Salvar lista de orçamento no localStorage
    saveQuoteToStorage() {
        localStorage.setItem('shoppingQuote', JSON.stringify(this.quoteItems));
    }

    // Criar botão flutuante do carrinho
    createQuoteButton() {
        const quoteBtn = document.createElement('button');
        quoteBtn.className = 'quote-cart-btn';
        quoteBtn.innerHTML = `
            <i class="fas fa-clipboard-list"></i>
            <span class="quote-cart-count" style="display: none;">0</span>
        `;
        quoteBtn.setAttribute('aria-label', 'Abrir lista de orçamento');
        document.body.appendChild(quoteBtn);
    }

    // Criar modal da lista de orçamento
    createQuoteModal() {
        const modal = document.createElement('div');
        modal.className = 'quote-modal';
        modal.innerHTML = `
            <div class="quote-modal-content">
                <div class="quote-modal-header">
                    <h2><i class="fas fa-clipboard-list"></i> Lista de Orçamento</h2>
                    <button class="quote-modal-close" aria-label="Fechar">&times;</button>
                </div>
                <div class="quote-modal-body">
                    <div class="quote-customer-info">
                        <label for="customer-name">Seu Nome:</label>
                        <input type="text" id="customer-name" placeholder="Digite seu nome" class="quote-name-input">
                    </div>
                    <div class="quote-items-container">
                        <div class="quote-empty">
                            <i class="fas fa-clipboard"></i>
                            <h3>Sua lista está vazia</h3>
                            <p>Adicione produtos para criar seu orçamento</p>
                        </div>
                    </div>
                </div>
                <div class="quote-modal-footer">
                    <div class="quote-total">
                        <span id="quote-total-items">0</span> itens na lista
                    </div>
                    <div class="quote-actions">
                        <button class="quote-btn quote-btn-clear" id="clear-quote">
                            <i class="fas fa-trash"></i> Limpar
                        </button>
                        <a class="quote-btn quote-btn-whatsapp" id="send-whatsapp" href="#" target="_blank">
                            <i class="fab fa-whatsapp"></i> Enviar por WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Vincular eventos
    bindEvents() {
        // Botão do carrinho
        document.querySelector('.quote-cart-btn').addEventListener('click', () => {
            this.openQuoteModal();
        });

        // Fechar modal
        document.querySelector('.quote-modal-close').addEventListener('click', () => {
            this.closeQuoteModal();
        });

        // Clicar fora do modal para fechar
        document.querySelector('.quote-modal').addEventListener('click', (e) => {
            if (e.target.classList.contains('quote-modal')) {
                this.closeQuoteModal();
            }
        });

        // Botão limpar
        document.getElementById('clear-quote').addEventListener('click', () => {
            this.clearQuote();
        });

        // Botão enviar WhatsApp
        document.getElementById('send-whatsapp').addEventListener('click', (e) => {
            e.preventDefault();
            this.sendToWhatsApp();
        });

        // Tecla ESC para fechar modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeQuoteModal();
            }
        });
    }

    // Adicionar produto à lista
    addToQuote(product) {
        const existingItem = this.quoteItems.find(item => item.id === product.id);
        
        if (!existingItem) {
            this.quoteItems.push({
                id: product.id,
                name: product.name,
                category: product.category,
                subcategory: product.subcategory,
                imageUrl: product.imageUrl
            });
        }

        this.saveQuoteToStorage();
        this.updateQuoteCount();
        this.showAddedNotification(product.name);
    }

    // Remover produto da lista
    removeFromQuote(productId) {
        this.quoteItems = this.quoteItems.filter(item => item.id !== productId);
        this.saveQuoteToStorage();
        this.updateQuoteCount();
        this.renderQuoteModal();
    }

    // Atualizar quantidade
    updateQuantity(productId, newQuantity) {
        const item = this.quoteItems.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromQuote(productId);
            } else {
                item.quantity = newQuantity;
                this.saveQuoteToStorage();
                this.updateQuoteCount();
            }
        }
    }

    // Limpar lista
    clearQuote() {
        if (this.quoteItems.length === 0) return;
        
        showConfirm('Tem certeza que deseja limpar toda a lista de orçamento?', 
            () => {
                this.quoteItems = [];
                this.saveQuoteToStorage();
                this.updateQuoteCount();
                this.renderQuoteModal();
                showSuccess('Lista de orçamento limpa com sucesso!');
            },
            () => {
                // Usuário cancelou
            }
        );
    }

    // Verificar se produto está na lista
    isInQuote(productId) {
        return this.quoteItems.some(item => item.id === productId);
    }

    // Atualizar contador
    updateQuoteCount() {
        const countElement = document.querySelector('.quote-cart-count');
        const totalItems = this.quoteItems.length;
        
        if (totalItems > 0) {
            countElement.textContent = totalItems;
            countElement.style.display = 'flex';
        } else {
            countElement.style.display = 'none';
        }
    }

    // Abrir modal
    openQuoteModal() {
        this.renderQuoteModal();
        document.querySelector('.quote-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Fechar modal
    closeQuoteModal() {
        document.querySelector('.quote-modal').style.display = 'none';
        document.body.style.overflow = '';
    }

    // Renderizar modal
    renderQuoteModal() {
        const modalBody = document.querySelector('.quote-items-container');
        const totalItemsElement = document.getElementById('quote-total-items');
        const totalItems = this.quoteItems.length;

        if (this.quoteItems.length === 0) {
            modalBody.innerHTML = `
                <div class="quote-empty">
                    <i class="fas fa-clipboard"></i>
                    <h3>Sua lista está vazia</h3>
                    <p>Adicione produtos para criar seu orçamento</p>
                </div>
            `;
        } else {
            modalBody.innerHTML = this.quoteItems.map(item => `
                <div class="quote-item" data-id="${item.id}">
                    <img src="${item.imageUrl}" alt="${item.name}" class="quote-item-image" loading="lazy">
                    <div class="quote-item-details">
                        <div class="quote-item-name">${item.name}</div>
                        <div class="quote-item-category">${item.category} > ${item.subcategory}</div>
                    </div>
                    <button class="quote-item-remove" onclick="quoteSystem.removeFromQuote('${item.id}')" aria-label="Remover ${item.name}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
        }

        totalItemsElement.textContent = totalItems;
    }

    // Mostrar notificação de produto adicionado
    showAddedNotification(productName) {
        showSuccess(`${productName} adicionado à lista de orçamento!`, 3000);
    }

    // Enviar para WhatsApp
    sendToWhatsApp() {
        if (this.quoteItems.length === 0) {
            showWarning('Adicione produtos à lista antes de enviar o orçamento.');
            return;
        }

        const customerName = document.getElementById('customer-name').value.trim();
        if (!customerName) {
            showWarning('Por favor, digite seu nome antes de enviar o orçamento.');
            document.getElementById('customer-name').focus();
            return;
        }

        const phoneNumber = '5521975956593'; // Número do WhatsApp da loja
        const message = this.formatWhatsAppMessage(customerName);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    }

    // Formatar mensagem para WhatsApp
    formatWhatsAppMessage(customerName) {
        let message = `Olá, me chamo ${customerName}!\n\n`;
        message += `Desejo fazer um orçamento com os seguintes itens:\n\n`;
        
        this.quoteItems.forEach((item, index) => {
            message += `${index + 1}. *${item.name}*\n\n`;
            
        });
        
        
        message += `Aguardo o retorno com os preços e disponibilidade de estoque!`;
        
        return message;
    }

    // Atualizar botões "Adicionar à Lista" nos cards de produtos
    updateAddButtons() {
        const addButtons = document.querySelectorAll('.add-to-quote-btn');
        addButtons.forEach(button => {
            const productId = button.getAttribute('data-product-id');
            if (productId) {
                if (this.isInQuote(productId)) {
                    button.classList.add('added');
                    button.innerHTML = '<i class="fas fa-check"></i> Na Lista';
                } else {
                    button.classList.remove('added');
                    button.innerHTML = '<i class="fas fa-plus"></i> Adicionar à Lista';
                }
            }
        });
    }
}

// Inicializar sistema quando o DOM estiver carregado
let quoteSystem;
document.addEventListener('DOMContentLoaded', function() {
    quoteSystem = new QuoteSystem();
    
    // Atualizar botões após um pequeno delay para garantir que os produtos foram carregados
    setTimeout(() => {
        quoteSystem.updateAddButtons();
    }, 1000);
});

// Função global para adicionar produto à lista (usada nos cards de produtos)
function addToQuoteList(product) {
    if (quoteSystem) {
        quoteSystem.addToQuote(product);
        quoteSystem.updateAddButtons();
    }
} 