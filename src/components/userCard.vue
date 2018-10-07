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
                    <v-layout row>
                        <v-flex xs12>
                            <h4><v-icon>location_on</v-icon> Alexandria , Egypt</h4>
                            <h4><v-icon>school</v-icon> Alexandria University</h4>
                            <p>I love cheese</p>
                            <h4><b>80</b> Followers</h4> 
                            <h4><b>80</b> Followings</h4>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props:['user','profile']
}
</script>

<style lang="scss" scoped>
    h1,h2,h3,h4,h5,h6,p{
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        padding:1.2%;
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
    .profile_image{
        border: 3px white solid;
        border-radius: 60px;
        margin-top:-150px;
        position: relative;
        object-fit: cover;
        z-index: 1;
        background-color: #f2f2f2;
    }
</style>
