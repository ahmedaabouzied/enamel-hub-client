import Api from './api';

export default {
    register(credentials){
        return Api().post('/user/create',credentials);
    },
    login(credentials){
        return Api().post('/user/login',credentials);
    }
}