from flask import Flask, request, jsonify
from transformers import pipeline
from googletrans import Translator

app = Flask(__name__)

# Load summarization pipeline
summarizer = pipeline("summarization")

# Initialize translator
translator = Translator()

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.json
    text = data.get("text")
    language = data.get("language", "en")  # Default to English

    # Translate non-English text to English
    if language != "en":
        try:
            translated_text = translator.translate(text, src=language, dest="en").text
            text = translated_text
        except Exception as e:
            return jsonify({"error": "Translation failed", "details": str(e)}), 400

    # Summarize the text
    try:
        summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
        return jsonify({"summary": summary[0]["summary_text"]})
    except Exception as e:
        return jsonify({"error": "Summarization failed", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)