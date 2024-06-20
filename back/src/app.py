from flask import Flask, request, jsonify, render_template
import json
import requests
import google.generativeai as genai

url = "https://raw.githubusercontent.com/PedroSampaio-CuboNetwork/pokemon-json/main/pokemon.json"

GOOGLE_API_KEY = "AIzaSyDeiLzmpeH_stfacXFAq3wOzQwAO9CzLGM"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

histPerguntas = []

def cuboIa(question):
    histPerguntas.append(question)
    if len(histPerguntas) > 5:
        histPerguntas.pop(0)

    contexto = (f"Eu tenho um banco de dados dos 50 principais Pokémon da 1ª geração no seguinte JSON:\n\n"
                f"{json.dumps(pokemons_data['pokemons'], indent=2)}\n\n"
                f"Use este banco de dados para responder às perguntas relacionadas aos Pokémons. "
                f"Se a pergunta não estiver relacionada aos Pokémons, use seu conhecimento geral para responder.\n\n"
                f"Histórico de perguntas anteriores:\n{histPerguntas}\n\n"
                f"Pergunta atual: {question}")

    response = model.generate_content(contexto)
    resposta = response.text
    return resposta


response = requests.get(url)
pokemons_data = json.loads(response.text)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    pergunta = data['pergunta']
    resposta = cuboIa(pergunta)
    return jsonify(f'A resposta para {pergunta} é: {resposta}')

if __name__ == '__main__':
    app.run(debug=True)

