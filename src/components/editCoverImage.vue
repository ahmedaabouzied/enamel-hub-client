<template>
    <v-expansion-panel-content>
        <div slot="header">Edit Cover Image</div>
        <v-card>
            <v-container>
                <v-form>
                    <v-layout row text-xs-center>
                        <v-flex xs12>
                            <img :src="coverImage" id="coverImage">
                        </v-flex>
                    </v-layout>
                    <v-layout row text-xs-center>
                        <v-flex xs12>
                            <v-btn primary @click="openFilePicker">Upload Image</v-btn>
                            <input type="file" ref="caseImage" hidden @change="onFileChange" accept="img/*">
                        </v-flex>
                    </v-layout>
                    <v-layout row text-xs-center>
                        <v-flex xs12>
                            <v-btn @click="updateCoverImage" primary color="primary">Submit Image</v-btn>
                            <br>
                            <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                            v-if="loading"
                            ></v-progress-circular>
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
import profile from '@/services/profile';
import firebase from 'firebase';
export default {
    data () {
      return {
        snackbar:false,
        loading:false,
        snackText:'',
        coverImageFile:null,
        coverImage:this.profile.cover_image_url,
      }
    },
    props:['user','profile','isMine'],
    methods:{
        openFilePicker(){
            this.$refs.caseImage.click()
        },
        onFileChange(event){
            let files = event.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            this.coverImageFile = files[0];
            reader.addEventListener('load',()=>{
                this.loading = false;
                let dataUrl = reader.result;
                this.coverImage = dataUrl;
            })
        },
        updateCoverImage:function(event){
            var uploadTask = firebase.storage().ref('/cover_images/'+this.user.email+'/'+new Date().getTime() +'_'+ this.coverImageFile.name).put(this.coverImageFile)
            uploadTask.on('state_changed',()=>{
                this.loading = true;
            })
            uploadTask.then(()=>{
                this.loading = false;
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
                    let cover_image_url = downloadURL;
                    let edits = {
                        cover_image_url : cover_image_url
                    }
                    profile.update(edits)
                    .then((res)=>{
                        console.log(res.data);
                        this.snackText = res.data.message;
                        this.snackbar = true;
                    })
                });
            })
        }
    }
}
</script>

<style lang="scss"scoped >
    #coverImage{
        max-height: 250px;
        width: 100%;
        object-fit: cover;
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