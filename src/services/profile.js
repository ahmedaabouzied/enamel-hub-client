import Api from './api';

export default {
    showUser(id){
        return Api().get('user/showbyid/'+id);
    },
    update(edits){
        return Api().put('user/update/profile',edits);
    },
    userUpdate(edits){
        return Api().put('user/update',edits);
    }
}