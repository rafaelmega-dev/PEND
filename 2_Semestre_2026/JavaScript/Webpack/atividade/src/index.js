// index.js

import { gerarSaudacao } from './saudacao.js';

// Espera o DOM carregar para buscar os elementos da tela
document.addEventListener('DOMContentLoaded', () => {
  const inputNome = document.getElementById('input-nome');
  const botaoSaudar = document.getElementById('btn-saudar');
  const divResultado = document.getElementById('resultado');

  // Adiciona um evento de clique no botão
  botaoSaudar.addEventListener('click', () => {
    const nomeDigitado = inputNome.value; // Pega o que o usuário digitou
    const mensagem = gerarSaudacao(nomeDigitado); // Usa a função importada
    
    // Mostra o resultado na tela
    divResultado.innerHTML = `<h2>${mensagem}</h2>`;
  });
});