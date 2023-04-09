import './App.css';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
//API URL: https://opentdb.com/api.php?amount=20

const entities = require("entities");
const NUM_QUESTIONS = 3;

function Game() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionsData, setQuestionsData] = useState(null)
  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(("https://opentdb.com/api.php?amount=" + NUM_QUESTIONS));
        const data = await response.json();
        setQuestionsData(data.results);
      }
      catch(error) {
        console.log(error);
      }
    }
    fetchQuestions();
  }, []);


  if(!questionsData) return;
  let currentQuestionData = questionsData[currentQuestion - 1];

  const handleAnswerClick = (answer) => {
    if(correctAnswerShown) return;

    if(answer === currentQuestionData.correct_answer) {
      setScore(score + 1);
    }

    setCorrectAnswerShown(true);
  }

  const handleNextClick = () => {
    setCorrectAnswerShown(false);
    setCurrentQuestion(currentQuestion + 1);
  }

  if(currentQuestion > NUM_QUESTIONS) {
    return (
      <React.Fragment>
        <h2>Game Over!</h2>
        <p>You final score was {score}/{NUM_QUESTIONS}</p>
        <Button href="./">Play Again?</Button>
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        <Question question={(currentQuestion) + ". " + currentQuestionData.question} correct_answer={currentQuestionData.correct_answer} incorrect_answers={currentQuestionData.incorrect_answers} onAnswerClick={(answer) => handleAnswerClick(answer)}></Question>
        <NextButton text={"NEXT"} isVisible={correctAnswerShown} onNextClick={handleNextClick}></NextButton>
      </React.Fragment>
    );
  }
}

function Question({ question, correct_answer, incorrect_answers, onAnswerClick }) {
  return (
    <React.Fragment>
      <h3 className="Question">{entities.decode(question)}</h3>
      <div>
        <Answers correct_answer={correct_answer} incorrect_answers={incorrect_answers} onAnswerClick={onAnswerClick}></Answers>
      </div>
    </React.Fragment>
  );
}

function Answers({correct_answer, incorrect_answers, onAnswerClick}) {
    const [rand, setRand] = useState(null)
    if(!rand) setRand(Math.random());

    const answers = [];
    answers.push(correct_answer);
    answers.push(...incorrect_answers);

    const shuffledAnswers = answers.sort((a, b) => 0.5 -rand);

    const items = shuffledAnswers.map(answer => {
        return <Button key={answer} variant='contained' onClick={() => onAnswerClick(answer)}>{entities.decode(answer)}</Button>
    });

    return <div className="answer_choices">
        {items}
    </div>
}

function NextButton({ text, isVisible, onNextClick }) {
  if(!isVisible) return;
  else {
    return <Button variant='contained' onClick={() => onNextClick()}>{text}</Button>
  }
}

export default Game;