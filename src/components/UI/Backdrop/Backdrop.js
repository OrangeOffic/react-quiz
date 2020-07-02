import React from 'react';

import classes from './Backdrop.module.sass';

const Backdrop = (props) => <div className={classes.Backdrop} onClick={props.onClose}></div>

export default Backdrop;