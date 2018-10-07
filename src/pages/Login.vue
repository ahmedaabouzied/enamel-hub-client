<template>
    <v-container grid-list-xs text-xs-center>
        <basic-card title="Log in to Enamel Hub">
            <template slot="content">
                <login-form></login-form>
            </template>
        </basic-card>
        
    </v-container>
</template>
<script>
import LoginForm from '@/components/loginForm';
import basicCard from '@/components/basicCard';
export default {
    name:'Login',
    components:{
        'login-form':LoginForm,
        'basic-card':basicCard,
    }
}
</script>
<style>

</style>
