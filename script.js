const userInput = document.querySelector("#botaoPesquisar");

function pesquisar(){
    let pesquisa = userInput.value;
    let resposta = createElement("section");
    resposta.innerHTML = `
    <h2>O resultados para ${pesquisa} são:</h2>
    <p>Pichau</p>`;
}