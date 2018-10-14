<template>
  <v-app>
    <app-navbar class="fixed-down" v-if="isLoggedIn"></app-navbar>
    <v-content class="content">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  name: 'App',
  components:{
    Navbar,
    'app-navbar':Navbar
  },
  computed:{
    year:function(){
      let date = new Date();
      let year = date.getFullYear();
      return year;
    },
    isLoggedIn:function(){
      return this.$store.getters.isLoggedIn;
    }
  }
}
</script>
<style lang="scss">
  .content{
    margin-top: 2%;
  }
  @media (max-width: 600px) {
    .content{
      margin-top: 6%;
    }
  }
</style>
