/**
 * Cookie Consent Management System
 * Shopping das Embalagens - LGPD/GDPR Compliant
 */

class CookieConsent {
    constructor() {
        this.cookieName = 'shopping_embalagens_consent';
        this.cookieExpiry = 365; // days
        this.consentData = this.getConsentData();
        
        this.init();
    }

    init() {
        this.createConsentPopup();
        this.createSettingsModal();
        this.bindEvents();
        
        // Show popup if no consent given
        if (!this.hasConsent()) {
            setTimeout(() => this.showConsentPopup(), 1000);
        }
    }

    createConsentPopup() {
        const popup = document.createElement('div');
        popup.className = 'cookie-consent';
        popup.id = 'cookieConsent';
        
        popup.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <h4><i class="fas fa-cookie-bite"></i> Política de Cookies</h4>
                    <p>
                        Utilizamos cookies para melhorar sua experiência de navegação, 
                        personalizar conteúdo e analisar nosso tráfego. 
                        <a href="#" id="cookieLearnMore">Saiba mais</a> sobre nossa política de privacidade.
                    </p>
                </div>
                <div class="cookie-consent-buttons">
                    <button class="cookie-btn cookie-btn-settings" id="cookieSettings">
                        <i class="fas fa-cog"></i> Configurar
                    </button>
                    <button class="cookie-btn cookie-btn-decline" id="cookieDecline">
                        <i class="fas fa-times"></i> Recusar
                    </button>
                    <button class="cookie-btn cookie-btn-accept" id="cookieAccept">
                        <i class="fas fa-check"></i> Aceitar Todos
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
    }

    createSettingsModal() {
        const modal = document.createElement('div');
        modal.className = 'cookie-settings-modal';
        modal.id = 'cookieSettingsModal';
        
        modal.innerHTML = `
            <div class="cookie-settings-content">
                <div class="cookie-settings-header">
                    <h3><i class="fas fa-cookie-bite"></i> Configurações de Cookies</h3>
                    <button class="cookie-settings-close" id="cookieSettingsClose">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="cookie-settings-body">
                    <div class="cookie-category">
                        <h4>
                            Cookies Essenciais
                            <label class="cookie-toggle">
                                <input type="checkbox" checked disabled>
                                <span class="cookie-toggle-slider"></span>
                            </label>
                        </h4>
                        <p>
                            Estes cookies são necessários para o funcionamento básico do site 
                            e não podem ser desabilitados. Incluem cookies de sessão e segurança.
                        </p>
                    </div>
                    
                    <div class="cookie-category">
                        <h4>
                            Cookies de Performance
                            <label class="cookie-toggle">
                                <input type="checkbox" id="performanceCookies">
                                <span class="cookie-toggle-slider"></span>
                            </label>
                        </h4>
                        <p>
                            Estes cookies coletam informações sobre como você usa nosso site, 
                            ajudando-nos a melhorar o desempenho e a experiência do usuário.
                        </p>
                    </div>
                    
                    <div class="cookie-category">
                        <h4>
                            Cookies de Marketing
                            <label class="cookie-toggle">
                                <input type="checkbox" id="marketingCookies">
                                <span class="cookie-toggle-slider"></span>
                            </label>
                        </h4>
                        <p>
                            Estes cookies são usados para personalizar anúncios e medir 
                            a eficácia de campanhas publicitárias.
                        </p>
                    </div>
                    
                    <div class="cookie-category">
                        <h4>
                            Cookies de Funcionalidade
                            <label class="cookie-toggle">
                                <input type="checkbox" id="functionalCookies">
                                <span class="cookie-toggle-slider"></span>
                            </label>
                        </h4>
                        <p>
                            Estes cookies permitem que o site lembre de suas escolhas 
                            e forneça recursos aprimorados e personalizados.
                        </p>
                    </div>
                </div>
                <div class="cookie-settings-footer">
                    <button style="display: none;"  id="cookieDeclineAll">
                      
                    </button>
                    <button class="cookie-btn cookie-btn-accept" id="cookieSaveSettings">
                        Salvar Configurações
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    bindEvents() {
        // Accept all cookies
        document.getElementById('cookieAccept').addEventListener('click', () => {
            this.acceptAllCookies();
        });

        // Decline all cookies
        document.getElementById('cookieDecline').addEventListener('click', () => {
            this.declineAllCookies();
        });

        // Open settings modal
        document.getElementById('cookieSettings').addEventListener('click', () => {
            this.openSettingsModal();
        });

        // Close settings modal
        document.getElementById('cookieSettingsClose').addEventListener('click', () => {
            this.closeSettingsModal();
        });

        // Save custom settings
        document.getElementById('cookieSaveSettings').addEventListener('click', () => {
            this.saveCustomSettings();
        });

        // Decline all from modal
        document.getElementById('cookieDeclineAll').addEventListener('click', () => {
            this.declineAllCookies();
            this.closeSettingsModal();
        });

        // Learn more link
        document.getElementById('cookieLearnMore').addEventListener('click', (e) => {
            e.preventDefault();
            this.openSettingsModal();
        });

        // Close modal when clicking outside
        document.getElementById('cookieSettingsModal').addEventListener('click', (e) => {
            if (e.target.id === 'cookieSettingsModal') {
                this.closeSettingsModal();
            }
        });
    }

    showConsentPopup() {
        const popup = document.getElementById('cookieConsent');
        popup.classList.add('show');
    }

    hideConsentPopup() {
        const popup = document.getElementById('cookieConsent');
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 400);
    }

    openSettingsModal() {
        const modal = document.getElementById('cookieSettingsModal');
        modal.classList.add('show');
        
        // Load current settings
        this.loadCurrentSettings();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeSettingsModal() {
        const modal = document.getElementById('cookieSettingsModal');
        modal.classList.remove('show');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    loadCurrentSettings() {
        const consent = this.getConsentData();
        
        document.getElementById('performanceCookies').checked = consent.performance || false;
        document.getElementById('marketingCookies').checked = consent.marketing || false;
        document.getElementById('functionalCookies').checked = consent.functional || false;
    }

    acceptAllCookies() {
        const consent = {
            essential: true,
            performance: true,
            marketing: true,
            functional: true,
            timestamp: new Date().toISOString()
        };
        
        this.saveConsent(consent);
        this.hideConsentPopup();
        this.applyCookieSettings(consent);
        
        this.showNotification('Cookies aceitos com sucesso!', 'success');
    }

    declineAllCookies() {
        const consent = {
            essential: true, // Always required
            performance: false,
            marketing: false,
            functional: false,
            timestamp: new Date().toISOString()
        };
        
        this.saveConsent(consent);
        this.hideConsentPopup();
        this.applyCookieSettings(consent);
        
        this.showNotification('Preferências de cookies salvas!', 'info');
    }

    saveCustomSettings() {
        const consent = {
            essential: true, // Always required
            performance: document.getElementById('performanceCookies').checked,
            marketing: document.getElementById('marketingCookies').checked,
            functional: document.getElementById('functionalCookies').checked,
            timestamp: new Date().toISOString()
        };
        
        this.saveConsent(consent);
        this.closeSettingsModal();
        this.hideConsentPopup();
        this.applyCookieSettings(consent);
        
        this.showNotification('Configurações de cookies salvas!', 'success');
    }

    saveConsent(consent) {
        const cookieValue = JSON.stringify(consent);
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (this.cookieExpiry * 24 * 60 * 60 * 1000));
        
        document.cookie = `${this.cookieName}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
        this.consentData = consent;
    }

