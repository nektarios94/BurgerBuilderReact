import React from 'react';
import classes from './Menu.module.css';

const menu = (props) => {
    return (
        
            <button 
                className={classes.Menu}
                onClick={props.clicked} >
                <div className={classes.Bar}></div>
                <div className={classes.Bar}></div>
                <div className={classes.Bar}></div>
            </button>
        
    );
}

export default menu;