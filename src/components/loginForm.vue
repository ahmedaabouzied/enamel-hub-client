<template>
   <form @submit="login">
    <v-text-field
      v-model="loginForm.email"
      label="Email"
      class="input-field"
      required
      flat
      solo
      height="3em"
      background-color="#e6ecf0"
    ></v-text-field>
    <v-text-field
      v-model="loginForm.password"
      label="Password"
      class="input-field"
      required
      type="password"
      flat
      solo
      height="3em"
      background-color="#e6ecf0"
    ></v-text-field>
    <div class="submit">
        <v-btn round type="submit" class="submit_button" color="primary">login</v-btn>
        <a href="#" class="login_form_text"><h4>Forgot your Password ?</h4></a>
        <a href="/register" class="login_form_text"><h4>Sign up for Enamel Hub</h4></a>
    </div>
  </form>
</template>

<script>
import auth from '@/services/auth';
export default {
    name:'LoginForm',
    data:function(){
        return{
            loginForm:{
                email:'',
                password:''
            },
        }
    },
    methods:{
        login:function(event){
            event.preventDefault();
            auth.login(this.loginForm)
            .then((res)=>{
                this.$store.dispatch('setToken',JSON.stringify(res.data.token));
                this.$store.dispatch('setUser',JSON.stringify(res.data.user));
                this.$store.dispatch('setProfile',JSON.stringify(res.data.profile));
                this.$store.dispatch('logIn')
                .then(()=>{
                    this.$router.push('/')
                })
            })
        }
    }
}
</script>

<style>
    .input-field .v-input__slot{
        border-radius: 15px !important;
        padding: 3%;
    }
    .submit_button{
        width: 95%;
        height: 3em;
    }
    .submit{
        padding: 3%;
    }
    .login_form_text{
        color:rgba(0, 0, 0, 0.87);
        text-decoration: none;
    }
    @media (min-width: 600px){
        .input-field{
            width: 100%;
        }
    }
</style>
