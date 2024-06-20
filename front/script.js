const pergunta = document.querySelector("#inputPesquisa");

function pesquisar(){
    let resposta = fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({pergunta: pergunta})
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('ResultadoDaPesquisa').innerHTML = data.resposta;
        })
        .catch(error => {
            console.error('Erro ao pesquisar a resposta', error);
        });
    return resposta
}