const inputPesquisa = document.querySelector("#inputPesquisa");
const lugarResultado = document.querySelector("#ResultadoDaPesquisa");
const poke = ["Pichau", "Bulba", "Charchar", "Turgue"];

function pesquisar() {
    lugarResultado.innerHTML = '';
    let pesquisa = inputPesquisa.value.toLowerCase(); 
    let encontrado = false; 

    for (const pokemon of poke) {
        if (pesquisa === pokemon.toLowerCase()) {
            let resultado = document.createElement("div");
            resultado.innerHTML = `
                <h2>O resultado para "${pesquisa}" é:</h2>
                <p>${pesquisa} - Poke inicial Indigo</p>
            `;
            lugarResultado.appendChild(resultado);
            encontrado = true; 
            break; 
        }
    }

    if (!encontrado) {
        let resultado = document.createElement("div");
        resultado.innerHTML = `
            <h2>Nenhum resultado encontrado para "${pesquisa}".</h2>
        `;
        lugarResultado.appendChild(resultado);
    }
}