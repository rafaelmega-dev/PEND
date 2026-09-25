const API_KEY = '69bf3a4a1630aab5f7b3f9f512c05868';

function obterCategoria() {
    const caminho = window.location.pathname.toLowerCase();
    if (caminho.includes('tecnologia')) return 'technology';
    if (caminho.includes('esportes')) return 'sports';
    if (caminho.includes('economia')) return 'business';
    return 'general';
}

async function carregarNoticias() {
    const cat = obterCategoria();
    const destaqueContainer = document.querySelector('.noticia-destaque');
    const noticiasContainer = document.querySelector('.noticias');

    if (destaqueContainer) destaqueContainer.innerHTML = '<p>Buscando notícias ao vivo...</p>';
    if (noticiasContainer) noticiasContainer.innerHTML = '';

    try {
        const url = `https://gnews.io/api/v4/top-headlines?category=${cat}&lang=pt&country=br&max=7&apikey=${API_KEY}`;
        
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.articles && dados.articles.length > 0) {
            const principal = dados.articles[0];

            if (destaqueContainer) {
                destaqueContainer.innerHTML = `
                    <img src="${principal.image || 'assets/selecao-brasileira.webp'}" alt="${principal.title}">
                    <h2><a href="${principal.url}" target="_blank" style="text-decoration:none; color:inherit;">${principal.title}</a></h2>
                    <p>${principal.description || ''}</p>
                `;
            }

            if (noticiasContainer) {
                const secundarias = dados.articles.slice(1);
                noticiasContainer.innerHTML = secundarias.map(item => `
                    <div class="noticia artigo-noticia">
                        <img src="${item.image || 'assets/titulos.webp'}" alt="${item.title}">
                        <h2><a href="${item.url}" target="_blank" style="text-decoration:none; color:inherit;">${item.title}</a></h2>
                        <p>${item.description || ''}</p>
                    </div>
                `).join('');
            }
        } else {
            if (destaqueContainer) destaqueContainer.innerHTML = '<p>Nenhuma notícia encontrada no momento.</p>';
        }
    } catch (erro) {
        if (destaqueContainer) destaqueContainer.innerHTML = '<p>Erro ao conectar com o serviço de notícias.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('ul.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('ativo');
        });
    }

    carregarNoticias();
});