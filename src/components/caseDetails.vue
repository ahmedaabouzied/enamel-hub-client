<template>
    <v-container grid-list-xs text-xs-center>
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
                                    <a :href="'/editcase/'+case_post.id" class="btn">
                                        <v-icon small color="primary">edit</v-icon>
                                    </a>
                                </v-flex>
                                <v-flex xs1>
                                    <a href="#delete" class="btn" v-if="isMine" @click="check = true">
                                        <v-icon small color="primary">delete</v-icon>
                                    </a>
                                </v-flex>  
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout row>
                            <v-flex xs12>
                                <img :src="case_post.image_url" alt="case image" width="100%" height="250px" class="case_image">
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <div class="case_details">
                                    <p><b>{{case_post.title}}</b></p>
                                    <p><b>Gender :</b> {{case_post.gender}}</p>
                                    <p><b>Age :</b> {{case_post.age}}</p>
                                    <p><b>Symptoms :</b> {{case_post.symptoms}}</p>
                                    <p><b>Diagnosis :</b> {{case_post.diagnosis}}</p>
                                    <p><b>Treatment :</b> {{case_post.treatment}}</p>
                                    <p><b>Details :</b> {{case_post.details}}</p>
                                    <v-chip label color="primary" text-color="white" v-for="tag in tags" :key="tag.id">
                                        <b># {{tag.title}}</b>
                                    </v-chip>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <case-actions
                        :stars_count="stars_count"
                        :case_id = "case_post.id"
                        :stars = "stars"
                        :isMine = "isMine"
                        ></case-actions>
                        <v-dialog v-model="check" persistent max-width="290">
                            <v-card>
                                <v-card-title class="headline">Are you sure ?</v-card-title>
                                <v-card-text>Deleted data can't be restored !</v-card-text>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" flat @click="deleteCase">Delete</v-btn>
                                <v-btn color="primary" flat @click.native="check = false">No</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="message" persistent max-width="290">
                            <v-card>
                                <v-card-title class="headline">{{messageTitle}}</v-card-title>
                                <v-card-text>{{messageText}}</v-card-text>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" flat @click="redirect">Ok</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import caseActions from '@/components/caseActions'
import cases from '@/services/cases'
export default {
    data(){
        return{

        }
    },
    props:['showDetails','user_id','isMine','user_profile_image','user_first_name','user_last_name','case_post','tags','stars','stars_count'],
    components:{
        'case-actions':caseActions,
    },
    data(){
        return{
            snackbar:false,
            snackText:'',
            snackColor:'success',
            check:false,
        }
    },
    methods:{
        deleteCase:function(){
            cases.delete(this.case_post.id)
            .then((res)=>{
                this.check = false;
                this.messageText = res.data.message;
                this.messageTitle = "Success";
                this.message = true
            })
            .catch((err)=>{
                this.snackText = res.data.message;
                this.snackColor =  "error";
                this.snackbar = true;
            })
        },
        redirect : function(){
            this.message = false;
            this.$router.push('/');
        }
    },
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
