import Api from './api';

export default {
    getCasesOfUser(id){
        return Api().get('cases/showUserCases/'+id);
    },
    create(caseObj){
        return Api().post('cases/create',caseObj);
    },
    showCase(id){
        return Api().get('cases/show/'+id);
    },
    star(id){
        return Api().post('/cases/star/create/'+id);
    },
    unStar(id){
        return Api().post('/cases/star/remove/'+id);
    },
    delete(id){
        return Api().delete('cases/delete/'+id);
    },
    editCase(obj,id){
        return Api().put('cases/edit/'+id,obj)
    }
}