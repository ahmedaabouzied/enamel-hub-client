<template>
    <v-container grid-list-xs text-xs-center>
        <form @submit="register">
            <v-text-field
            v-model="signUpForm.firstName"
            label="First Name"
            class="input-field"
            :rules="nameRules"
            required
            flat
            solo
            height="3em"
            background-color="#e6ecf0"
            >
            </v-text-field>
            <v-text-field
            v-model="signUpForm.lastName"
            label="Last Name"
            class="input-field"
            :rules="nameRules"
            required
            flat
            solo
            height="3em"
            background-color="#e6ecf0"
            >
            </v-text-field>
            <v-select
            :items="gender"
            label="Gender"
            flat
            solo
            class="input-field"
            height="3em"
            background-color="#e6ecf0"
            v-model="signUpForm.gender"
            ></v-select>
            <v-text-field
            v-model="signUpForm.email"
            label="Email"
            :rules="emailRules"
            class="input-field"
            required
            flat
            solo
            height="3em"
            background-color="#e6ecf0"
            >
            </v-text-field>
            <v-text-field
            v-model="signUpForm.password"
            label="Password"
            class="input-field"
            type="password"
            :rules="passwordRules"
            required
            flat
            solo
            height="3em"
            background-color="#e6ecf0"
            >
            </v-text-field>
            <v-text-field
            v-model="signUpForm.retypePassword"
            label="Re-enter password"
            class="input-field"
            type="password"
            required
            :rules="retypePassRules"
            flat
            solo
            height="3em"
            background-color="#e6ecf0"
            >
            </v-text-field>
            <v-autocomplete
            :items="items"
            :search-input.sync="search"
            v-model="signUpForm.country"
            cache-items
            required
            class="input-field-select input-field"
            background-color="#e6ecf0"
            hide-no-data
            solo 
            flat
            hide-details
            label="Country"
            :rules="countryRules"
            ></v-autocomplete>
            <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
            >
            <v-text-field
            slot="activator"
            v-model="date"
            class="input-field"
            solo
            flat
            :rules="dateRules"
            background-color="#e6ecf0"
            label="Birth date"
            readonly
            ></v-text-field>
            <v-date-picker
            ref="picker"
            v-model="date"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
            ></v-date-picker>
            </v-menu>
            <div class="submit">
            <v-btn type="submit" round class="submit_button" color="primary">Sign UP</v-btn>
            <h4 class="login_form_text">Already a member ?</h4>
            <a href="/login" class="login_form_text"><h4>Login</h4></a>
            </div>
        </form>
    </v-container>
</template>

<script>
import basicCard from "@/components/basicCard";
import AuthService from "@/services/auth";
export default {
  components: {},
  data: function() {
    return {
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
      signUpForm: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        country: "",
        gender: ""
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
      retypePassRules: [
        v => !!v || "Please re-enter the password",
        v => v == this.signUpForm.password || "Passwords don't match"
      ],
      genderRules: [v => !!v || "Please select a gender"],
      countryRules: [v => !!v || "Please select a country"],
      dateRules: [v => !!v || "Please Select your birth date"],
      passwordRules: [
        v =>
          /(?=.*[a-z])/.test(v) ||
          "Password must have at least one lowercase character",
        v =>
          /(?=.*[0-9])/.test(v) || "Password must contain at least one number",
        v =>
          /(?=.{8,})/.test(v) || "Password must be eight characters or longer"
      ]
    };
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    register(event) {
      event.preventDefault();
      let singUpObj = {
        first_name: this.signUpForm.firstName,
        last_name: this.signUpForm.lastName,
        email: this.signUpForm.email,
        country: this.signUpForm.country,
        date_of_birth: this.date,
        gender: this.signUpForm.gender,
        password: this.signUpForm.password
      };
      console.log(singUpObj);
      AuthService.register(singUpObj)
        .then(res => {
          console.log(res.data);

          this.$store.dispatch("setToken", res.data.token).then(res => {
            console.log("token is set");
          });
          this.$store
            .dispatch("setUser", JSON.stringify(res.data.user))
            .then(res => {
              console.log("user is set");
            });
          this.$store
            .dispatch("setProfile", JSON.stringify(res.data.profile))
            .then(res => {
              console.log("profile is set");
            });
          this.$store.dispatch("logIn").then(() => {
            this.$router.push("/");
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.countries.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss">
.input-field-select {
  margin-bottom: 5% !important;
}
.input-field .v-input__slot {
  border-radius: 15px !important;
  padding: 3%;
}
.submit_button {
  width: 95%;
  height: 3em;
}
.submit {
  padding: 3%;
}
.login_form_text {
  color: rgba(0, 0, 0, 0.87);
  text-decoration: none;
}
@media (min-width: 600px) {
  .input-field {
    width: 100%;
  }
}
</style>
