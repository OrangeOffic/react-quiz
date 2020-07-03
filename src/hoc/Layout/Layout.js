import React, {Component} from 'react';

import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

import classes from './Layout.module.sass';
import { connect } from 'react-redux';

class Layout extends Component {

  state = {
    menu: false
  }

  onToggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  onMenuClose = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <div className={classes.Layout}>

        <Drawer 
          isOpen={this.state.menu}
          onClose={this.onMenuClose}
          isAuthenticated={this.props.isAuthenticated}
        />

        <MenuToggle 
          onToggle={this.onToggleMenuHandler}
          isOpen={this.state.menu}
        />

        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout);