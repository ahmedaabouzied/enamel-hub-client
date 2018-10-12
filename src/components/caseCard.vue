<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-container>
                        <v-layout row>
                                <v-flex xs1 md1 class="user_details">
                                   <a :href="'/profile/'+user_id">
                                        <img class="user_profile_image" :src="user_profile_image" alt="user profile image" width="100%" height="50px">
                                   </a>
                                </v-flex>
                                <v-flex xs7 md4>
                                    <a :href="'/profile/'+user_id">
                                        <h2 class="user_name">{{user_first_name}} {{user_last_name}}</h2>
                                    </a>
                                </v-flex>
                                <v-flex xs1 offset-xs2 offset-md7 md1 v-if="isMine">
                                    <v-btn icon flat color="primary">
                                        <v-icon small >edit</v-icon>
                                    </v-btn>
                                </v-flex>  
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout row>
                            <v-flex xs12>
                                <img :src="case_image" alt="case image" width="100%" height="250px" class="case_image">
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <div class="case_details">
                                    <span class="personal"><v-icon>turned_in</v-icon> {{case_age}} years old {{case_gender}}</span>
                                    <p>{{case_diagnosis}}</p>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <case-actions
                        :stars_count="stars_count"
                        :case_id = "case_id"
                        :stars = "stars"
                        :isMine = "isMine"
                        ></case-actions>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import caseActions from '@/components/caseActions'
export default {
    props:['user_id','isMine','user_profile_image','user_first_name','user_last_name','case_image','case_age','case_gender','case_diagnosis','stars_count','case_id','stars'],
    components:{
        'case-actions':caseActions,
    }
}
</script>

<style lang="scss" scoped>
    a{
        text-decoration: none;
        color: inherit;
    }
    .user_profile_image{
        object-fit: contain;
        border-radius: 60px;
    }
    .user_name{
        text-transform: capitalize;
        padding-top: 8%;
        font-size: 1em;
        text-align: center;
        font-weight: 200;
        font-family: 'Montserrat', sans-serif;
    }
    .case_image{
        object-fit: cover;
    }
    .case_details{
        text-align: left;
        padding:1%;
        .personal{
            font-size: 1em;
            font-weight: 200;
            font-family: 'Montserrat', sans-serif;
            text-align: left;
            padding:2%;
        }
        p{
            font-size: 1em;
            font-weight: 200;
            font-family: 'Montserrat', sans-serif;
            text-align: left;
            padding:2%;
        }
    }
</style>
