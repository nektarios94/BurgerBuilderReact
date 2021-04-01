import React from 'react';
import classes from './Toolbar.module.css'; // this imports a couple of strings, dynamicly created css class names which are adjusted to be scoped with this component
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
//import Menu from '../Menu/Menu';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import SideDrawer from '../SideDrawer/SideDrawer';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        { /* <Menu clicked={props.drawerToggleClicked}/> */ /* το δημιουργησα στην ασκηση και ηταν σωστο. Ο Maximilian χρησιμοποιησε το SideDrawer(απο κατω) ως λυση */}
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);


export default toolbar;