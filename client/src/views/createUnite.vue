<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row
        :align="alignment"
        :justify="justify"
      >
         <v-col class="grey lighten-3 border shadow"
            cols="12"
            sm="8"
          >
          <v-row
            :align="alignment"
            :justify="justify"
          >
            <v-col class="my-5"
              cols="9"
              md="8"
            >
            <p class="display-1 indigo--text font-weight-bold">Création unité</p>
            </v-col>
          </v-row>
          <v-row
            :align="alignment"
            :justify="justify"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="description"
                :rules="Rules"
                :counter="25"
                color="success"
                label="description"
                outlined
                required
              ></v-text-field>
              <v-select
                v-model="select"
                label="Battletomes"
                :items="items"
                item-text="description"
                item-value="battletomeId"
                dense
                outlined
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="cout_min"
                :rules="Rules"
                :counter="25"
                color="success"
                label="cout min"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="cout_max"
                :rules="Rules"
                :counter="25"
                color="success"
                label="cout max"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="taille_min"
                :rules="Rules"
                :counter="25"
                color="success"
                label="taille min"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="taille_max"
                :rules="Rules"
                :counter="25"
                color="success"
                label="taille max"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="taille_critique"
                :rules="Rules"
                :counter="25"
                color="success"
                label="taille critique"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
                
          <v-row
            :align="alignment"
            :justify="justify"
          >   
            <v-col
              cols="12"
              sm="8" 
            >
            <v-file-input
                v-model="visuel"
                placeholder="Upload your documents"
                label="File input"
              >
              </v-file-input>
                <!--<img style="" :src="previ" alt="">-->
               <!--<input @change="handleImage" class="custom-input" type="file" accept="image/*"> -->
            </v-col>

          </v-row>
          <v-row
            :align="alignment"
            :justify="justify"
          >

            <v-col class="mt-5 text-center" 
            cols="12" 
            sm="8">
            <div class="my-2">
              <v-btn x-large color="success"
              :disabled="!valid"
              @click="validate">Valider</v-btn>
            </div>
            </v-col>
          </v-row>
         </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import axios from 'axios';
  import md5 from 'md5';
  export default {
    data: () => ({
      valid: false,
      select:'',
      items:[],
      description: '',
      cout_min:'',
      cout_max:'',
      taille_min:'',
      taille_max:'',
      taille_critique:'',
      visuel:{},
      previ:{},
      Rules: [
        v => !!v || 'input is required',
        v => v.length <= 25 || 'input must be less than 10 characters',
      ],
      alignmentsAvailable: [
          'start',
          'center',
          'end',
          'baseline',
          'stretch',
        ],
        alignment: 'center',
        dense: false,
        justifyAvailable: [
          'start',
          'center',
          'end',
          'space-around',
          'space-between',
        ],
        justify: 'center',
    }),
    methods: {
      validate () {
        const unit = {
          description: this.description,
          visuel_unit: this.visuel.name,
          cout_min: this.cout_min,
          cout_max: this.cout_max,
          taille_min: this.taille_min,
          taille_max: this.taille_max,
          taille_critique: this.taille_critique,
          battletomeId: this.select.battletomeId,
        }
        axios({
          url: `${this.$api}/createUnite`,
          method: 'POST',
          data: unit
        })
        .then((res) => {
            this.handleImage();
            this.$router.push('/unites').catch(e => {});
        })
        .catch(e => console.log(e));
      },
      handleImage() {
       // console.log(this.visuel);
        const selectedImage = this.visuel;
        this.createBase64Image(selectedImage);
      },
      createBase64Image(fileObject){
        const reader = new FileReader();
        //console.log('reader', reader);
        reader.onload = () => {
          //this.previ = reader.result;
          const visuFinal = this.visuel;
          this.visuFinal = reader.result;
          this.uploadImage();
        };
        //console.log(typeof(this.visuel));
        reader.readAsDataURL(fileObject);

      },
      uploadImage() {
      const { visuFinal } = this;
      const name = this.visuel.name;
      //console.log(visuel);
      axios({
          url: `${this.$api}/upload`,
          method: 'POST',
          data: [{visuFinal} , name]
        })
        .then((response) => {
          console.log(name);
          this.remoteUrl = response.data.url;
        })
        .catch((err) => {
          return new Error(err.message);
        })
    },
    async getBattleTomes() {
        axios({
          url: `${this.$api}/findBattletomes`,
          method: 'GET'
        })
        .then((res) => {
          res = res.data;
          this.items = res;
        })
        .catch(e => console.log(e));
      },
    },
    async mounted() {
      await this.getBattleTomes();
    },  
  }
</script>
<style lang="scss">
 .border {
   border : solid 3px #ffffff;
   border-radius: 5%;
 } 
 .shadow {
   -webkit-box-shadow: 10px 4px 51px -3px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 4px 51px -3px rgba(0,0,0,0.75);
    box-shadow: 10px 4px 51px -3px rgba(0,0,0,0.75);
 }
</style>