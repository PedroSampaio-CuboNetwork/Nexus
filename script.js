const userInput = document.querySelector("#botaoPesquisar");
const lugarResultado = document.querySelector("#ResultadoDaPesquisa");

function pesquisar(){
    userInput.innerHTML = "";
    let pesquisa = userInput.value;
    lugarResultado = document.createElement("nav");
    lugarResultado.innerHTML = `
    <h2>O resultados para "${pesquisa}" são:</h2>
    <p>Pichau</p>`;

}