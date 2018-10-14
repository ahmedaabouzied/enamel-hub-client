<template>
    <v-container grid-list-xs text-xs-center>
        <v-layout row>
            <v-flex xs12 md8>
                <case-card
                    v-if="profile"
                    :user_id = "user.id"
                    :user_profile_image = "profile.profile_image_url"
                    :user_first_name = "profile.first_name"
                    :user_last_name = "profile.last_name"
                    :case_id = "casePost.id"
                    :case_image = "casePost.image_url"
                    :case_age = "casePost.age"
                    :case_gender = "casePost.gender"
                    :case_diagnosis = "casePost.diagnosis"
                    :stars_count = "stars.length"
                    :stars = "stars"
                    :isMine = "isMine"
                    :showDetails = "false"
                >
                    <template slot="caseDetails">
                        {{stars}}
                    </template>
                </case-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import caseCard from "@/components/caseCard";
import cases from "@/services/cases";
export default {
  data() {
    return {
      user: null,
      profile: null,
      casePost: null,
      stars:null,
      isMine: false
    };
  },
  components: {
    "case-card": caseCard
  },
  methods: {
    getCase: function() {
      cases.showCase(this.$route.params.id).then(res => {
        this.casePost = res.data.case;
        this.stars = res.data.stars;
        this.user = res.data.user;
        this.profile = res.data.profile;
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
