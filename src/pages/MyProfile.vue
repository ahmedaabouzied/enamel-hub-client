<template>
    <v-container grid-list-xs text-xs-center>
        <v-layout row>
            <v-flex xs12 md8>
                <user-card :user="user" :profile="profile"></user-card>
            </v-flex>
            <v-flex md4 class="hidden-sm-and-down">
               
            </v-flex>

        </v-layout>
        <v-layout row>
            <v-flex xs12 md8>
                <case-card 
                    v-for="post in cases" :key="post.id"
                    :user_profile_image = "profile.profile_image_url"
                    :user_first_name = "profile.first_name"
                    :user_last_name = "profile.last_name"
                    :case_image = "post.image_url"
                    :case_age = "post.age"
                    :case_gender = "post.gender"
                    :case_diagnosis = "post.diagnosis"
                ></case-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import userCard from '@/components/userCard';
import cases from '@/services/cases';
import caseCard from '@/components/caseCard';
export default {
    data(){
        return{
            user:JSON.parse(this.$store.getters.user),
            profile:JSON.parse(this.$store.getters.profile),
            cases:null,
        }
    },
    methods:{
        getCases:function(){
             cases.getCasesOfUser(this.user.id)
            .then((res)=>{
                this.cases = res.data.cases
                console.log(res.data.cases)
            })
        }
    },
    components:{
        'user-card':userCard,
        'case-card':caseCard,
    },
    created(){
        this.getCases();
    }
}
</script>

<style lang="scss" scoped>
    
</style>

