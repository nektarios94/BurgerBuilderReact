import { logDOM } from "@testing-library/react";

import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png'; // we make Webpack aware of the fact that we are using this image, that way Webpack will handle this image with a special plugins or a special module
import classes from './Logo.module.css';
const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo /* this refers to a string in the end, to the path where Webpack stored the optimized and copied image */}
        alt='MyBurger'/> 
    </div>
);

export default logo;