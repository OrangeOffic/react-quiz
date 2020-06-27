import React from 'react';

import classes from './AnswerItem.module.sass';

const AnswerItem = props => {

  const {onAnswerClick, answer, state} = props;

  const cls = [classes.AnswerItem];


  if (state) {
    cls.push(classes[state])
  }


  return (
    <li 
      className={cls.join(' ')}
      onClick={onAnswerClick.bind(this, answer.id)}
      state={state}
    >{answer.text}</li>
  )
}

export default AnswerItem;