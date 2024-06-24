let perguntaInput = document.querySelector("#inputPesquisa");
let botaoPesquisar = document.querySelector("#botaoPesquisar");

perguntaInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        pesquisar();
    }
});

botaoPesquisar.addEventListener("click", function() {
    pesquisar();
});

function pesquisar() {
    let pergunta = perguntaInput.value;
    fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pergunta: pergunta
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na requisição");
        }
        return response.json();
    })
    .then(data => {
        if (data && data.resposta) {
            console.log(data.resposta)
            document.getElementById("ResultadoDaPesquisa").innerHTML = `<h4>A resposta para '${pergunta}' é:</h4><hr><p>${data.resposta}</p>`;
            perguntaInput.value = '';
        }
        else {
            throw new Error("Resposta inválida do servidor");
        }
    })
    .catch(error => {
        console.error("Erro ao pesquisar a resposta", error);
    });
    document.getElementById("#inputPesquisa") = '';
}