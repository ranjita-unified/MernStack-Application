import { Box, Button, styled, Typography,TextField,AppBar,Toolbar,  } from '@mui/material';

export const Component = styled(Box)`
    position: relative;
    top:25px;
    width: 400px;
    margin: auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6);
`;
export const Image = styled('img')({
    width: 200,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0 0'
});

export const Wrapper = styled(Box)`
    padding:25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button {
        margin-top: 20px;
    }
`;
export const CustomForm = styled('form')`
   display: contents
`;

export const LoginButton = styled(Button)`
    text-transform:none;
    background-color: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
    margin-top:20px;
`;
export const SignupButton = styled(Button)`
    text-transform:none;
    background-color: #fff;
    color: #2874fe;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;
export const Text = styled(Typography)`
    color: #878787;
    font-size: 14px;
    padding-top:15px;
`;

export const PasswordField = styled(TextField)`
    margin-bottom:5px;
`;

export const ErrorMessage = styled('p')`
    color: #ff0000;
    font-weight:500;
    font-size:14px;
`;

export const DashboardComponent = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6);
    position: absolute;
    top: 15%;
    left: 35%;
`;

export const DashboardWrapper = styled(Box)`
    padding:15px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button {
        margin-top: 20px;
    }
`;

export const DashboardImage = styled('img')({
    width: 200,
    margin: 'auto',
    display: 'flex',
    padding: '20px 0 15px 0'
});

export const HeaderComponent = styled(AppBar)`
    background: #FFFFFF;
    color: #000;
`;

export const HeaderContainer = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`;
