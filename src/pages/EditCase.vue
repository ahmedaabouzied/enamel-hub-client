<template>
    <v-container grid-list-xs text-xs-center>
        <v-layout row>
            <v-flex xs12 md12>
                <v-card v-if="Err">
                    <v-container>
                        <h1 style="color:red;">{{ErrMessage}}</h1>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 md12>
                <edit-case-form
                v-if="casePost"
                :case_post = "casePost"
                :case_tags = "caseTags"
                >
                </edit-case-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import cases from '@/services/cases';
import editCaseForm from '@/components/editCaseForm';
export default {
    data(){
        return{
            casePost:null,
            user:null,
            caseTags:null,
            currentUser:JSON.parse(this.$store.getters.user),
            ErrMessage :'',
            Err : false,
        }
    },
    components:{
        'edit-case-form':editCaseForm
    },
    methods:{
        getCase: function(){
            cases.showCase(this.$route.params.id)
            .then((res)=>{
                console.log(res.data)
                this.casePost = res.data.case;
                this.user = res.data.user;
                this.caseTags = res.data.tags;
            })
            .then((res)=>{
                if (this.currentUser.id != this.user.id){
                    this.ErrMessage = "This is not your case , motherfucker ! . Stop Fucking Around !"
                    this.Err = true;
                }
            })
        }
    },
    created(){
        this.getCase();
    }
}
</script>
<style lang="scss" scoped>
h1{
    padding: 5%;
}
</style>
