<template>
    <v-layout>
        <v-flex xs12>
            <v-btn v-if="!isFollowing" color="primary" outline @click="followUser">Follow</v-btn>
            <v-btn v-if="isFollowing" @click="unfollowUser"  @mouseover="toggleToUnfollow" @mouseout="toggleToFollowing" :color="followColor">{{followText}}</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import profile from '@/services/profile';
export default {
    props:['user','profile'],
    data(){
        return{
            currentUser:JSON.parse(this.$store.getters.user),
            isFollowing:false,
            followText:"following",
            followColor:"primary"
        }
    },
    methods:{
        getFollowState(){
            profile.isFollowing(this.user.id)
            .then((res)=>{
                console.log(res.data);
                this.isFollowing = res.data.state;
            })
        },
        followUser(){
            profile.follow(this.user.id)
            .then((res)=>{
                console.log(res.data);
                this.getFollowState();
            })
        },
        unfollowUser(){
            profile.unfollow(this.user.id)
            .then((res)=>{
                console.log(res.data);
                this.getFollowState();
            })
        },
        toggleToUnfollow(){
            this.followText = "Unfollow";
            this.followColor = "warning";
        },
        toggleToFollowing(){
            this.followText = "following";
            this.followColor = "primary";
        }
    },
    created(){
        this.getFollowState();
    }
}
</script>

<style>

</style>
