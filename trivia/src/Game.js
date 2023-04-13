import './App.css';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import {decode} from 'html-entities';

function Game( {apiLink, numberOfQuestions} ) {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionsData, setQuestionsData] = useState(null)
  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log(apiLink)
        const response = await fetch((apiLink));
        const data = await response.json();
        setQuestionsData(data.results);
      }
      catch(error) {
        console.log(error);
      }
    }
    fetchQuestions();
  }, [apiLink])

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

  if(currentQuestion > numberOfQuestions) {
    return (
      <React.Fragment>
        <h2 className='header'>Game Over!</h2>
        <p id={"score"}>Your final score was {score}/{numberOfQuestions}</p>
        <Button id={"play_again"} variant='contained' href="./">Play Again?</Button>
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        <Question question={(currentQuestion) + ". " + currentQuestionData.question} correct_answer={currentQuestionData.correct_answer} incorrect_answers={currentQuestionData.incorrect_answers} onAnswerClick={(answer) => handleAnswerClick(answer)} isAnswerShown={correctAnswerShown}></Question>
        <NextButton text={"NEXT"} isVisible={correctAnswerShown} onNextClick={handleNextClick}></NextButton>
      </React.Fragment>
    );
  }
}

function Question({ question, correct_answer, incorrect_answers, onAnswerClick, isAnswerShown }) {
  return (
    <React.Fragment>
      <h3 className="Question">{decode(question)}</h3>
      <Answers correct_answer={correct_answer} incorrect_answers={incorrect_answers} onAnswerClick={onAnswerClick} isAnswerShown={isAnswerShown}></Answers>
    </React.Fragment>
  );
}

function Answers({correct_answer, incorrect_answers, onAnswerClick, isAnswerShown}) {
    const [randOrder, setRandOrder] = useState([]);

    const answers = [];
    answers.push(correct_answer);
    answers.push(...incorrect_answers);

    if(!randOrder.includes(correct_answer)) {
      const shuffledAnswers = answers.sort((a, b) => 0.5 - Math.random());
      setRandOrder(shuffledAnswers);
    }
    if(!randOrder.includes(correct_answer)) return;

    const items = randOrder.map(answer => {
        if(answer === correct_answer && isAnswerShown) return <Button key={answer} id={"correct_answer"} variant='contained' onClick={() => onAnswerClick(answer)}>{decode(answer)}</Button>
        else if (isAnswerShown) return <Button key={answer} id={"incorrect_answer"} variant='contained' onClick={() => onAnswerClick(answer)}>{decode(answer)}</Button>
        else return <Button key={answer} id={"answer_choice"} variant='contained' onClick={() => onAnswerClick(answer)}>{decode(answer)}</Button>
    });

    return <div className="answer_choices">
        {items}
    </div>
}

function NextButton({ text, isVisible, onNextClick }) {
  if(!isVisible) return;
  else {
    return <Button id={"next_button"} variant='contained' onClick={() => onNextClick()}>{text}</Button>
  }
}

export default Game;