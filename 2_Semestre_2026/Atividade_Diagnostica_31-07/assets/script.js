// 1. Lógica do Modo Escuro (Dark Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Verifica se o usuário já havia escolhido um tema antes
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️ Modo Claro';
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Atualiza o texto do botão e salva a preferência do usuário
    if (body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = '☀️ Modo Claro';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggleBtn.textContent = '🌙 Modo Escuro';
        localStorage.setItem('theme', 'light');
    }
});

// 2. Lógica da Rolagem Suave
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Pega o destino pelo atributo href (ex: #sobre)
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        // Faz a rolagem suave até a seção
        window.scrollTo({
            top: targetSection.offsetTop - 50, // -50 dá um pequeno respiro no topo
            behavior: 'smooth'
        });
    });
});