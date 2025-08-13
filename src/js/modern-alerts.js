// Sistema de Alertas Modernos - Shopping das Embalagens
class ModernAlerts {
    constructor() {
        this.init();
    }

    init() {
        // Substituir alert() nativo por alertas modernos
        this.overrideNativeAlerts();
    }

    // Substituir alert() nativo
    overrideNativeAlerts() {
        const originalAlert = window.alert;
        window.alert = (message, type = 'info') => {
            this.show(message, type);
        };
    }

    // Mostrar alerta
    show(message, type = 'info', duration = 5000) {
        const alert = this.createAlert(message, type);
        document.body.appendChild(alert);

        // Auto-remover após duração
        setTimeout(() => {
            this.hide(alert);
        }, duration);

        return alert;
    }

    // Criar elemento de alerta
    createAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `modern-alert ${type}`;
        
        const icon = this.getIconForType(type);
        
        alert.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
            <button class="alert-close" onclick="modernAlerts.hide(this.parentElement)">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Adicionar estilos inline para garantir funcionamento
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            color: white;
            font-weight: 600;
            z-index: 1000001;
            max-width: 350px;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-family: 'Roboto', system-ui, sans-serif;
            font-size: 0.875rem;
            line-height: 1.4;
        `;

        // Aplicar cores baseadas no tipo
        this.applyTypeStyles(alert, type);

        return alert;
    }

    // Aplicar estilos baseados no tipo
    applyTypeStyles(alert, type) {
        const styles = {
            success: {
                background: 'linear-gradient(135deg, #28a745, #20c997)',
                borderLeft: '4px solid #155724',
                zIndex: '999999999999'
            },
            warning: {
                background: 'linear-gradient(135deg, #ffc107, #fd7e14)',
                borderLeft: '4px solid #856404',

                zIndex: '999999999999'
            },
            error: {
                background: 'linear-gradient(135deg, #ff4757, #dc3545)',
                borderLeft: '4px solid #721c24',
                zIndex: '999999999999'
            },
            info: {
                background: 'linear-gradient(135deg, #17a2b8, #0dcaf0)',
                borderLeft: '4px solid #0c5460',
                zIndex: '999999999999'
            }
        };

        const style = styles[type] || styles.info;
        Object.assign(alert.style, style);
    }

    // Obter ícone para o tipo
    getIconForType(type) {
        const icons = {
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            error: 'fas fa-times-circle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    // Esconder alerta
    hide(alert) {
        if (!alert) return;
        
        alert.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 300);
    }

    // Métodos de conveniência
    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }

    // Confirmar ação
    confirm(message, onConfirm, onCancel) {
        const modal = this.createConfirmModal(message, onConfirm, onCancel);
        document.body.appendChild(modal);
        return modal;
    }

    // Criar modal de confirmação
    createConfirmModal(message, onConfirm, onCancel) {
        const modal = document.createElement('div');
        modal.className = 'modern-confirm-modal';
        modal.style.cssText = `
            position: fixed;
            z-index: 1000000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
            z-index: 99999999999;

        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background-color: white;
            padding: 2rem;
            border-radius: 12px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            text-align: center;
            animation: modalSlideIn 0.3s ease;
        `;

        content.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <i class="fas fa-question-circle" style="font-size: 3rem; color: #17a2b8; margin-bottom: 1rem;"></i>
                <h3 style="margin: 0 0 1rem 0; color: #333; font-size: 1.25rem; font-weight: 600;">Confirmação</h3>
                <p style="margin: 0; color: #666; line-height: 1.5;">${message}</p>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn-cancel" style="
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 6px;
                    background: #6c757d;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Cancelar</button>
                <button class="btn-confirm" style="
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 6px;
                    background: linear-gradient(135deg, #25D366, #128C7E);
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Confirmar</button>
            </div>
        `;

        // Eventos dos botões
        const cancelBtn = content.querySelector('.btn-cancel');
        const confirmBtn = content.querySelector('.btn-confirm');

        cancelBtn.addEventListener('click', () => {
            this.hideConfirmModal(modal);
            if (onCancel) onCancel();
        });

        confirmBtn.addEventListener('click', () => {
            this.hideConfirmModal(modal);
            if (onConfirm) onConfirm();
        });

        // Fechar ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideConfirmModal(modal);
                if (onCancel) onCancel();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideConfirmModal(modal);
                if (onCancel) onCancel();
            }
        });

        modal.appendChild(content);
        return modal;
    }

    // Esconder modal de confirmação
    hideConfirmModal(modal) {
        if (!modal) return;
        
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// Inicializar sistema de alertas
let modernAlerts;
document.addEventListener('DOMContentLoaded', function() {
    modernAlerts = new ModernAlerts();
});

// Funções globais para facilitar uso
function showAlert(message, type = 'info', duration = 5000) {
    if (modernAlerts) {
        return modernAlerts.show(message, type, duration);
    }
}

function showSuccess(message, duration) {
    if (modernAlerts) {
        return modernAlerts.success(message, duration);
    }
}

function showWarning(message, duration) {
    if (modernAlerts) {
        return modernAlerts.warning(message, duration);
    }
}

function showError(message, duration) {
    if (modernAlerts) {
        return modernAlerts.error(message, duration);
    }
}

function showInfo(message, duration) {
    if (modernAlerts) {
        return modernAlerts.info(message, duration);
    }
}

function showConfirm(message, onConfirm, onCancel) {
    if (modernAlerts) {
        return modernAlerts.confirm(message, onConfirm, onCancel);
    }
} 