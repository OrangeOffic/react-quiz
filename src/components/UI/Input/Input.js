import React from 'react';

import classes from './Input.module.sass';

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && touched && shouldValidate;
}

const Input = (props) => {

  const cls = [classes.Input];
  const type = props.type || 'text';
  const htmlFor = `${props.type}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={type}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />

      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }

    </div>
  )
}

export default Input;