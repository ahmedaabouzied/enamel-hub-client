<template>
    <v-container grid-list-xs text-xs-center>
        <v-layout row>
            <v-flex xs12>
                <v-card class="user_card">
                    <img :src="profile.cover_image_url" width="100%" height="250px" class="cover_image">
                    <v-layout row>
                        <v-flex xs4 offset-xs4 md2 offset-md5>
                            <img :src="profile.profile_image_url" alt="profile image" width="100%" class="profile_image" > 
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <h1>{{profile.first_name}} {{profile.last_name}}</h1>
                        </v-flex>
                    </v-layout>
                    <v-layout row style="margin-bottom:2%">
                        <v-flex xs12>
                            <h4><v-icon>location_on</v-icon> Alexandria , Egypt</h4>
                            <h4><v-icon>school</v-icon> Alexandria University</h4>
                            <p>I love cheese</p>
                            <h4><b>80</b> Followers</h4> 
                            <h4><b>80</b> Followings</h4>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row class="profile_buttons">
                        <v-flex class="text-xs-center mt-3" xs12>
                            <v-btn small v-if="isMine" icon flat color="primary">
                                <v-icon >edit</v-icon>
                            </v-btn>
                            <v-btn small icon flat color="primary">
                                <v-icon>share</v-icon>
                            </v-btn>
                            <v-btn small icon flat color="primary">
                                <v-icon>email</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props:['user','profile','isMine']
}
</script>

<style lang="scss" scoped>
    h1,h2,h3,h4,h5,h6,p{
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        padding:1.2%;
        text-transform: capitalize;
        b{
            font-weight: 800;
        }
    }
    h4{
        display: inline;
    }
    .user_card{
        padding-bottom: 3%;
    }
    .cover_image{
        object-fit: cover;
        position: relative;
    }
    .profile_buttons{
        margin-top: 0px;
    }
    .profile_image{
        border: 3px white solid;
        border-radius: 60px;
        margin-top:-150px;
        position: relative;
        object-fit: cover;
        background-color: #f2f2f2;
    }
</style>
