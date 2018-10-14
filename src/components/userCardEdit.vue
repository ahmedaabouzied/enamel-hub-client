<template>
    <v-container grid-list-xs text-xs-center>
        <v-layout row>
            <v-flex xs12>
                <h1>Edit profile</h1>
            </v-flex>         
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-expansion-panel>
                   <edit-profile-image
                    :user="user"
                    :profile = "profile"
                    :isMine = "isMine"
                   ></edit-profile-image>
                    <edit-cover-image
                    :user="user"
                    :profile="profile"
                    :isMine = "isMine"
                    ></edit-cover-image>
                    <edit-profile-fields
                    :user="user"
                    :profile="profile"
                    :isMine = "isMine"
                    >
                    </edit-profile-fields>
                    <edit-edu-bio
                    :user="user"
                    :profile="profile"
                    :isMine = "isMine"
                    ></edit-edu-bio>
                </v-expansion-panel>
            </v-flex>   
        </v-layout>
    </v-container>
</template>

<script>
import editProfileImage from "@/components/editProfileImage";
import editCoverImage from "@/components/editCoverImage";
import editProfileFields from "@/components/editProfileFields";
import editProfileBio from "@/components/editProfileBio";
export default {
  props: ["user", "profile", "isMine"],
  components: {
    "edit-profile-image": editProfileImage,
    "edit-cover-image": editCoverImage,
    "edit-profile-fields": editProfileFields,
    "edit-edu-bio": editProfileBio
  }
};
</script>

<style lang="scss"scoped >
#profileImage {
  max-height: 250px;
  widows: 100%;
  object-fit: cover;
}
h4 {
  display: inline;
}
.user_card {
  padding-bottom: 3%;
}
.cover_image {
  object-fit: cover;
  position: relative;
}
.profile_buttons {
  margin-top: 0px;
}
.profile_image {
  border: 3px white solid;
  border-radius: 60px;
  margin-top: -150px;
  position: relative;
  object-fit: cover;
  background-color: #f2f2f2;
}
</style>
