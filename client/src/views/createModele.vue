<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row
        :align="alignment"
        :justify="justify"
      >
         <v-col class="border shadow"
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
            <p class="display-1 white--text">Création modèle</p>
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
                v-model="nom"
                :rules="Rules"
                :counter="100"
                color="success"
                label="nom"
                outlined
                required
              ></v-text-field>
              <v-select
                v-model="select"
                label="Unité"
                :items="items"
                item-text="description"
                item-value="uniteId"
                dense
                outlined
                persistent-hint
                return-object
                single-line
              ></v-select>
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
      nom: '',
      Rules: [
        v => !!v || 'input is required',
        v => v.length <= 100 || 'input must be less than 10 characters',
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
        const model = {
          nom: this.nom,
          uniteId: this.select.uniteId,
        }
        axios({
          url: `${this.$api}/createModele`,
          method: 'POST',
          data: model
        })
        .then((res) => {
            this.$router.push('/modeles').catch(e => {});
        })
        .catch(e => console.log(e));
      },
    async getUnites() {
        axios({
          url: `${this.$api}/findUnites`,
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
      await this.getUnites();
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