import React, {Component} from 'react';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

import classes from './Quiz.module.sass';

export default class Quiz extends Component {

  state = {
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'Монитор какой фирмы ты используешь?',
        rightAnswerId: 2,
        answers: [
          {text: 'Samsung', id: 1},
          {text: 'LG', id: 2},
          {text: 'Asus', id: 3},
          {text: 'Xiaomi', id: 4},
        ]
      },
      {
        question: 'Дата октяборьской революции?',
        rightAnswerId: 1,
        answers: [
          {text: '1917', id: 1},
          {text: '2012', id: 2},
          {text: '1812', id: 3},
          {text: '1907', id: 4},
        ]
      }
    ]
  }

  onAnswerClick = (answerId) => {

    const question = this.state.quiz[this.state.activeQuestion];

    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]

      if (this.state.answerState[key] === 'success') {
        return
      }
    }
  

    if (answerId === question.rightAnswerId) {

      this.setState({
        answerState: {[answerId]: 'success'}
      });

      const timeout = window.setTimeout(() => {

        if (this.isQuizFinished()) {
          console.log('FINISHED');
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeout);
      }, 1000)

    } else {
      this.setState({
        answerState: {[answerId]: 'error'}
      })
    }

  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>

          <h1>Ответьте на все вопросы!</h1>

          <ActiveQuiz 
            activeQuestion={this.state.activeQuestion + 1}
            state={this.state.answerState}
            answers={this.state.quiz[this.state.activeQuestion].answers} 
            question={this.state.quiz[this.state.activeQuestion].question}
            countQuestions={this.state.quiz.length}
            onAnswerClick={this.onAnswerClick}
          />

        </div>
      </div>
    )
  }
}