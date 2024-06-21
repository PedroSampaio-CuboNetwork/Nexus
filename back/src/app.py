import json
from flask import Flask, request, jsonify
from ia import cuboIa

app = Flask(__name__)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.route('/ask', methods=['POST', 'GET'])
def ask():
    data = request.get_json()
    pergunta = data['pergunta']
    resposta = cuboIa(pergunta)
    data = {
        'resposta': resposta
    }
    json_string = json.dumps(data)
    return json_string

if __name__ == '__main__':
    app.run(debug=True)