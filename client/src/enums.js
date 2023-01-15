export const ActionTypes = {
    setLogin : 'setLogin',
    setUser: 'setUser',
    setLoginData: 'setLoginData',
    setEditUser: 'setEditUser',
    uploadImage: 'uploadImage',
    setUserImage: 'setUserImage',
    editProfile: 'editProfile'
}

export const ErrorCodes = {
    11000: "Email already exists!!",
    401: "Invalid Credentials!!",
    400: "You don't have permission to view the details.",
    default: "Something went wrong.Please try again!!"
}

export const Messages = {
    successLogin: "Succesfully Logged In",
    successSignup: "You have successfully registered !!",
    successUpdate: "Successfully Updated."
}