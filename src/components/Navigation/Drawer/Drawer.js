import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import classes from './Drawer.module.sass';
import Backdrop from '../../UI/Backdrop/Backdrop';


class Drawer extends Component {

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <Link 
            to={link.url}
            exact={link.exact}
            onClick={this.props.onClose}
          >{link.label}</Link>
        </li>
      )
    })
  }

  
  render() {

    const cls = [
      classes.Drawer
    ]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    const links = [
      {url: '/', label: 'Список тестов', exact: "true"},
    ]

    if (this.props.isAuthenticated) {
      links.push({url: '/quiz-creator', label: 'Создать тест', exact: "false"});
      links.push({url: '/logout', label: 'Выйти', exact: "false"})
    } else {
      links.push({url: '/auth', label: 'Авторизация', exact: "false"})
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>

        {this.props.isOpen ? <Backdrop onClose={this.props.onClose}/> : null}


      </React.Fragment>
    )
  }

}

export default Drawer;