import axios from 'axios';


const AxiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",//the base URL that is taken for every fetch request
    withCredentials: true,//to send cookies with requests
    headers: {
        "Content-Type": "application/json",
    },//headers for the request
})

export default AxiosInstance;
//this instance is used to make requests to the backend