import json
import requests
import google.generativeai as genai

url = "https://raw.githubusercontent.com/PedroSampaio-CuboNetwork/pokemon-json/main/pokemon.json"

GOOGLE_API_KEY = "AIzaSyDeiLzmpeH_stfacXFAq3wOzQwAO9CzLGM"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

response = requests.get(url)
pokemons_data = json.loads(response.text)

histPerguntas = []

while True:
    question = input("Pergunta do usuário sobre a base de dados (ou digite 'sair' para encerrar):\n-> ")
    if question == "sair":
        print("Obrigado pela preferência")
        break

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

    print(response.text + "\n")