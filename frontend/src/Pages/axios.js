import axios from 'axios';

const apiInstance = axios.create({
    baseURL : 'http://localhost:8000',
    timeout : 1000,
    headers :{
        Authorization : localStorage.getItem('access_token')?'JWT ' +localStorage.getItem('access_token'):null,
        'Content-Type':'application/json',
        Accept:'application/json',

    },
});

export default apiInstance;