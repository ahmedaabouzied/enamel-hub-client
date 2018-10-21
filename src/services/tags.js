import Api from './api';

export default {
    getTags() {
        return Api().get('tags/getall');
    }
}