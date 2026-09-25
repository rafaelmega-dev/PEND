async function buscarCep() {

    const cepInput = document.getElementById('inputCep').value.replace(/\D/g, '');
    

    if (cepInput.length !== 8) {
        document.getElementById('aviso').innerHTML = 'CEP inválido. Por favor, insira um CEP válido.';
        return;
    } 

    try {
        const resposta = await fetch(`https://brasilapi.com.br/api/cep/v1/${cepInput}`);

        if (!resposta.ok) {
            throw new Error('CEP não encontrado.');
        }
        else {
            document.getElementById('aviso').innerHTML = '';
        }

        const dados = await resposta.json();

        document.getElementById('rua').textContent = dados.street || 'Não cadastrada';
        document.getElementById('bairro').textContent = dados.neighborhood || 'Não cadastrado';
        document.getElementById('cidade').textContent = dados.city;
        document.getElementById('estado').textContent = dados.state;
    }
    catch (error) {
        document.getElementById('aviso').innerHTML = error.message;
    }
}