import { useReducer } from "react";
import { ActionTypes } from "../enums";
import { Provider } from "./context";

/**
 * initialState
 */

const initialState = {
    isLogin: true,
    isUserAuthenticated:false,
    userArr: {
        name: "",
        email: "",
        password: "",
        role: ""
    },
    editUserArr: {
        file:"",
        name: "",
        email: "",
    },
    loginUserArr: {
        email: "",
        password: ""
    },
    uploadedFile:"no-profile-image.png",
    imageArr: {},
    editProfileData : {
        name: "",
        email: "",
    }
};

/**
 * reducer
 */
const reducer = (state, {type,payload}) => ({
    [ActionTypes.setLogin] : {
        ...state,
        isLogin:payload
    },
    [ActionTypes.setUser] : {
        ...state,
        userArr:payload
    },
    [ActionTypes.setEditUser] : {
        ...state,
        editUserArr:payload
    },
    [ActionTypes.setLoginData] : {
        ...state,
        ...payload
    },
    [ActionTypes.uploadImage] : {
        ...state,
        imageArr:payload
    },
    [ActionTypes.setUserImage] : {
        ...state,
        uploadedFile:payload
    },
    [ActionTypes.editProfile] : {
        ...state,
        editProfileData:payload
    },
    
    
}[type] || state);


/**
 * Provider
 */

const UserDataProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const dispatchAction = (type,payload) => {
        dispatch({ type, payload });
    };

    return <Provider value={{state, dispatchAction }}>{children}</Provider>
};

export default UserDataProvider