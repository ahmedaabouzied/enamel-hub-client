<template>
    <v-container grid-list-xs text-xs-center>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-card-title><h2>New Case</h2></v-card-title>
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
                                    v-model="caseForm.symptoms"
                                    ></v-textarea>
                                    <v-textarea
                                    solo
                                    flat 
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
                                    v-model="caseForm.treatment"
                                    ></v-textarea>
                                    <v-textarea
                                    solo
                                    flat 
                                    background-color="#e6ecf0"
                                    :rules="validateEmptyRule"
                                    class="input-field"
                                    label="Details"
                                    v-model="caseForm.details"
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-combobox
                                        v-model="caseForm.tags"
                                        :items="tags"
                                        label="Case Tags"
                                        chips
                                        clearable
                                        item-text="title"
                                        item-value="id"
                                        solo
                                        background-color="#e6ecf0"
                                        multiple
                                    >
                                        <template slot="selection" slot-scope="data">
                                        <v-chip
                                            :selected="data.selected"
                                            close
                                            color="primary"
                                            text-color="white"
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
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from "firebase";
import cases from "@/services/cases";
import tags from "@/services/tags";
export default {
  data() {
    return {
      caseImage: null,
      caseImageFile: null,
      snackbar: false,
      snackText: "",
      alert: false,
      loading: false,
      alertText: "",
      user: JSON.parse(this.$store.getters.user),
      genders: ["male", "female"],
      tags: [],
      validateEmptyRule: [v => !!v || "This field can't be empty"],
      caseForm: {
        title: "",
        age: "",
        tags:[],
        gender: "",
        symptoms: "",
        diagnosis: "",
        treatment: "",
        details: ""
      }
    };
  },
  computed: {},
  methods: {
    remove (item) {
        this.caseForm.tags.splice(this.caseForm.tags.indexOf(item), 1)
        this.caseForm.tags = [...this.caseForm.tags]
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
      let chosenTags = this.caseForm.tags;
      chosenTags = chosenTags.map(x=>x.id);
      let errors = [];
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
        this.alert = false;
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
            cases.create(caseObj).then(res => {
              console.log(res.data);
              this.snackText = res.data.message;
              this.snackbar = true;
            });
          });
        });
      }
    }
  },
  created() {
    this.getTags();
  }
};
</script>

<style lang="scss">
#caseImagePreview {
  max-height: 250px;
  widows: 100%;
  object-fit: cover;
}
h2 {
  font-weight: 200;
  font-size: 1.8em;
  font-family: "Roboto", sans-serif;
}
</style>
