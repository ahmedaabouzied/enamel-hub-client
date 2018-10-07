import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        token:localStorage.getItem('token') || null,
        user:localStorage.getItem('user') || null,
        profile:localStorage.getItem('profile') || null,
        isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    },
    mutations: {
        setToken(state,payload){
            state.token = payload;
            localStorage.setItem('token',payload);
        },
        setUser(state,payload){
            state.user = payload;
            localStorage.setItem('user', payload);
        },
        setProfile(state,payload){
            state.profile = payload;
            localStorage.setItem('profile', payload);
        },
        logIn(state,payload){
            state.isLoggedIn = payload;
            localStorage.setItem('isLoggedIn',payload);
        },
        logout(state,payload){
            state.token = null;
            state.user = null;
            state.profile = null,
            state.isLoggedIn = false;
            localStorage.clear();
        }
    },
    actions: {
        setToken(context,token){
            context.commit('setToken',token);
        },
        setUser(context,user){
            context.commit('setUser',user);
        },
        setProfile(context,profile){
            context.commit('setProfile',profile);
        },
        logIn(context){
            context.commit('logIn',true);
        },
        logout(context){
           context.commit('logout',null)
        }
    },
    getters: {
        token(state){
            return state.token;
        },
        user(state){
            return state.user;
        },
        profile(state){
            return state.profile;
        },
        isLoggedIn(state){
            return state.isLoggedIn;
        }
    },
})