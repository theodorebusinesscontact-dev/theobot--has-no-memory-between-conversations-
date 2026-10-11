from flask import Flask, request, jsonify
import os
from groq import Groq
from dotenv import load_dotenv
    

load_dotenv()
app = Flask(__name__)
client = Groq()

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    messages = data["messages"]
    response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=messages
    )
    reply = response.choices[0].message.content
    return jsonify({"reply": reply})

    

if __name__ == "__main__":
    app.run(debug=True)
