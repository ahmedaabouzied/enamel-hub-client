<template>
    <v-container grid-list-xs text-xs-center>
        <v-layout row>
            <v-flex xs12 md8>
                <case-details
                  v-if="casePost && user && profile"
                  :user_id = "user.id"
                  :user_profile_image = "profile.profile_image_url"
                  :user_first_name = "profile.first_name"
                  :user_last_name = "profile.last_name"
                  :case_post = "casePost"
                  :tags = "tags"
                  :stars = "stars"
                  :stars_count = "stars.length || 0"
                  :isMine = "isMine"
                ></case-details>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import caseDetails from "@/components/caseDetails";
import cases from "@/services/cases";
export default {
  data() {
    return {
      user: null,
      profile: null,
      casePost: null,
      tags:null,
      stars:[],
      isMine: false,
      currentUser: JSON.parse(this.$store.getters.user),
    };
  },
  components: {
    "case-details": caseDetails
  },
  methods: {
    getCase: function() {
      cases.showCase(this.$route.params.id).then(res => {
        this.casePost = res.data.case;
        this.tags = res.data.tags;
        if(res.data.stars != null){
          this.stars.push(res.data.stars)
        }
        this.user = res.data.user;
        this.profile = res.data.profile;
        if(this.currentUser.id == res.data.user.id){
              this.isMine = true;
          }else{
              this.isMine = false;
          }
      });
    }
  },
  created() {
    this.getCase();
  }
};
</script>

<style>
</style>
