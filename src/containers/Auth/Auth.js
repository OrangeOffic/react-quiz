import React, {Component} from 'react';

import classes from './Auth.module.sass';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import axios from 'axios';

export default class Auth extends Component {


  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }


  onSubmitHandler = event => {
    event.preventDefault();
  }

  registerHandler = async () => {

    const AuthObject = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqkLg9y7DXKsf3IE_nHCA_RGq5-DXSIzI', AuthObject);

      console.log(response.data)
    } catch (e) {
      console.log(e)
    }

  }

  loginHandler = async () => {
    const AuthObject = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqkLg9y7DXKsf3IE_nHCA_RGq5-DXSIzI', AuthObject);

      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  validateControl(value, validation) {

    if (!validation) {
      return true
    }
    
    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {

    const formControls = { ...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, isFormValid
    })

  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {

      const control = this.state.formControls[controlName];

      return (
        <Input
          key={control + index}
          value={control.value}
          type={control.type}
          label={control.label}
          errorMessage={control.errorMessage}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div className={classes.AuthBlock}>
          
          <h1>Авторизация</h1>

          <form onSubmit={this.onSubmitHandler}>

            {
              this.renderInputs()
            }

            <Button 
              type="success" 
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >Войти</Button>
            <Button 
              type="primary" 
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >Зарегистрироваться</Button>

          </form>

        </div>
      </div>
    )
  }
}