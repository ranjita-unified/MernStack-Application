import { Button,ButtonGroup,TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { FormProvider, useForm  } from "react-hook-form";
import Alert from "react-bootstrap/Alert";

import Header from '../Common/Header';
import {
    CustomForm,
    DashboardComponent,
    DashboardWrapper,
    DashboardImage,
    ErrorMessage,
    LoginButton,
} from '../Common/StyledComponent';
import LoadingOverlay from '../Common/Loader';

 
import { IMAGE_URL } from '../../service/api';
import { useDataContext } from '../../provider/context';
import { useUpdateProfilePicture } from '../../module/users/hooks';
import { ActionTypes, Messages, ErrorCodes } from '../../enums';

const Dashboard = () => {
    const userProfileData = sessionStorage.getItem('userProfile')?JSON.parse(sessionStorage.getItem('userProfile')):'';
   const imageURL = userProfileData?.profileImage?IMAGE_URL+userProfileData.profileImage:'./no-profile-image.png';

    const [file, setFile] = useState(imageURL);
    const { state, dispatchAction } = useDataContext();

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const methods = useForm({
        defaultValues: {
          file:"",  
          name: "",
          email: "",
          password:""
        },
    });    
   
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const {mutate:uploadImage,isLoading, isSuccess,data: successData, isError,error,} = useUpdateProfilePicture(state.imageArr,state.editProfileData);

    const onSubmit = async(data) => {
        const formData = new FormData();
        formData.append("file", data.file[0]);
        if(data.file[0]) {
            data.email="";
            await dispatchAction(ActionTypes.uploadImage,formData);
            uploadImage({});
        }
        if(data.name!=="" && data.email!=="") {
            await dispatchAction(ActionTypes.editProfile,data);
            uploadImage(state.editProfileData)
        }
    }
    
    if(isSuccess) {
        userProfileData.profileImage = successData.userImage;
        userProfileData.name = successData.name;
        userProfileData.email = successData.email;
        sessionStorage.setItem('userProfile', JSON.stringify(userProfileData));
        
    }
    const errorCode = error?.data?.code || error?.status;
    const errorMessage = errorCode?ErrorCodes[errorCode]:ErrorCodes['default'];
   
return (
    <>
    <DashboardComponent>
        <Header/>
        {
            isLoading ? (
                <LoadingOverlay isLoading={isLoading}/>
                ) : (
                    <DashboardWrapper>

                        {(isSuccess) && <Alert variant="success">{Messages.successUpdate}</Alert>}
                        {isError && <Alert variant="danger">{errorMessage}</Alert>}
                        
                        <CustomForm onSubmit={handleSubmit(onSubmit)}>
                            <FormProvider {...methods} >
                                <DashboardImage src={file}  name='picture' alt='profile-picture' width={'50px'} />
                                <ButtonGroup
                                    disableElevation
                                    variant="contained"
                                    aria-label="Disabled elevation buttons"
                                    style={{'paddingBottom':'20px','marginLeft':'30px'}}
                                >
                                    <Button variant="contained" component="label" style={{'width':'50%','marginRight':'5px'}}>
                                    <input hidden accept="image/*" name="file" type="file" 
                                    {...register('file', {
                                        onChange: (e) => {handleChange(e)}
                                        })}
                                    />
                                    Select Photo</Button>

                                    <Button style={{'width':'40%'}} type="submit">Upload</Button>
                                </ButtonGroup>

                                <TextField variant='standard' label="Enter Name" name='name' id="name" style={{'marginBottom':'25px'}} {...register("name", {
                                    value: userProfileData?.name,
                                    required: 'Name is required.',
                                    pattern: {
                                        value: /^[a-zA-Z0-9_ ]*$/,
                                        message: 'Enter only letters',
                                    },
                                    maxLength : {
                                        value: 20,
                                        message: 'Maximum length should be 20 characters'
                                    }
                                })}
                                />
                                {errors?.name?.message &&
                                <ErrorMessage className="errorMsg">{errors.name.message}</ErrorMessage>
                                }

                                <TextField variant='standard' label="Enter Email" name='email' id="email" style={{'marginBottom':'25px'}} {...register("email", {
                                value: userProfileData?.email,
                                required: 'Email is required.',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Email is not valid.',
                                }
                                })}/>
                                {errors?.email?.message &&
                                <ErrorMessage className="errorMsg">{errors.email.message}</ErrorMessage>
                                }

                                <TextField type="password" variant='standard' label="Enter Password" name='password' id="password" style={{'marginBottom':'10px'}} {...register("password", {
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: 'Minimum eight characters, at least one letter and one number.',
                                }
                                })}/>
                                {errors?.password?.message &&
                                <ErrorMessage className="errorMsg">{errors.password.message}</ErrorMessage>
                                }

                                <TextField type="password" variant='standard' label="Re-Enter Password" name='confirmpassword' id="confirmpassword" {...register("confirmpassword", {
                                pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: 'Minimum eight characters, at least one letter and one number.'
                                },
                                validate: (val) => {
                                    if (watch("password") !== val) {
                                    return "Your passwords do no match";
                                    }
                                },
                                    })}/>
                                {errors?.confirmpassword?.message &&
                                <ErrorMessage className="errorMsg">{errors.confirmpassword.message}</ErrorMessage>
                                }
                                <LoginButton variant='contained' type="submit">Edit Profile</LoginButton>
                            </FormProvider>
                        </CustomForm>
                    </DashboardWrapper>                    
            )
        }
    </DashboardComponent>
    </>
    )
}

export default Dashboard