<template>
    <v-expansion-panel-content>
        <div slot="header">Edit Country , Education and Bio</div>
        <v-card>
            <v-container>
                <v-form @submit.prevent="updateUser">
                    <v-layout row>
                        <v-flex xs12>
                            <h4 class="subheading">Country</h4>
                            <v-text-field
                            solo
                            flat
                            v-model="editProfile.country"
                            background-color="#e6ecf0"
                            :value="editProfile.country"
                            :rules="notEmptyRule"
                            >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <h4 class="subheading">City</h4>
                            <v-text-field
                            solo
                            flat
                            :rules="notEmptyRule"
                            required
                            background-color="#e6ecf0"
                            :value="editProfile.city"
                            v-model="editProfile.city"
                            >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <h4 class="subheading">Education</h4>
                            <v-select
                            solo
                            flat
                            :rules="notEmptyRule"
                            required
                            :items="Education"
                            background-color="#e6ecf0"
                            v-model="editProfile.education"
                            >
                            </v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <h4 class="subheading">University</h4>
                            <v-select
                            :items="University"
                            flat
                            solo
                            class="input-field"
                            height="3em"
                            :rules="notEmptyRule"
                            background-color="#e6ecf0"
                            v-model="editProfile.university_name"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <h4 class="subheading">Bio</h4>
                            <v-textarea
                            flat
                            solo
                            class="input-field"
                            background-color="#e6ecf0"
                            v-model="editProfile.bio"
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row text-xs-center>
                        <v-flex xs12>
                            <v-btn type="submit" color="primary">Submit</v-btn>
                            <v-snackbar
                                v-model="snackbar"
                                color="success"
                                >
                                {{ snackText }}
                                <v-btn
                                    dark
                                    flat
                                    @click="snackbar = false"
                                >
                                    Close
                                </v-btn>
                            </v-snackbar>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-container>
        </v-card>
    </v-expansion-panel-content>
</template>
<script>
import profile from "@/services/profile";
export default {
  props: ["user", "profile", "isMine"],
  data() {
    return {
      snackbar: false,
      loading: false,
      snackText: "",
      University: ["Alexandria University", "Pharos University"],
      Education: ["Dental Student", "B.A", "MS", "PhD"],
      notEmptyRule: [
          v=> !!v || 'Field should not be empty'
      ],
      editProfile: {
        country: this.profile.country,
        city: this.profile.city,
        education: this.profile.education,
        university_name: this.profile.university_name,
        bio: this.profile.bio
      }
    };
  },
  methods: {
    updateUser: function(event) {
      profile.update(this.editProfile).then(res => {
        this.snackText = res.data.message;
        this.snackbar = true;
      });
    }
  }
};
</script>
