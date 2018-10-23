<template>
  <v-app>
    <app-navbar class="fixed-down" v-if="isLoggedIn"></app-navbar>
    <v-content class="content">
      <v-btn
        color="primary"
        dark
        class="floating_button"
        bottom
        right
        fab
        @click="newCase"
      >
        <v-icon>add</v-icon>
      </v-btn>
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
  methods:{
    newCase(){
      this.$router.push('/newcase')
    }
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
  .floating_button{
    position: fixed !important;
    margin-bottom: 40px;
    z-index: 1;
  }
  @media (max-width: 600px) {
    .content{
      margin-top: 6%;
    }
  }
</style>
