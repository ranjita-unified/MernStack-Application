import { TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { useEffect } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import Alert from "react-bootstrap/Alert";

import {
    CustomForm,
    ErrorMessage,
    LoginButton,
    PasswordField,
    SignupButton,
    Text,
    Wrapper
} from '../Common/StyledComponent';
import LoadingOverlay from '../Common/Loader';

import { useDataContext } from '../../provider/context';
import { useLoginUser } from '../../module/users/hooks';
import { ActionTypes, ErrorCodes, Messages } from '../../enums';


const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        if(accessToken) {
            navigate("/myaccount",{ replace: true });
        }
    },[navigate]);

    const {
        state,
        dispatchAction,
    } = useDataContext();

    const loginMethods = useForm({
        defaultValues: {
          email: "",
          password: ""
        },
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm();

    const {
        data: loggedInData, 
        isFetching, 
        refetch,
        isError,
        isSuccess, 
        error } =  useLoginUser(state.loginUserArr);

    const onSubmit = async(data) => {
        const loginData = [];
        loginData.loginUserArr = data
        loginData.isUserAuthenticated = true;
        await dispatchAction(ActionTypes.setLoginData,loginData)
        refetch();
        reset('', {
            keepValues: false,
        })
    }
    
    if(isSuccess) {
        const userProfile = {
            name: loggedInData.name,
            email: loggedInData.email,
            role: loggedInData.role,
            profileImage: loggedInData.profileImage
        };
        
        sessionStorage.setItem('accessToken', loggedInData.accessToken);
        sessionStorage.setItem('refreshToken', loggedInData.refreshToken);
        sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
        return <Navigate to="/myaccount"/>
    }

    const errorCode = error?.data?.code || error?.status;
    const errorMessage = errorCode?ErrorCodes[errorCode]:ErrorCodes['default'];
    
    return (
        <>
            {
                isFetching ? (
                    <LoadingOverlay isLoading={isFetching}/>
                    ) : (
                    <FormProvider {...loginMethods} >
                        <CustomForm onSubmit={handleSubmit(onSubmit)}>
                            <Wrapper>
                                {isSuccess && <Alert variant="success">{Messages.successLogin}</Alert>}
                                {isError && <Alert variant="danger">{errorMessage}</Alert>}

                                <TextField variant='standard' label="Enter Email" name='email' id="email" {...register("email")} {...register("email", {
                                        required: 'Email is required.',
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: 'Email is not valid.',
                                        }
                                })}/>
                                {errors?.email?.message &&
                                    <ErrorMessage className="errorMsg">{errors.email.message}</ErrorMessage>
                                }

                                <PasswordField variant='standard' label="Enter Password" name="password" id="password" type='password'  {...register("password", {
                                            required: 'Password is required.',
                                            minLength : {
                                                value: 8,
                                                message: 'Minimum length should be 8 characters'
                                            }
                                })}/>
                                {errors?.password?.message &&
                                    <ErrorMessage className="errorMsg">{errors.password.message}</ErrorMessage>
                                }
                                
                                <LoginButton variant='contained' type="submit">Sign In</LoginButton>
                                <Text style={{ textAlign: 'center'}}>OR</Text>
                                <SignupButton onClick={()=>dispatchAction(ActionTypes.setLogin,false)}>Create an account</SignupButton>
                            </Wrapper>
                        </CustomForm> 
                    </FormProvider>
                )
            }
       </> 
    )
}

export default Login