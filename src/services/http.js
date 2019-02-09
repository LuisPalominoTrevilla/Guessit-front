import axios from 'axios';
console.log(`${process.env.REACT_APP_API_URL}`);
const http = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`
});

http.successCallback = response => {
    return response;
}

const interceptResErrors = err => {
    console.log('err', err);
    try {
        err = Object.assign(new Error(), err.response.data.error);
      } catch (e) {
    }
    return Promise.reject(err);
};


const interceptResponse = res => {
    try {
        return res.data;
    } catch (e) {
        return res;
    }
};
http.interceptors.response.use(interceptResponse, interceptResErrors);

export default http;