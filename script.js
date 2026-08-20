/**
 * Agrinho 2026 - Script Principal
 * Desenvolvido por Uriel Henrique
 * 
 * Arquitetura: Módulo único (Namespace) para evitar poluição do escopo global.
 * Funcionalidades: Acessibilidade, Observers de Scroll, Menu Mobile, Interatividade.
 */

'use strict';

const AgrinhoApp = (function() {
    
    // ==========================================================================
    // 1. CONFIGURAÇÃO E ESTADO
    // ==========================================================================
    const config = {
        selectors: {
            header: '#main-header',
            mobileMenuBtn: '.mobile-menu-btn',
            navMenu: '#main-nav',
            backToTop: '#back-to-top',
            accessibilityToggle: '#accessibility-toggle',
            accessibilityPanel: '#accessibility-panel',
            closePanelBtn: '#close-panel',
            balanceSlider: '#balance-slider',
            equilibriumText: '#equilibrium-text',
            faqItems: '.faq-item'
        },
        classes: {
            scrolled: 'scrolled',
            active: 'active',
            highContrast: 'high-contrast',
            reduceMotion: 'reduce-motion',
            largeSpacing: 'large-spacing'
        },
        storageKeys: {
            fontSize: 'agrinho_font_size',
            contrast: 'agrinho_contrast',
            spacing: 'agrinho_spacing',
            motion: 'agrinho_motion'
        },
        limits: {
            minFontSize: 80,
            maxFontSize: 150,
            stepFontSize: 10
        }
    };

    let state = {
        fontSize: 100,
        isHighContrast: false,
        isLargeSpacing: false,
        isReduceMotion: false
    };

    // ==========================================================================
    // 2. GERENCIADOR DE ACESSIBILIDADE
    // ==========================================================================
    const AccessibilityManager = {
        init() {
            this.loadPreferences();
            this.applyPreferences();
            this.bindEvents();
        },

        loadPreferences() {
            try {
                const savedFontSize = localStorage.getItem(config.storageKeys.fontSize);
                const savedContrast = localStorage.getItem(config.storageKeys.contrast);
                const savedSpacing = localStorage.getItem(config.storageKeys.spacing);
                const savedMotion = localStorage.getItem(config.storageKeys.motion);

                if (savedFontSize) state.fontSize = parseInt(savedFontSize, 10);
                if (savedContrast) state.isHighContrast = savedContrast === 'true';
                if (savedSpacing) state.isLargeSpacing = savedSpacing === 'true';
                if (savedMotion) state.isReduceMotion = savedMotion === 'true';
            } catch (e) {
                console.warn('LocalStorage não disponível. Preferências não serão salvas.', e);
            }
        },

        applyPreferences() {
            document.documentElement.style.setProperty('--tamanho-fonte-base', `${state.fontSize}%`);
            
            if (state.isHighContrast) document.body.classList.add(config.classes.highContrast);
            else document.body.classList.remove(config.classes.highContrast);

            if (state.isLargeSpacing) {
                document.documentElement.style.setProperty('--espacamento-linha', '2.0');
                document.documentElement.style.setProperty('--espacamento-letras', '0.05em');
            } else {
                document.documentElement.style.setProperty('--espacamento-linha', '1.6');
                document.documentElement.style.setProperty('--espacamento-letras', 'normal');
            }

            if (state.isReduceMotion) document.body.classList.add(config.classes.reduceMotion);
            else document.body.classList.remove(config.classes.reduceMotion);

            this.updateAriaLabels();
        },

        savePreferences() {
            try {
                localStorage.setItem(config.storageKeys.fontSize, state.fontSize);
                localStorage.setItem(config.storageKeys.contrast, state.isHighContrast);
                localStorage.setItem(config.storageKeys.spacing, state.isLargeSpacing);
                localStorage.setItem(config.storageKeys.motion, state.isReduceMotion);
            } catch (e) {
                console.warn('Erro ao salvar preferências.', e);
            }
        },

        updateAriaLabels() {
            const panel = document.querySelector(config.selectors.accessibilityPanel);
            const toggle = document.querySelector(config.selectors.accessibilityToggle);
            const isPanelOpen = panel.classList.contains(config.classes.active);
            
            toggle.setAttribute('aria-expanded', isPanelOpen);
            panel.setAttribute('aria-hidden', !isPanelOpen);
        },

        increaseFont() {
            if (state.fontSize < config.limits.maxFontSize) {
                state.fontSize += config.limits.stepFontSize;
                this.applyPreferences();
                this.savePreferences();
            }
        },

        decreaseFont() {
            if (state.fontSize > config.limits.minFontSize) {
                state.fontSize -= config.limits.stepFontSize;
                this.applyPreferences();
                this.savePreferences();
            }
        },

        toggleContrast() {
            state.isHighContrast = !state.isHighContrast;
            this.applyPreferences();
            this.savePreferences();
        },

        toggleSpacing() {
            state.isLargeSpacing = !state.isLargeSpacing;
            this.applyPreferences();
            this.savePreferences();
        },

        toggleMotion() {
            state.isReduceMotion = !state.isReduceMotion;
            this.applyPreferences();
            this.savePreferences();
        },

        reset() {
            state = {
                fontSize: 100,
                isHighContrast: false,
                isLargeSpacing: false,
                isReduceMotion: false
            };
            try {
                Object.values(config.storageKeys).forEach(key => localStorage.removeItem(key));
            } catch (e) {
                console.warn('Erro ao limpar localStorage.', e);
            }
            this.applyPreferences();
        },

        bindEvents() {
            document.getElementById('btn-increase-font').addEventListener('click', () => this.increaseFont());
            document.getElementById('btn-decrease-font').addEventListener('click', () => this.decreaseFont());
            document.getElementById('btn-contrast').addEventListener('click', () => this.toggleContrast());
            document.getElementById('btn-spacing').addEventListener('click', () => this.toggleSpacing());
            document.getElementById('btn-reduce-motion').addEventListener('click', () => this.toggleMotion());
            document.getElementById('btn-reset').addEventListener('click', () => this.reset());
        }
    };

    // ==========================================================================
    // 3. GERENCIADOR DE UI (Header, Menu, Scroll)
    // ==========================================================================
    const UIManager = {
        init() {
            this.bindEvents();
            this.handleScroll(); // Checagem inicial
        },

        handleScroll() {
            const header = document.querySelector(config.selectors.header);
            const backToTop = document.querySelector(config.selectors.backToTop);
            const scrollY = window.scrollY;

            // Header glassmorphism
            if (scrollY > 50) {
                header.classList.add(config.classes.scrolled);
            } else {
                header.classList.remove(config.classes.scrolled);
            }

            // Back to top button visibility
            if (scrollY > 500) {
                backToTop.hidden = false;
            } else {
                backToTop.hidden = true;
            }
        },

        toggleMobileMenu() {
            const btn = document.querySelector(config.selectors.mobileMenuBtn);
            const nav = document.querySelector(config.selectors.navMenu);
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            btn.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle(config.classes.active);
            
            // Trap focus logic could be added here for full WCAG compliance
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        },

        toggleAccessibilityPanel() {
            const panel = document.querySelector(config.selectors.accessibilityPanel);
            panel.classList.toggle(config.classes.active);
            AccessibilityManager.updateAriaLabels();
            
            // Focus management
            if (panel.classList.contains(config.classes.active)) {
                document.getElementById('close-panel').focus();
            }
        },

        closeAccessibilityPanel() {
            const panel = document.querySelector(config.selectors.accessibilityPanel);
            panel.classList.remove(config.classes.active);
            AccessibilityManager.updateAriaLabels();
            document.querySelector(config.selectors.accessibilityToggle).focus();
        },

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: state.isReduceMotion ? 'auto' : 'smooth'
            });
        },

        bindEvents() {
            // Scroll listener with debounce for performance
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                if (scrollTimeout) return;
                scrollTimeout = setTimeout(() => {
                    this.handleScroll();
                    scrollTimeout = null;
                }, 100);
            }, { passive: true });

            // Mobile menu
            document.querySelector(config.selectors.mobileMenuBtn).addEventListener('click', () => this.toggleMobileMenu());
            
            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        this.toggleMobileMenu();
                    }
                });
            });

            // Accessibility panel
            document.querySelector(config.selectors.accessibilityToggle).addEventListener('click', () => this.toggleAccessibilityPanel());
            document.querySelector(config.selectors.closePanelBtn).addEventListener('click', () => this.closeAccessibilityPanel());
            
            // Close panel on outside click
            document.addEventListener('click', (e) => {
                const panel = document.querySelector(config.selectors.accessibilityPanel);
                const toggle = document.querySelector(config.selectors.accessibilityToggle);
                if (panel.classList.contains(config.classes.active) && 
                    !panel.contains(e.target) && 
                    !toggle.contains(e.target)) {
                    this.closeAccessibilityPanel();
                }
            });

            // Back to top
            document.querySelector(config.selectors.backToTop).addEventListener('click', () => this.scrollToTop());

            // Keyboard navigation for panel
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const panel = document.querySelector(config.selectors.accessibilityPanel);
                    if (panel.classList.contains(config.classes.active)) {
                        this.closeAccessibilityPanel();
                    }
                    const nav = document.querySelector(config.selectors.navMenu);
                    if (nav.classList.contains(config.classes.active)) {
                        this.toggleMobileMenu();
                    }
                }
            });
        }
    };

    // ==========================================================================
    // 4. OBSERVER DE ANIMAÇÕES (Intersection Observer)
    // ==========================================================================
    const AnimationManager = {
        init() {
            // Verifica se o usuário prefere movimento reduzido
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || state.isReduceMotion;
            
            if (prefersReducedMotion) {
                // Se preferir, mostra tudo imediatamente
                document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                });
                return;
            }

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        obs.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Pausa animações inicialmente para serem disparadas pelo observer
            document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
                el.style.animationPlayState = 'paused';
                observer.observe(el);
            });
        }
    };

    // ==========================================================================
    // 5. SEÇÃO INTERATIVA: EQUILÍBRIO
    // ==========================================================================
    const EquilibriumManager = {
        init() {
            const slider = document.querySelector(config.selectors.balanceSlider);
            const display = document.querySelector(config.selectors.equilibriumText);
            
            if (!slider || !display) return;

            const scenarios = [
                {
                    threshold: 30,
                    title: "Risco Ambiental",
                    text: "Quando a produção é priorizada sem controle, o esgotamento do solo, a escassez hídrica e a perda de biodiversidade ameaçam a própria capacidade de produzir no futuro."
                },
                {
                    threshold: 70,
                    title: "Equilíbrio Ideal",
                    text: "Quando produção e preservação caminham juntas, garantimos alimentos hoje sem comprometer os recursos de amanhã. Esta é a base do desenvolvimento sustentável."
                },
                {
                    threshold: 100,
                    title: "Subutilização",
                    text: "Preservar é essencial, mas a produção agrícola é vital para a segurança alimentar global. O desafio é produzir mais, usando menos recursos e menos espaço."
                }
            ];

            const updateDisplay = () => {
                const value = parseInt(slider.value, 10);
                slider.setAttribute('aria-valuenow', value);
                
                let scenario = scenarios[1]; // Default (equilíbrio)
                
                if (value <= 30) scenario = scenarios[0];
                else if (value >= 70) scenario = scenarios[2];

                // Atualiza com transição suave
                display.style.opacity = '0.5';
                setTimeout(() => {
                    display.querySelector('h3').textContent = scenario.title;
                    display.querySelector('p').textContent = scenario.text;
                    display.style.opacity = '1';
                }, 150);
            };

            slider.addEventListener('input', updateDisplay);
            
            // Inicializa
            updateDisplay();
        }
    };

    // ==========================================================================
    // 6. INICIALIZAÇÃO
    // ==========================================================================
    const init = function() {
        document.addEventListener('DOMContentLoaded', () => {
            AccessibilityManager.init();
            UIManager.init();
            AnimationManager.init();
            EquilibriumManager.init();
            
            console.log('Agrinho 2026 App inicializado com sucesso. Desenvolvido por Uriel Henrique.');
        });
    };

    return { init };
})();

// Inicia a aplicação
AgrinhoApp.init();
