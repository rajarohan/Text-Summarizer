from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from googletrans import Translator

app = Flask(__name__)
CORS(app)

translator = Translator()
summarizer = pipeline("summarization")

@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.json
    text = data.get("text", "")
    language = data.get("language", "en")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    if language != "en":
        translated_text = translator.translate(text, src=language, dest="en").text
    else:
        translated_text = text

    summary = summarizer(translated_text, max_length=100, min_length=10, do_sample=False)[0]["summary_text"]

    if language != "en":
        summary = translator.translate(summary, src="en", dest=language).text

    return jsonify({"summary": summary})

if __name__ == '__main__':
    from os import environ
    app.run(host='0.0.0.0', port=environ.get("PORT", 5000))