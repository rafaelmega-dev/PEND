// saudacao.js

export function gerarSaudacao(nome) {
  if (!nome) {
    return "Olá! Bom dia!";
  }
  return `Olá, ${nome}! Bom dia!`;
}