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
                                    <v-btn icon flat color="primary" @click="editCase">
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
                                    <p><b>{{case_title}}</b></p>
                                    <v-chip label color="primary" text-color="white" v-for="tag in tags" :key="tag.id">
                                        <b># {{tag.title}}</b>
                                    </v-chip>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <case-actions
                        :stars_count="stars_count"
                        :case_id = "case_id"
                        :stars = "stars"
                        :isMine = "isMine"
                        >
                            <template v-if="showDetails" slot="details">
                                <a class="details" :href="'/case/'+case_id">Show Details >></a>
                            </template>
                        </case-actions>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import caseActions from '@/components/caseActions'
export default {
    props:['showDetails','user_id','isMine','user_profile_image','user_first_name','user_last_name','case_image','case_age','case_gender','case_title','stars_count','case_id','stars','tags'],
    components:{
        'case-actions':caseActions,
    },
    methods:{
        editCase: function(){
            this.$router.push('/editcase/'+this.case_id)
        }
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
        font-family: 'Roboto', sans-serif;
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
            font-family: 'Roboto', sans-serif;
            text-align: left;
            padding:2%;
        }
        p{
            font-size: 1em;
            font-weight: 200;
            font-family: 'Roboto', sans-serif;
            text-align: left;
            padding:2%;
        }
    }
</style>
