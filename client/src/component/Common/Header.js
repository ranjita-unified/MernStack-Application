import { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom"

import {HeaderComponent,HeaderContainer} from './StyledComponent';

import { useLogoutUser,useVerifyToken } from '../../module/users/hooks';

const Header = () => {
    const navigate = useNavigate();
    
    //verify token
    const {refetch:refetchVerifyToken, isError } =  useVerifyToken();

    useEffect(()=>{
        refetchVerifyToken();
        if(!sessionStorage.getItem('accessToken') && !sessionStorage.getItem('refreshToken')) {
            navigate("/");
        }
        
    },[navigate,refetchVerifyToken]);

    if(isError) {
        sessionStorage.clear();
        window.location.href = '/';
    }

    const {refetch:refetchLogout, isError: isLogoutError, error:logOutError } =  useLogoutUser();

    const logoutUser = async(e) => {
        e.preventDefault();
        if(sessionStorage.getItem('accessToken') && sessionStorage.getItem('refreshToken')) 
        {            
            await refetchLogout();
            sessionStorage.clear();
            window.location.href = '/';
        }
        else {
            sessionStorage.clear();
            window.location.href = '/';
        } 
    }

    if(isLogoutError) {
        if(logOutError.status === 401) {
            sessionStorage.clear();
            window.location.href = '/';
        }
    }
    const userProfileData = sessionStorage.getItem('userProfile')?JSON.parse(sessionStorage.getItem('userProfile')):'';
    const userRole = userProfileData?.role;
    
    return (
        <HeaderComponent>
            <HeaderContainer>
                <Link to="/myaccount">MY ACCOUNT</Link>
                {userRole && userRole==='admin' && <Link to="/editors">EDITORS</Link>}
                <Link onClick={(e)=>logoutUser(e)}>LOGOUT</Link>
            </HeaderContainer>
        </HeaderComponent>
    )
}

export default Header