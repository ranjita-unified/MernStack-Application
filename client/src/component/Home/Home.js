import Login from './Login';
import Signup from './Signup';

import { Component } from '../Common/StyledComponent';
import { useDataContext } from '../../provider/context';
import { ActionTypes } from '../../enums';

const Home = () => {
    const {
        state,
        dispatchAction,
    } = useDataContext();
    
    const showLogin = (isLoginClicked) => {
        if(isLoginClicked)
        dispatchAction(ActionTypes.setLogin,true)
    }

    const showSignup = (isSignUpClicked) => {
        if(isSignUpClicked)
        dispatchAction(ActionTypes.setLogin,false)
    }
    return(
        <Component>
            {(!state.isLogin && <Signup displayLogin={(isLoginClicked) =>showLogin(isLoginClicked)}/>)}
            {(state.isLogin && <Login displaySignup={(isSignUpClicked) =>showSignup(isSignUpClicked)}/>)}
        </Component>
    )
}
export default Home