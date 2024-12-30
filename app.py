from flask import Flask, request, jsonify
from flask_cors import CORS
import textstat
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET', 'POST'])
def analyze():
    data = request.json
    text = data.get('text', '')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    sentence_count = textstat.sentence_count(text)
    
    word_count = len(text.split())
    
    flesch_reading_ease = textstat.flesch_reading_ease(text)
    flesch_kincaid_grade = textstat.flesch_kincaid_grade(text)
    
    blob = TextBlob(text)
    corrected_text = str(blob.correct())
    
    result = {
        'statistics': {
            'sentence_count': sentence_count,
            'word_count': word_count,
            'unique_word_count': len(set(text.split())),
            'average_word_length': sum(len(word) for word in text.split()) / word_count if word_count > 0 else 0
        },
        'readability': {
            'flesch_reading_ease': flesch_reading_ease,
            'flesch_kincaid_grade': flesch_kincaid_grade
        },
        'grammar_correction': corrected_text
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
