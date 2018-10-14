<template>
    <v-container grid-list-xs text-xs-center>
        <v-layout row>
            <v-flex xs12 md12>
                <user-card-edit
                :user="user"
                :profile="profile"
                :isMine = "isMine"
                v-if="user"
                ></user-card-edit>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import profile from '@/services/profile';
import userCardEdit from '@/components/userCardEdit';
export default {
    data(){
        return {
            user:null,
            profile:null,
        }
    },
    methods:{
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
    components: {
        'user-card-edit':userCardEdit
    },
    created(){
        this.getProfile();
    }
}
</script>

<style lang="scss" scoped>

</style>
