import Vue from 'vue'
import Router from 'vue-router'
import Feed from '@/components/Feed'
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import NewCase from '@/pages/NewCase';
import EditProfile from '@/pages/EditProfile';
import Case from '@/pages/Case';
import store from '@/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
        requireAuth : true,
        title : 'Feed'
      },
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      meta:{
        requireAuth : false,
        title : 'Register'
      },
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      meta:{
        requireAuth : false,
        title : 'Login'
      },
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'profile',
      meta:{
        requireAuth : true,
        title : 'Profile'
      },
      component: Profile
    },
    {
      path: '/case/:id',
      name: 'case',
      meta:{
        requireAuth : true,
        title : 'Case'
      },
      component: Case
    },
    // {
    //   path: '/search',
    //   name: 'search',
    //   meta:{
    //     requireAuth : ture,
    //     title : 'Search'
    //   },
    //   component: Search
    // },
    // {
    //   path: '/notifications',
    //   name: 'notifications',
    //   meta:{
    //     requireAuth : ture,
    //     title : 'Notifications'
    //   },
    //   component: Notifications
    // },
    // {
    //   path: '/menu',
    //   name: 'menu',
    //   meta:{
    //     requireAuth : ture,
    //     title : 'Menu'
    //   },
    //   component: Menu
    // },
    {
      path: '/newcase',
      name: 'newCase',
      meta:{
        requireAuth : true,
        title : 'New'
      },
      component: NewCase
    },
    {
      path: '/editprofile/:id',
      name: 'editProfile',
      meta:{
        requireAuth: true,
        title : "Edit Profile"
      },
      component: EditProfile
    }
  ],
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.getters.isLoggedIn == false) {
      console.log('user is not logged in ')
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next() 
  }
})
export default router