    getConsentData() {
        const cookies = document.cookie.split(';');
        
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === this.cookieName) {
                try {
                    return JSON.parse(decodeURIComponent(value));
                } catch (e) {
                    return null;
                }
            }
        }
        
        return null;
    }

    hasConsent() {
        return this.consentData !== null;
    }

    hasConsentFor(category) {
        return this.consentData && this.consentData[category] === true;
    }

    applyCookieSettings(consent) {
        // Apply Google Analytics if performance cookies are accepted
        if (consent.performance) {
            this.loadGoogleAnalytics();
        }

        // Apply marketing cookies if accepted
        if (consent.marketing) {
            this.loadMarketingScripts();
        }

        // Apply functional cookies if accepted
        if (consent.functional) {
            this.loadFunctionalScripts();
        }

        // Trigger custom event for other scripts to listen
        window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
            detail: consent
        }));
    }

    loadGoogleAnalytics() {
        // SUBSTITUA 'G-XXXXXXXXXX' pelo seu ID real do Google Analytics
        const GA_ID = 'G-XXXXXXXXXX'; // ← COLOQUE SEU ID AQUI
        
        if (typeof gtag === 'undefined') {
            // Carregar script do Google Analytics
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
            document.head.appendChild(script);

            // Configurar Google Analytics
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            
            gtag('js', new Date());
            gtag('config', GA_ID, {
                // Configurações de privacidade
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
            });

            // Eventos personalizados para e-commerce
            this.setupEcommerceTracking();
            
            console.log('✅ Google Analytics carregado:', GA_ID);
        }
    }

    setupEcommerceTracking() {
        // Rastrear visualizações de produtos
        window.trackProductView = (productData) => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_item', {
                    currency: 'BRL',
                    value: 0, // Preço se disponível
                    items: [{
                        item_id: productData.id,
                        item_name: productData.name,
                        item_category: productData.category,
                        item_category2: productData.subcategory,
                        quantity: 1
                    }]
                });
            }
        };

        // Rastrear adições ao orçamento
        window.trackAddToQuote = (productData) => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'add_to_cart', {
                    currency: 'BRL',
                    value: 0,
                    items: [{
                        item_id: productData.id,
                        item_name: productData.name,
                        item_category: productData.category,
                        item_category2: productData.subcategory,
                        quantity: 1
                    }]
                });
            }
        };

        // Rastrear envio de orçamento
        window.trackQuoteSubmission = (quoteData) => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'purchase', {
                    transaction_id: 'quote_' + Date.now(),
                    currency: 'BRL',
                    value: 0,
                    items: quoteData.items || []
                });
            }
        };
    }

    loadMarketingScripts() {
        // SUBSTITUA 'YOUR_PIXEL_ID' pelo seu ID real do Facebook Pixel
        const FACEBOOK_PIXEL_ID = 'YOUR_PIXEL_ID'; // ← COLOQUE SEU ID AQUI
        
        // Carregar Facebook Pixel
        this.loadFacebookPixel(FACEBOOK_PIXEL_ID);
        
        // Carregar Google Ads (opcional)
        // this.loadGoogleAds('AW-CONVERSION_ID');
        
        console.log('✅ Scripts de marketing carregados');
    }

    loadFacebookPixel(pixelId) {
        if (typeof fbq === 'undefined') {
            // Carregar Facebook Pixel
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', pixelId);
            fbq('track', 'PageView');

            // Eventos personalizados para e-commerce
            this.setupFacebookEvents();
            
            console.log('✅ Facebook Pixel carregado:', pixelId);
        }
    }

    setupFacebookEvents() {
        // Rastrear visualizações de produtos
        window.trackFBProductView = (productData) => {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'ViewContent', {
                    content_type: 'product',
                    content_ids: [productData.id],
                    content_name: productData.name,
                    content_category: productData.category,
                    currency: 'BRL',
                    value: 0
                });
            }
        };

        // Rastrear interesse em orçamento
        window.trackFBAddToCart = (productData) => {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'AddToCart', {
                    content_type: 'product',
                    content_ids: [productData.id],
                    content_name: productData.name,
                    currency: 'BRL',
                    value: 0
                });
            }
        };

        // Rastrear envio de orçamento (lead)
        window.trackFBLead = (formData) => {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Solicitação de Orçamento',
                    currency: 'BRL',
                    value: 0
                });
            }
        };

        // Rastrear contato via WhatsApp
        window.trackFBContact = (method) => {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', {
                    content_name: `Contato via ${method}`
                });
            }
        };
    }

    loadFunctionalScripts() {
        // Carregar widgets de chat e funcionalidades
        this.loadChatWidget();
        this.setupUserPreferences();
        this.setupSearchHistory();
        
        console.log('✅ Scripts funcionais carregados');
    }

    loadChatWidget() {
        // Exemplo: Carregar Tawk.to, Zendesk, ou outro chat
        // SUBSTITUA pelos dados do seu chat widget
        
        /*
        // Exemplo Tawk.to:
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();
        (function(){
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/YOUR_WIDGET_ID/default';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
        })();
        */
        
        console.log('💬 Chat widget preparado (configure seu ID)');
    }

    setupUserPreferences() {
        // Sistema de preferências do usuário
        window.UserPreferences = {
            save: function(key, value) {
                if (CookieConsent.hasConsentFor('functional')) {
                    localStorage.setItem('pref_' + key, JSON.stringify(value));
                }
            },
            
            get: function(key, defaultValue = null) {
                if (CookieConsent.hasConsentFor('functional')) {
                    const stored = localStorage.getItem('pref_' + key);
                    return stored ? JSON.parse(stored) : defaultValue;
                }
                return defaultValue;
            },
            
            remove: function(key) {
                localStorage.removeItem('pref_' + key);
            }
        };

        // Salvar preferências de visualização
        window.saveViewPreference = function(type, value) {
            UserPreferences.save('view_' + type, value);
        };

        // Carregar preferências salvas
        this.loadSavedPreferences();
    }

    setupSearchHistory() {
        // Histórico de buscas (se permitido)
        window.SearchHistory = {
            add: function(searchTerm) {
                if (CookieConsent.hasConsentFor('functional')) {
                    let history = this.get();
                    history.unshift(searchTerm);
                    // Manter apenas os últimos 10
                    history = history.slice(0, 10);
                    localStorage.setItem('search_history', JSON.stringify(history));
                }
            },
            
            get: function() {
                if (CookieConsent.hasConsentFor('functional')) {
                    const stored = localStorage.getItem('search_history');
                    return stored ? JSON.parse(stored) : [];
                }
                return [];
            },
            
            clear: function() {
                localStorage.removeItem('search_history');
            }
        };
    }

    loadSavedPreferences() {
        // Aplicar preferências salvas na página
        const theme = UserPreferences.get('theme', 'light');
        const language = UserPreferences.get('language', 'pt-BR');
        
        // Aplicar tema se necessário
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        }
        
        console.log('⚙️ Preferências carregadas:', { theme, language });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2fcacf' : '#666'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 9999999;
            font-family: 'DM Sans', sans-serif;
            font-size: 14px;
            max-width: 300px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Public method to check consent for external scripts
    static hasConsentFor(category) {
        const instance = window.cookieConsentInstance;
        return instance ? instance.hasConsentFor(category) : false;
    }

    // Public method to open settings modal from external triggers
    static openSettings() {
        const instance = window.cookieConsentInstance;
        if (instance) {
            instance.openSettingsModal();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsentInstance = new CookieConsent();
});

// Export for external use
window.CookieConsent = CookieConsent;
