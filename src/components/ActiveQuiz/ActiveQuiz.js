import React from 'react';

import AnswersList from './AnswersList/AnswersList';

import classes from './ActiveQuiz.module.sass';

const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>

      <span className={classes.ActiveQuizQuestion}>
        <strong>{props.activeQuestion}. </strong>
        {props.question}
        <span> - {props.activeQuestion} из {props.countQuestions}</span>
      </span>

      <AnswersList 
      state={props.state}
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
      />

    </div>
  )
}

export default ActiveQuiz;
