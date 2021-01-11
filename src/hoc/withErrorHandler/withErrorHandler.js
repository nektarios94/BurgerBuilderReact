// This withErrorHandler method can be wrapped around multiple components, which is the idea of it. The interceptors we are using in the
// componentDidMount cycle hook will probably be useless when wrapping other components. So we should remove those interceptors when the component
// gets unmounted, so when this instance of this wrapper component isn't needed anymore. For that we use componentWillUnmount

import React,{ Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = ( WrappedComponent, axios ) => {
 
return class extends Component {
    state = {
        error: null
    }
    


    componentWillMount () { // μπορώ να χρησιμοποιήσω τον constructor,αναφέρεται πως η componentWillMount ισως δεν υποστηριζεται μελλοντικα
                            //οι componentWillMount και ο  constructor καλουνται πριν  κανουμε render των child components
                            //στοχος των εντολων αυτων ειναι να κανουμε register τους interceptors πριν γινει render των child components
        this.reqInterceptor = axios.interceptors.request.use(req => { //
            this.setState({error: null});
            return req;
        });
        this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            this.setState({error: error}); // we assign the error object that we get from Firebase to the state's property 'error'
        });
    }

    componentWillUnmount () { // The reason we want to have a way to remove the interceptors is because we are going to use withErrorHandler to wrap othe components and we want the old ones (in this case the ones used with the BurgerBuilder) to be gone
        axios.interceptors.request.eject(this.reqInterceptor); // Using the refrences to the interceptors we created in componentDidMount
        axios.interceptors.response.eject(this.resInterceptor); // eject requires the refrence to the interceptor
    }                                                           // now we should remove the interceptors preventing memory leaks and potentially other implications or errors

    errorConfirmedHandler = () => {
        this.setState({error: null});
    }

    render () {
        return (
            <Aux>
               <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                   {this.state.error ?this.state.error.message : null} {/* there will be a message property in the 'error' object returned by Firebase */}
               </Modal>
               <WrappedComponent {...this.props} />
           </Aux>
        );
    }
}    
//    Functional Component Approach
//
//    return (props) => {
//        return (
//            <Aux>
//                <Modal show>
//                    Something didn't work!
//                </Modal>
//                <WrappedComponent {...props} />
//            </Aux>
//        );
//    }
}

export default withErrorHandler;