import axios from 'axios';
import store from '@/store/index';
let token = store.getters.token;
if (token){
    token = token.replace(/"/g,"")
}
export default () => {
    return axios.create({
        baseURL:'http://localhost:3000/api',
        headers:{
            token: token
        }
    })
}