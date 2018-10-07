<template>
    <v-container grid-list-xs text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
               <basic-card title="Sign up for Enamel Hub">
                   <template slot="content">
                       <sign-up-form></sign-up-form>
                   </template>
               </basic-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import signUpForm from '@/components/signUpForm';
import basicCard from '@/components/basicCard';
export default {
    components:{
        'sign-up-form':signUpForm,
        'basic-card':basicCard
    }   
}
</script>

<style>

</style>
