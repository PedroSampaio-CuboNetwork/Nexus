import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from ia import cuboIa

app = Flask(__name__)
CORS(app)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    pergunta = data["pergunta"]
    resposta = cuboIa(pergunta)
    return jsonify({"resposta": resposta})

if __name__ == "__main__":
    app.run(debug=True)