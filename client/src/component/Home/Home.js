import Login from './Login';
import Signup from './Signup';

import { Component } from '../Common/StyledComponent';
import { useDataContext } from '../../provider/context';

const Home = () => {
    const {
        state
    } = useDataContext();
    return(
        <Component>
            {(!state.isLogin && <Signup/>)}
            {(state.isLogin && <Login/>)}
        </Component>
    )
}
export default Home