import axios from 'axios';
const http = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`
});

http.successCallback = response => {
    return response;
}

http.setToken = token => {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

http.removeToken = () => {
    http.defaults.headers.common['Authorization'] = '';
}

const interceptResErrors = err => {
    console.log('err', err);
    return Promise.reject(err.response.data);
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