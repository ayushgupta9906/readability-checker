import React, { useState } from 'react';
import axios from 'axios';

function ReadabilityChecker() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setError('');
    setResult(null);
    try {
      // Send POST request to Flask backend
      const response = await axios.post('http://localhost:5000', { text });

      // If successful, update state with the result
      setResult(response.data);
    } catch (err) {
      // Log the error for debugging
      console.error("Error occurred:", err);
      setError('An error occurred while analyzing the text.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Readability Checker</h1>
      <textarea
        rows="10"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      ></textarea>
      <button
        onClick={handleAnalyze}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Analyze
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Results:</h2>
          <h3>Statistics:</h3>
          <p>Sentence Count: {result.statistics.sentence_count}</p>
          <p>Word Count: {result.statistics.word_count}</p>
          <p>Unique Word Count: {result.statistics.unique_word_count}</p>
          <p>Average Word Length: {result.statistics.average_word_length}</p>
          <h3>Readability:</h3>
          <p>Flesch Reading Ease: {result.readability.flesch_reading_ease}</p>
          <p>Flesch-Kincaid Grade Level: {result.readability.flesch_kincaid_grade}</p>
          <h3>Grammar Correction:</h3>
          <p>{result.grammar_correction}</p>
        </div>
      )}
    </div>
  );
}

export default ReadabilityChecker;
