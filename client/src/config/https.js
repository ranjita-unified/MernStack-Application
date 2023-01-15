import axios from 'axios';
/**
 * axiosInstance
 * for api
 */
const axiosInstance = axios.create({
    headers: {
        'Content-Type':'application/json', 
    }
});
/**
 * axiosFileInstance
 * for file upload
 */
const axiosFileInstance = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export { axiosInstance, axiosFileInstance };