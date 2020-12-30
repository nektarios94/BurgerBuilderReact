import React,{ Component } from 'react';

import classes from './Layout.module.css';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
 
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        //about the use of this.state in setState: due to the asynchronous nature of setState, doing for example 
    // this.setState ({showSideDrawer: !this.state.showSideDrawer}) can lead to unexpected outcomes
    // Passing an update function allows you to access the current state value inside the updater: 
        this.setState (prevState => {
            return {showSideDrawer: !prevState.showSideDrawer};
        } );
    }

    render () {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children} 
                </main>
            </Aux>
        )
    }
   
}

export default Layout;