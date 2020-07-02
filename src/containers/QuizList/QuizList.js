import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchQuizes} from '../../store/actions/quiz'

import classes from './QuizList.module.sass';

class QuizList extends Component {

  renderQuizList = () => {
    return this.props.quizes.map(quiz => {
      return (
        <li 
          key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  componentDidMount() {
    this.props.fetchQuizes()
  }

  render() {
    return (
      <div className={classes.QuizList}>

        <div className={classes.QuizBlock}>
          <h1>Список тестов</h1>

          <ul>
            {this.renderQuizList()}
          </ul>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizList);