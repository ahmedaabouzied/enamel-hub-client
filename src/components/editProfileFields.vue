<template>
    <v-expansion-panel-content>
        <div slot="header">Edit Name and Email</div>
        <v-card>
            <v-container>
                <v-form @submit.prevent="updateUser">
                    <v-layout row>
                        <v-flex xs12>
                                <h4 class="subheading">Email</h4>
                                <v-text-field
                                solo
                                flat
                                v-model="editUser.email"
                                background-color="#e6ecf0"
                                :value="editUser.email"
                                >
                                </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                                <h4 class="subheading">First Name</h4>
                                <v-text-field
                                solo
                                flat
                                :rules="nameRules"
                                required
                                background-color="#e6ecf0"
                                :value="editProfile.first_name"
                                v-model="editProfile.first_name"
                                >
                                </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                                <h4 class="subheading">Last Name</h4>
                                <v-text-field
                                solo
                                flat
                                :rules="nameRules"
                                required
                                background-color="#e6ecf0"
                                v-model="editProfile.last_name"
                                :value="editProfile.last_name"
                                >
                                </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <h4 class="subheading">Gender</h4>
                            <v-select
                            :items="gender"
                            label="Gender"
                            flat
                            solo
                            class="input-field"
                            height="3em"
                            background-color="#e6ecf0"
                            v-model="editProfile.gender"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row text-xs-center>
                        <v-flex xs12>
                            <v-btn type="submit" color="primary">Submit</v-btn>
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
import profile from "@/services/profile";
export default {
  data() {
    return {
      snackbar: false,
      loading: false,
      snackText: "",
      date: null,
      menu: false,
      loading: false,
      gender: ["male", "female"],
      items: [],
      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua &amp; Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia &amp; Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Cayman Islands",
        "Central Arfrican Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Cote D Ivoire",
        "Croatia",
        "Cuba",
        "Curacao",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Polynesia",
        "French West Indies",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Palastein",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauro",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Pierre &amp; Miquelon",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "St Kitts &amp; Nevis",
        "St Lucia",
        "St Vincent",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor L'Este",
        "Togo",
        "Tonga",
        "Trinidad &amp; Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks &amp; Caicos",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (US)",
        "Yemen",
        "Zambia",
        "Zimbabwe"
      ],
      search: null,
      editProfile: {
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
        country: this.profile.country,
        gender: this.profile.gender
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters",
        v => v.length > 1 || "Name must be at leat 2 characters long"
      ],
      genderRules: [v => !!v || "Please select a gender"],
      countryRules: [v => !!v || "Please select a country"],
      dateRules: [v => !!v || "Please Select your birth date"],
      editUser: {
        email: this.user.email
      }
    };
  },
  props: ["user", "profile", "isMine"],
  methods: {
    save: function(date) {
      this.$refs.menu.save(date);
    },
    querySelections: function(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.countries.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    updateUser: function(event) {
      profile.userUpdate(this.updateUser).then(() => {
        profile.update(this.editProfile).then(res => {
          this.snackText = res.data.message;
          this.snackbar = true;
        });
      });
    }
  },
  watch: {
    menu: function(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    search: function(val) {
      val && val !== this.select && this.querySelections(val);
    }
  }
};
</script>

<style>
</style>
