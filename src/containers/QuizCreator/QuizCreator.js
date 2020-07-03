import React, {Component} from 'react';

import classes from './QuizCreator.module.sass';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import {createFormControls, validateControl, validateForm} from '../../form/form';
import Select from '../../components/UI/Select/Select';
import {connect} from 'react-redux';
import {createQuestion, createQuiz} from '../../store/actions/create';

const createOptionControl = (number) => {
  return createFormControls({
    label: 'Вариант ' + number,
    id: number,
    errorMessage: 'Почему это поле пустое'
  },
  {
    required: true
  })
}

class QuizCreator extends Component {

  state = {
    rightAnswerId: 1,
    isFormValid: false,
    formControls: {
      question: createFormControls({
        label: 'Вопрос',
        errorMessage: 'Это поле не может быть пустым'
      }, {
        required: true
      }),
      option1: createOptionControl(1),
      option2: createOptionControl(2),
      option3: createOptionControl(3),
      option4: createOptionControl(4)
    }
  }

  onSubmitHandler = event => {
    event.preventDefault();
  }

  onCreateQuizHandler = event => {
    event.preventDefault();    

    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: {
        question: createFormControls({
          label: 'Вопрос',
          errorMessage: 'Это поле не может быть пустым'
        }, {
          required: true
        }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
      }
    })

    this.props.createQuiz();
  }

  addQuestionHandler = () => {

    const quiz = this.props.quiz.concat();

    const index = quiz.length + 1;

    const {question, option1, option2, option3, option4} = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: +this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    quiz.push(questionItem);

    this.props.createQuestion(quiz);

    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: {
        question: createFormControls({
          label: 'Вопрос',
          errorMessage: 'Это поле не может быть пустым'
        }, {
          required: true
        }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
      }
    });

  }

  onChangeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
    
    formControls[controlName] = control;

    this.setState({
      isFormValid: validateForm(formControls),
      formControls
    })
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return (
        <React.Fragment key={index}>
          <Input 
            label={control.label}
            errorMessage={control.errorMessage}
            valid={control.valid}
            touched={control.touched}
            value={control.value}
            shouldValidate={!!control.validation}
            onChange={event => this.onChangeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      )
    })
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: event.target.value
    })
  }

  render() {

    const select = (<Select 
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={event => this.selectChangeHandler(event)}
        options={
          [
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4},
          ]
        }
      />)

    return (
      <div className={classes.QuizCreator}>

        <div className={classes.QuizCreatorBlock}>
          <h1>Создание теста</h1>

          <form onSubmit={this.onSubmitHandler}>

            {this.renderInputs()}

            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >Добавить вопрос</Button>

            <Button
              type="success"
              onClick={this.onCreateQuizHandler}
              disabled={this.props.quiz.length === 0}
            >Создать тест</Button>
          </form>

        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuestion: (quiz) => dispatch(createQuestion(quiz)),
    createQuiz: () => dispatch(createQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);