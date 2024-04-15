import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    fetchAdvice();
  }, []); // empty dependency array to run the effect only once on mount

  const fetchAdvice = () => {
    axios.get('https://api.adviceslip.com/advice', {
      params: {
        _cacheBuster: new Date().getTime() // Add a cache buster parameter
      }
    })
    .then((response) => {
      const { advice } = response.data.slip;
      setAdvice(advice);
    })
    .catch((error) => {
      console.error('Error fetching advice:', error);
    });
  };
  
  

  return (
    <div className="app">
      <div className="card">
        <h1 className="heading">{advice}</h1>
        <button className="button" onClick={fetchAdvice}>
          <span>GIVE ME ADVICE!</span>
        </button>
      </div>
    </div>
  );
}

export default App;
