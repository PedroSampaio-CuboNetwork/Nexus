let perguntaInput = document.querySelector("#inputPesquisa");
console.log
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
            document.getElementById("ResultadoDaPesquisa").innerHTML = data.resposta;
        }
        else {
            throw new Error("Resposta inválida do servidor");
        }
    })
    .catch(error => {
        console.error("Erro ao pesquisar a resposta", error);
    });
}