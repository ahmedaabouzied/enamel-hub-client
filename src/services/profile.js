import Api from './api';

export default {
    showUser(id){
        return Api().get('user/showbyid/'+id);
    }
}