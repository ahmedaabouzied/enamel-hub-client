import Api from './api';

export default {
    getFeed(offset){
        return Api().get('/user/getfollowingcases/'+offset);
    }
}