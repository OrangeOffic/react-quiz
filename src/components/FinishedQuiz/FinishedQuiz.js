import React from 'react';
import {Link} from 'react-router-dom';

import classes from './FinishedQuiz.module.sass';
import Button from '../UI/Button/Button';

const FinishedQuiz = ({quiz, results, retryQuiz}) => {

  const countSuccess = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total++
    }

    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>

      <h2>Вы завершили тест!</h2>

      <ul>
      {
        quiz.map((quizItem, index) => {

          const cls = [
            'fa',
            results[quizItem.id] === 'success' ? 'fa-check' : 'fa-times',
            classes[results[quizItem.id]]
          ]

          return (
            <li
              key={index}
            >
              <strong>{index + 1}. </strong> {quizItem.question} <i className={cls.join(' ')}></i>
            </li>
          )
        })
      }
      </ul>


      {/* <ul>
        <li><strong>1. </strong> How are you? <i className={'fa fa-times ' + classes.error}></i></li>
        <li><strong>2. </strong> How are you? <i className={'fa fa-check ' + classes.success}></i></li>
      </ul> */}

      <span>
        Правильно {countSuccess} из {quiz.length}
      </span>

      <div>
        <Button
          onClick={retryQuiz}
          type="primary"
        >
          Повторить
        </Button>

        <Link to='/'>
          <Button type="success" onClick={null}>
            К списку тестов
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz;