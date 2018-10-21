<template>
    <v-card>
        <v-card-title><h2>Edit Case</h2></v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <form @submit.prevent="submitCase">
                <v-layout row>
                    <v-flex xs12>
                        <img :src="caseImage" id="caseImagePreview" width="100%">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-btn style="float:left;" primary @click="openFilePicker">Choose Image</v-btn>
                        <input type="file" ref="caseImage" hidden @change="onFileChange" accept="img/*">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-text-field
                        solo
                        flat 
                        background-color="#e6ecf0"
                        :rules="validateEmptyRule"
                        class="input-field"
                        label="Title"
                        v-model="caseForm.title"
                        ></v-text-field>
                        <v-select
                        solo
                        flat
                        background-color="#e6ecf0"
                        :rules="validateEmptyRule"
                        class="input-field"
                        label="Gender"
                        :items="genders"
                        v-model="caseForm.gender"
                        >
                        </v-select>
                        <v-text-field
                        solo
                        flat 
                        type="number"
                        background-color="#e6ecf0"
                        :rules="validateEmptyRule"
                        class="input-field"
                        label="Age"
                        v-model="caseForm.age"
                        ></v-text-field>
                        <v-textarea
                        solo
                        flat 
                        background-color="#e6ecf0"
                        :rules="validateEmptyRule"
                        class="input-field"
                        label="Symptoms"
                        auto-grow
                        v-model="caseForm.symptoms"
                        ></v-textarea>
                        <v-textarea
                        solo
                        flat 
                        auto-grow
                        background-color="#e6ecf0"
                        :rules="validateEmptyRule"
                        class="input-field"
                        label="Diagnosis"
                        v-model="caseForm.diagnosis"
                        ></v-textarea>
                        <v-textarea
                        solo
                        flat 
                        background-color="#e6ecf0"
                        :rules="validateEmptyRule"
                        class="input-field"
                        label="Treatment"
                        auto-grow
                        v-model="caseForm.treatment"
                        ></v-textarea>
                        <v-textarea
                        solo
                        flat 
                        background-color="#e6ecf0"
                        :rules="validateEmptyRule"
                        class="input-field"
                        label="Details"
                        auto-grow
                        v-model="caseForm.details"
                        ></v-textarea>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                         <v-combobox
                            v-model="caseForm.tags"
                            :items="tags"
                            item-text = "title"
                            item-value = "id"
                            background-color="#e6ecf0"
                            label="Case Tags"
                            chips
                            clearable
                            solo
                            multiple
                        >
                            <template slot="selection" slot-scope="data">
                            <v-chip
                                :selected="data.selected"
                                color="primary"
                                text-color="white"
                                close
                                @input="remove(data.item)"
                            >
                                <strong> # {{ data.item.title }}</strong>&nbsp;
                            </v-chip>
                            </template>
                        </v-combobox>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-btn type="submit">Submit</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                        v-if="loading"
                        ></v-progress-circular>
                        <v-alert
                        :value="alert"
                        type="error"
                        transition="scale-transition"
                        icon="warning"
                        dismissible
                        @click="alert = false"
                        >
                        {{alertText}}
                        </v-alert>
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
            </form>
        </v-card-text>
    </v-card>
</template>
<script>
import firebase from "firebase";
import cases from "@/services/cases";
import tags from "@/services/tags";
export default {
  data() {
    return {
      caseImage: this.case_post.image_url,
      caseImageFile: null,
      snackbar: false,
      snackText: "",
      alert: false,
      tags: [],
      loading: false,
      alertText: "",
      user: JSON.parse(this.$store.getters.user),
      genders: ["male", "female"],
      validateEmptyRule: [v => !!v || "This field can't be empty"],
      caseForm: {
        title: this.case_post.title,
        age: this.case_post.age,
        gender: this.case_post.gender,
        symptoms: this.case_post.symptoms,
        diagnosis: this.case_post.diagnosis,
        treatment: this.case_post.treatment,
        details: this.case_post.details,
        tags: this.case_tags
      }
    };
  },
  props: ["case_post", "case_tags"],
  methods: {
    remove(item) {
      this.caseForm.tags.splice(this.caseForm.tags.indexOf(item), 1);
      this.caseForm.tags = [...this.caseForm.tags];
    },
    getTags() {
      tags.getTags().then(res => {
        let resArr = res.data;
        this.tags = resArr;
      });
    },
    openFilePicker() {
      this.$refs.caseImage.click();
    },
    onFileChange(event) {
      let files = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      this.caseImageFile = files[0];
      reader.addEventListener("load", () => {
        this.loading = false;
        let dataUrl = reader.result;
        this.caseImage = dataUrl;
      });
    },
    submitCase(event) {
      event.preventDefault();
      let errors = [];
      let chosenTags = this.caseForm.tags;
      chosenTags = chosenTags.map(x=>x.id);
      let caseObj = {
        title: this.caseForm.title,
        age: this.caseForm.age,
        gender: this.caseForm.gender,
        symptoms: this.caseForm.symptoms,
        diagnosis: this.caseForm.diagnosis,
        treatment: this.caseForm.treatment,
        tags:chosenTags,
        details: this.caseForm.details
      };
      if (this.caseImage == null) {
        this.alertText = "You must add an image !";
        this.alert = true;
      }
      for (var key in caseObj) {
        if (caseObj[key] == "") {
          errors.push(key);
          this.alertText = `You must specify ${key} `;
          this.alert = true;
        }
      }
      if (errors.length == 0) {
        console.log(this.caseImageFile);
        this.alert = false;
        if (this.caseImageFile == null) {
          cases.editCase(caseObj, this.$route.params.id).then(res => {
            console.log(res.data);
            this.snackText = res.data.message;
            this.snackbar = true;
          });
        } else {
          var uploadTask = firebase
            .storage()
            .ref(
              "/cases/" +
                this.user.email +
                "/" +
                this.caseForm.title +
                "/" +
                new Date().getTime() +
                "_" +
                this.caseImageFile.name
            )
            .put(this.caseImageFile);
          uploadTask.on("state_changed", () => {
            this.loading = true;
          });
          uploadTask.then(() => {
            this.loading = false;
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              let caseImageUrl = downloadURL;
              caseObj.image_url = caseImageUrl;
              cases.editCase(caseObj, this.$route.params.id).then(res => {
                console.log(res.data);
                this.snackText = res.data.message;
                this.snackbar = true;
              });
            });
          });
        }
      }
    }
  },
  created(){
      this.getTags();
  }
};
</script>

<style lang="scss">
#caseImagePreview {
  max-height: 300px;
  object-fit: cover;
}
h2 {
  font-weight: 200;
  font-size: 1.8em;
  font-family: "Roboto", sans-serif;
}
</style>