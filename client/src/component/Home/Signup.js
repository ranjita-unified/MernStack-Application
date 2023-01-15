import { TextField,RadioGroup,FormControl,FormControlLabel,Radio } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FormProvider, useForm  } from "react-hook-form";
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
import { useAddUser } from '../../module/users/hooks';
import { ActionTypes, Messages, ErrorCodes } from '../../enums';


const SignUp = ({displayLogin}) => {
    const {
        state,
        dispatchAction,
    } = useDataContext();

    const methods = useForm({
        defaultValues: {
          name: "",
          email: "",
          password: "",
          role: ""
        },
    });    
   
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm();

    const {mutate,isSuccess,isLoading, isError, error} = useAddUser(state.userArr);

    const errorCode = error?.data?.code;
    const errorMessage = errorCode?ErrorCodes[errorCode]:ErrorCodes['default'];

    const onSubmit = async(data) => {
        await dispatchAction(ActionTypes.setUser,data)
        mutate({});
        reset('', {
            keepValues: false,
        })
    }

     return (
        <>
            {
                isLoading ? (
                    <LoadingOverlay isLoading={isLoading}/>
                    ) : (
                        <FormProvider {...methods} >
                            <Wrapper>
                            {isSuccess && <Alert variant="success">{Messages.successSignup}</Alert>}
                            {isError && <Alert variant="danger">{errorMessage}</Alert>}
                                    <CustomForm onSubmit={handleSubmit(onSubmit)}>
                                        
                                        <TextField variant='standard' label="Enter Name" name='name' id="name" {...register("name", {
                                            required: 'Name is required.',
                                            pattern: {
                                                value: /^[a-zA-Z0-9_ ]*$/,
                                                message: 'Enter only letters',
                                            },
                                            maxLength : {
                                                value: 20,
                                                message: 'Maximum length should be 20 characters'
                                            }
                                        })}/>
                                        {errors?.name?.message &&
                                        <ErrorMessage className="errorMsg">{errors.name.message}</ErrorMessage>
                                        }

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
                                            pattern: {
                                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                                message: 'Minimum eight characters, at least one letter and one number.',
                                            },
                                            minLength : {
                                                value: 8,
                                                message: 'Minimum length should be 8 characters'
                                            }
                                        })}/>
                                        {errors?.password?.message &&
                                        <ErrorMessage className="errorMsg">{errors.password.message}</ErrorMessage>
                                        }
                                    <FormControl>

                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="editor"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel name="role" id="editor" value="editor"  control={<Radio />} label="Signup as Editor" {...register("role")} />
                                        <FormControlLabel name="role" id="admin" value="admin" control={<Radio />} label="Signup as Administrator" {...register("role")} />
                                        
                                    </RadioGroup>
                                    </FormControl>

                                        <LoginButton variant='contained' type="submit">Sign Up</LoginButton>
                                        <Text style={{ textAlign: 'center'}}>OR</Text>
                                        <SignupButton onClick={()=>displayLogin(true)}>Already have an account</SignupButton>
                                    </CustomForm>
                            </Wrapper>
                        </FormProvider>
                )
            }
       </>
    )
}

export default SignUp