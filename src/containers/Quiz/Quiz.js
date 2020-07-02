import React, {Component} from 'react';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from 'axios';

import classes from './Quiz.module.sass';

export default class Quiz extends Component {

  state = {
    results: {},
    finishedQuiz: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`https://react-quiz-a70a7.firebaseio.com/quizes/${this.props.match.params.id}.json`);

      const quiz = response.data;

      this.setState({
        quiz,
        loading: false
      })
    } catch (e){
      console.log(e)
    }
  }

  retryQuiz = () => {
    this.setState({
      results: {},
      finishedQuiz: false,
      activeQuestion: 0,
      answerState: null
    })
  }

  onAnswerClick = (answerId) => {

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]

      if (this.state.answerState[key] === 'success') {
        return
      }
    }
  

    if (answerId === question.rightAnswerId) {

      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      });

      const timeout = window.setTimeout(() => {

        if (this.isQuizFinished()) {
          this.setState({
            finishedQuiz: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeout);
      }, 1000)

    } else {
      
      results[question.id] = 'error';

      this.setState({
        answerState: {[answerId]: 'error'},
        results
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

          {
            this.state.loading
            ? <h1>Загрузка сука</h1>
            : this.state.finishedQuiz
              ? <FinishedQuiz 
                  results={this.state.results}
                  quiz={this.state.quiz}
                  retryQuiz={this.retryQuiz}
                />
              : <ActiveQuiz 
                  activeQuestion={this.state.activeQuestion + 1}
                  state={this.state.answerState}
                  answers={this.state.quiz[this.state.activeQuestion].answers} 
                  question={this.state.quiz[this.state.activeQuestion].question}
                  countQuestions={this.state.quiz.length}
                  onAnswerClick={this.onAnswerClick}
                />
          }

        </div>
      </div>
    )
  }
}