import Api from './api';

export default {
    getCasesOfUser(id){
        return Api().get('cases/showUserCases/'+id);
    },
    create(caseObj){
        return Api().post('cases/create',caseObj);
    },
    star(id){
        return Api().post('/cases/star/create/'+id);
    },
    unStar(id){
        return Api().post('/cases/star/remove/'+id);
    }
}