<template>
    <v-layout row>
      <v-flex xs12 md8>
        <case-card 
                    v-for="casePost in feedCases" :key="casePost.id"
                    :user_id = "casePost.user.id"
                    :user_profile_image = "casePost.user.Profile.profile_image_url"
                    :user_first_name = "casePost.user.Profile.first_name"
                    :user_last_name = "casePost.user.Profile.last_name"
                    :case_id = "casePost.id"
                    :case_image = "casePost.image_url"
                    :case_age = "casePost.age"
                    :case_gender = "casePost.gender"
                    :case_title = "casePost.title"
                    :tags = "casePost.Tags"
                    :stars_count = "casePost.stars.length"
                    :stars = "casePost.stars"
                    :showDetails = 'true'
                    :isMine = false
                >
                </case-card>
      </v-flex>
    </v-layout>
</template>
<script>
import feed from '@/services/feed';
import userCard from '@/components/userCard';
import caseCard from '@/components/caseCard';

export default {
  data(){
    return {
      feedCases:null,
      currentUser:this.$store.getters.user,
    }
  },
  components:{
        'user-card':userCard,
        'case-card':caseCard,
  },
  methods:{
    getFeedCases(offset){
      feed.getFeed(offset)
      .then((result)=>{
        this.feedCases = result.data
      })
    },
    isMine(id){
      let myId = parseInt(this.currentUser.id);
      let thisId = parseInt(id);
      if(thisId == myId){
        return true;
      }else{
        return false;
      }
    }
  },
  created(){
    this.getFeedCases(0)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
