<template>
    <v-container grid-list-xs text-xs-center>
        <v-layout row>
            <v-flex xs12 md8>
                <user-card
                 :user="user"
                 :profile="profile"
                 :isMine = "isMine"
                 v-if="user">
                </user-card>
            </v-flex>
            <v-flex md4 class="hidden-sm-and-down">
               
            </v-flex>

        </v-layout>
        <v-layout row>
            <v-flex xs12 md8>
                <case-card 
                    v-for="post in cases" :key="post.id"
                    v-if="profile"
                    :user_id = "user.id"
                    :user_profile_image = "profile.profile_image_url"
                    :user_first_name = "profile.first_name"
                    :user_last_name = "profile.last_name"
                    :case_id = "post.id"
                    :case_image = "post.image_url"
                    :case_age = "post.age"
                    :case_gender = "post.gender"
                    :case_diagnosis = "post.diagnosis"
                    :stars_count = "post.stars.length"
                    :stars = "post.stars"
                    :isMine = "isMine"
                ></case-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import userCard from '@/components/userCard';
import cases from '@/services/cases';
import profile from '@/services/profile';
import caseCard from '@/components/caseCard';
export default {
    data(){
        return{
            user:null,
            profile:null,
            cases:null,
            isMine:false
        }
    },
    methods:{
        getCases:function(){
             cases.getCasesOfUser(this.$route.params.id)
            .then((res)=>{
                this.cases = res.data.cases
                console.log(res.data.cases)
            })
        },
        getProfile : function(){
            profile.showUser(this.$route.params.id)
            .then((res)=>{
                this.user = res.data.user;
                this.profile = res.data.profile;
                let currentUser = JSON.parse(this.$store.getters.user);
                if(this.user.id === currentUser.id){
                    this.isMine = true;
                }else{
                    this.isMine = false;
                }
            })
        },
    },
     watch: {
        '$route' (to, from) {
        // react to route changes...
        this.getProfile();
        this.getCases();
        }
    },
    components:{
        'user-card':userCard,
        'case-card':caseCard,
    },
    computed:{
        
    },
    created(){
        this.getProfile();
        this.getCases();
        // this.isMyProfile();
    }
}
</script>

<style lang="scss" scoped>
    
</style>

