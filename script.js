document.addEventListener("DOMContentLoaded", () => {
    // Rolagem suave para os links do menu
    const links = document.querySelectorAll('nav a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const destino = document.querySelector(link.getAttribute("href"));

            if (destino) {
                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Efeito de destaque nas seções ao passar o mouse
    const secoes = document.querySelectorAll("section");

    secoes.forEach((secao) => {
        secao.addEventListener("mouseenter", () => {
            secao.style.transform = "translateY(-3px)";
            secao.style.transition = "transform 0.3s ease";
        });

        secao.addEventListener("mouseleave", () => {
            secao.style.transform = "translateY(0)";
        });
    });

    // Mensagem de interação no título
    const titulo = document.querySelector("header h1");

    if (titulo) {
        titulo.addEventListener("click", () => {
            alert(
                "Agro forte, futuro sustentável! 🌱\n" +
                "Produzir com responsabilidade é cuidar do futuro."
            );
        });
    }

    // Atualiza o ano do rodapé automaticamente
    const rodape = document.querySelector("footer p");

    if (rodape) {
        rodape.textContent = `Projeto AGRINHO ${new Date().getFullYear()}`;
    }
});
