<template>
    <div>
    <v-tabs fixed-tabs class="fixed-down hidden-md-and-up">
        <v-tab><router-link to="/"><img src="@/assets/logo.svg" alt="logo" width="30px" height="30px"></router-link></v-tab>
        <v-tab><router-link to="/search"><v-icon>search</v-icon></router-link></v-tab>
        <v-tab><router-link to="/notifications"><v-icon>notifications</v-icon></router-link></v-tab>
        <v-tab class="hidden-md-and-up"><router-link :to="/profile/+user.id"><v-icon>menu</v-icon></router-link></v-tab>
    </v-tabs>
    <v-toolbar dark color="primary" class="fixed-down hidden-sm-and-down">
    <v-btn flat dark icon><router-link to="/"><img src="@/assets/logo_nav.svg" alt="logo" width="30px" height="30px"></router-link></v-btn>
    <v-toolbar-title class="white--text">Enamel Hub</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn flat dark icon><router-link to="/search"><v-icon color="white">search</v-icon></router-link></v-btn>
    <v-btn  flat dark icon class="hidden-sm-and-down"><v-icon>tag</v-icon></v-btn>
    <v-btn flat dark icon ><router-link to="/notifications"><v-icon color="white">notifications</v-icon></router-link></v-btn>
    <router-link :to="/profile/+user.id"> <img :src="profile.profile_image_url" class="profile_image_nav" width="20px" height="20px" alt=""><h2 class="profile_name_nav">{{profile.first_name}} {{profile.last_name}}</h2></router-link>
    <v-menu offset-y>
    <v-btn flat dark icon slot="activator" ><v-icon>more_vert</v-icon></v-btn>
    <v-list>
        <v-list-tile class="settings_button">
            <v-list-tile-title @click="logout">Logout</v-list-tile-title>
        </v-list-tile>
    </v-list>
    </v-menu>
  </v-toolbar>
    </div>
</template>

<script>
export default {
    data(){
        return {
            profile:JSON.parse(this.$store.getters.profile),
            user:JSON.parse(this.$store.getters.user),

        }
    },
    methods:{
        logout:function(){
            this.$store.dispatch('logout')
            .then(()=>{
              location.reload();
            })
        }
    }
}
</script>

<style lang="scss">
.profile_image_nav{
    border:white 1px solid;
    display: inline;
    border-radius: 25px;
    background-color: #f5f5f5;
}
.profile_name_nav{
    display: inline;
    color:white;
    font-size: 1.2em;
    padding-left: 5px;
    text-transform: capitalize;
}
.fixed-down{
    overflow: hidden;
    position:fixed;
    width: 100%;
    z-index: 1;
    a{
        text-decoration: none;
    }
  }
  .settings_button:hover{
      cursor: pointer;
      background-color: #f4f4f4;
  }
  @media (min-width: 600px) {
   
  }
</style>
