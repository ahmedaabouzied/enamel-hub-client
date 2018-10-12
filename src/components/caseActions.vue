<template>
    <v-layout row>
        <v-flex xs2>
            <a flat icon @click="starCase" v-if="!starred"><v-icon small :color="color">star</v-icon> {{starsCount}}</a> 
            <a flat icon @click="unStarCase" v-if="starred"><v-icon small :color="color">star</v-icon> {{starsCount}}</a> 
        </v-flex> 
        <v-spacer></v-spacer>
    </v-layout>
</template>

<script>
import cases from '@/services/cases';
export default {   
    props:['stars_count','case_id','stars','isMine'], 
    data(){
        return {
            color:'',
            starred:false,
            starsCount: this.stars_count,
            user:JSON.parse(this.$store.getters.user),
        }
    },
    methods:{
        starCase(event){
            event.preventDefault();
            console.log(this.case_id);
            cases.star(this.case_id)
            .then((res)=>{
                console.log(res.data);
                this.getStarsIds(this.stars);
                this.starred = true;
                this.starsCount += 1;
                this.color = "primary";
            })
        },
        unStarCase(evnet){
            event.preventDefault();
            if(this.stars_count > 0 ){
                cases.unStar(this.case_id)
                .then((res)=>{
                    console.log(res.data);
                    this.getStarsIds(this.stars);
                    this.starred = false;
                    this.starsCount += -1;
                    this.color = '';
                })
            }
        },
        getStarsIds(stars){
            let caseArr =  stars.map(x=>x.userId);
            console.log(this.user.id)
            if(caseArr.indexOf(this.user.id) != -1){
                this.color = "primary";
                this.starred = true;
            }else{
                this.color = '';
                this.starred = false;
            }
        }
    },
    computed:{
        
    },
    created(){
        this.getStarsIds(this.stars);
    }
}
</script>

<style lang="scss" scoped>
    a{
        text-decoration: none;
        color:rgba(0, 0, 0, 0.54);
    }

</style>
