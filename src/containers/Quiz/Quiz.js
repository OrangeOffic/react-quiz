import React, {Component} from 'react';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import {connect} from 'react-redux';
import {fetchQuizById, retryQuiz, onAnswerClick} from '../../store/actions/quiz';

import classes from './Quiz.module.sass';

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>

          <h1>Ответьте на все вопросы!</h1>

          {
            this.props.loading
            ? <h1>Загрузка сука</h1>
            : this.props.finishedQuiz
              ? <FinishedQuiz 
                  results={this.props.results}
                  quiz={this.props.quiz}
                  retryQuiz={this.props.retryQuiz}
                />
              : <ActiveQuiz 
                  activeQuestion={this.props.activeQuestion + 1}
                  state={this.props.answerState}
                  answers={this.props.quiz[this.props.activeQuestion].answers} 
                  question={this.props.quiz[this.props.activeQuestion].question}
                  countQuestions={this.props.quiz.length}
                  onAnswerClick={this.props.onAnswerClick}
                />
          }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    finishedQuiz: state.quiz.finishedQuiz,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    retryQuiz: () => dispatch(retryQuiz()),
    onAnswerClick: (answerId) => dispatch(onAnswerClick(answerId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);