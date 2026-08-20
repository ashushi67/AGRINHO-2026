# Agrinho 2026 — Agro Forte, Futuro Sustentável

## Sobre o Projeto
Este é um site institucional moderno, responsivo e focado em acessibilidade, desenvolvido para apresentar o tema do **Agrinho 2026**. O projeto transmite visualmente os conceitos de agricultura, sustentabilidade, tecnologia e educação, com uma identidade visual sofisticada que evita clichês visuais e prioriza a experiência do usuário (UX) e a inclusão digital.

## Tema Oficial
> **"Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente"**

## Tecnologias Utilizadas
O projeto foi construído do zero, sem dependência de frameworks ou bibliotecas externas, garantindo performance máxima e controle total sobre o código:
- **HTML5**: Estrutura semântica rigorosa, atributos ARIA para leitores de tela e SEO otimizado.
- **CSS3**: Variáveis (Design Tokens), Flexbox, CSS Grid, animações `@keyframes`, Glassmorphism e Media Queries para responsividade total.
- **JavaScript (Vanilla)**: Arquitetura modular (Namespace), `IntersectionObserver` para animações de scroll, gerenciamento de estado com `localStorage` e manipulação segura do DOM.

## Funcionalidades Principais
1. **Design Responsivo**: Layout adaptável de mobile (375px) a telas 4K (1440px+).
2. **Menu Mobile**: Hamburger menu com animação suave e bloqueio de scroll do body quando aberto.
3. **Seção Interativa "Equilíbrio"**: Slider customizado que altera dinamicamente o texto explicativo sobre a relação entre produção e meio ambiente.
4. **Animações de Scroll**: Elementos que surgem suavemente (`fade-in-up`, `fade-in-left`) ao entrarem na viewport, respeitando a preferência do sistema.
5. **FAQ Accordion**: Seção de perguntas frequentes com HTML nativo (`<details>`/`<summary>`) estilizado e acessível.

## Recursos de Acessibilidade (WCAG)
O projeto possui um **Painel de Acessibilidade** funcional (canto inferior direito) que persiste as escolhas do usuário via `localStorage`:
- 🔍 **Aumentar/Diminuir Fonte**: Ajusta a variável `--tamanho-fonte-base` de 80% a 150%.
- ◐ **Alto Contraste**: Aplica a classe `.high-contrast`, forçando fundo preto, texto branco e destaques em amarelo para máxima legibilidade.
- ↔ **Espaçamento**: Aumenta o `line-height` e `letter-spacing` para facilitar a leitura por pessoas com dislexia ou baixa visão.
- ⏱ **Reduzir Animações**: Desativa transições e animações CSS, respeitando também a media query `prefers-reduced-motion` do sistema operacional.
- 🔄 **Restaurar Padrão**: Limpa o `localStorage` e retorna às configurações originais.
- **Navegação por Teclado**: Foco visível (`:focus-visible`), skip link para pular navegação e gerenciamento de foco em modais/painéis.

## Estrutura de Arquivos
text
agrinho-2026/
│
├── index.html      # Estrutura semântica e conteúdo
├── style.css       # Estilos, variáveis, animações e responsividade
├── script.js       # Lógica de interatividade, acessibilidade e observers
└── README.md       # Documentação do projeto


## Como Executar
1. Clone ou baixe os arquivos para uma pasta local.
2. Abra o arquivo `index.html` diretamente em qualquer navegador moderno (Chrome, Firefox, Edge, Safari).
3. Não é necessário servidor local (Live Server) para visualização básica, mas é recomendado para testar algumas funcionalidades de segurança de cookies/storage em ambientes de produção.

## Créditos
- **Conceito e Tema**: Baseado nas diretrizes educacionais do Agrinho.
- **Design e Desenvolvimento**: By Uriel Henrique
- **Ano de Referência**: 2026

---
*Projeto desenvolvido com foco em qualidade de código, performance e inclusão digital.*
