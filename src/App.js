import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Auth from './containers/Auth/Auth';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/quiz-creator' component={QuizCreator}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/Auth' component={Auth}/>
        <Route path='/' component={QuizList}/>
      </Switch>
    </Layout>
  );
}

export default App;
