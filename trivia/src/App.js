import './App.css';
import React, { useState } from 'react';
import Home from './Home.js'
import Game from './Game.js'

function App() {
  const [showHome, setShowHome] = useState(true);
  const [apiLink, setApiLink] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);

  const handleLinkChange = (link) => {
    setApiLink(link);
  };

  const handleNumberChange = (num) => {
    setNumQuestions(num);
  }

  if(showHome) {
    return (
      <Home link={(link => handleLinkChange(link))} changeView={(value) => setShowHome(value)} changeNumQuestions={(num) => handleNumberChange(num)}></Home>
    )
  }
  else {
    return (
      <Game apiLink={apiLink} numberOfQuestions={numQuestions}></Game>
    )
  }
}

export default App;