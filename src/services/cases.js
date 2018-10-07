import Api from './api';

export default {
    getCasesOfUser(id){
        return Api().get('cases/showUserCases/'+id);
    }
}