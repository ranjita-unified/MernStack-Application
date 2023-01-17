import {axiosInstance,axiosFileInstance} from "../../config/https";
import {appUrls} from '../../service/api';

/**
 * 
 * @param {*} data 
 * @returns success/error message
 */
export const registerUser = async (data) => {
  const { name,email,password,role } = data;
  const body = { name,email,password,role };
  return axiosInstance({
    url: appUrls.userSignup,
    method: "POST",
    data: body
  })
  .then(({ data }) => {
    return data;
  })
  .catch((e) => {
    throw e?.response;
  });
};

/**
 * 
 * @param {*} data 
 * @returns updated user data
 */
export const updateUser = (data) => {
  return axiosFileInstance({
    url: appUrls.userEditProfile,
    method: "POST",
    headers: {
      'Authorization': sessionStorage.getItem('accessToken'),
      'RefreshToken': sessionStorage.getItem('refreshToken'),
    },
    data: data
  })
  .then(({ data }) => {
    return data;
  })
  .catch((e) => {
    throw e?.response;
  });
};

/**
 * 
 * @param {*} fileUploaded 
 * @param {*} userData 
 * @returns file name
 */
export const updateProfileImage = (fileUploaded,userData) => {
  if(userData.email==="") {
    return axiosFileInstance({
      url: appUrls.updateProfileImage,
      method: "POST",
      headers: {
        'Authorization': sessionStorage.getItem('accessToken'),
        'RefreshToken': sessionStorage.getItem('refreshToken')
      },
      data: fileUploaded,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      throw e?.response;
    });
  }
  return axiosInstance({
    url: appUrls.updateUserDetails,
    method: "POST",
    headers: {
      'Authorization': sessionStorage.getItem('accessToken'),
      'RefreshToken': sessionStorage.getItem('refreshToken')
    },
    data: userData
  })
  .then(({ data }) => {
    return data;
  })
  .catch((e) => {
    throw e?.response;
  });
}

/**
 * user login
 * @param {*} payload 
 * @returns user details
 */
export const getUserDetails = async (payload) => {
  const { email,password } = payload;
  const body = { email,password };
  return axiosInstance({
    url: appUrls.userLogin,
    method: "POST",
    data: body
  })
  .then(({ data }) => {
    return data;
  })
  .catch((e) => {
    throw e?.response;
  });
}; 

/**
 * logout user
 */
export const logoutUser = async () => {  
  return axiosInstance({
    url: appUrls.userLogout,
    method: "POST",
    headers: {
      'Authorization': sessionStorage.getItem('accessToken'),
      'RefreshToken': sessionStorage.getItem('refreshToken')
    },
  })
  .then(({ data }) => {
    return data;
  })
  .catch((e) => {
    throw e?.response;
  });
}; 

/**
 * @returns editor data
 */
export const getAllEditors = () => {
  return axiosInstance({
    url: appUrls.getAllEditors,
    method: "GET",
    headers: {
      'Authorization': sessionStorage.getItem('accessToken'),
      'RefreshToken': sessionStorage.getItem('refreshToken')
    },
  })
  .then(({ data }) => {
    return data;
  })
  .catch((e) => {
    throw e?.response;
  });
}

/**
 * 
 * @returns access token
 */
export const verifyToken = () => {
  return axiosInstance({
    url: appUrls.verifyToken,
    method: "POST",
    headers: {
      'Authorization': sessionStorage.getItem('accessToken'),
      'RefreshToken': sessionStorage.getItem('refreshToken')
    },
  })
  .then(({ data }) => {
    return data;
  })
  .catch((e) => {
    throw e?.response;
  });
}
