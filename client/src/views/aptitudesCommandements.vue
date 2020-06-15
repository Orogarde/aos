<template>
  <v-container>
     <v-row
        :align="alignment"
        :justify="justify"
      >
        <v-col
        cols="12"
        sm="12"
      >
        <div class="text-left">
        <v-btn rounded color="success" @click="create()" dark>Création</v-btn>
        </div>
        <div>
           <p class="title">Aptitudes de commandements :</p>
        </div>
      </v-col>
          <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Modifications</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row
                :align="alignment"
                :justify="justify">
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="select"
                      :label="`${select.nom}`"
                      :items="items"
                      item-text="nom"
                      item-value="3"
                      dense
                      outlined
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                    <v-text-field  label="sauvegarge :" v-model="selectAptitude.nom" required></v-text-field>
                    <v-text-field  label="blessure :" v-model="selectAptitude.effet" required></v-text-field>
                    <v-text-field  label="points Aos :" v-model="selectAptitude.aosPts" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="modif(selectAptitude)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-col  
      v-for="(item, i) in aptitudes"
                :key="i" 
        cols="12"
        md="4"
      >
          <v-card
              class="mx-auto"
              max-width="400"
            >

              <v-card-text class="">
                <div class="title">modèle: {{ item.modele.nom }}</div>
                <hr>
                <div class="subtitle-1">Points AOS : {{ item.aosPts }}</div>
                <div class="subtitle-2">nom : {{item.nom}}</div>
                <div class="subtitle-2">effet : {{item.effet}}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn class="mx-2" @click="infos(item)" fab dark small color="success">
                      <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
                <v-btn class="mx-2"  @click="supprimer(item.aptitudeCId)" fab dark small color="error">
                  <v-icon dark>mdi-delete</v-icon>
                </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash'; 
  export default {
    data: () => ({
      select:{},
      selectAptitude:{},
      dialog: false,
      item:0,
      items:[],
      aptitudes: [],
      alignment: 'center',
      justify: 'center',
    }),
    methods: {
      async getAptitudes() {
        axios({
          url: `${this.$api}/findAptitudesCommandements`,
          method: 'GET'
        })
        .then((res) => {
          res = res.data;
          this.aptitudes = res;
        })
        .catch(e => console.log(e));
      },
      create(){
        this.$router.push("/createAptitudeCommandement").catch(e => {});
      },
      supprimer(aptitudeCId){
      const aptitudeIdSup = aptitudeCId;
      axios.post(`${this.$api}/deleteAptitudeCommandement`, {aptitudeIdSup})
        .then((response) => {
          this.getAptitudes();

        })
        .catch((err) => {
          return new Error(err.message);
        })
      },
      modif(aptitudeUse){
       const aptitudeAvantModif = this.aptitudes.find(aptitude => aptitudeUse.aptitudeCId === aptitude.aptitudeCId);
       if (aptitudeUse.nom === aptitudeAvantModif.nom
       && aptitudeUse.effet === aptitudeAvantModif.effet
       && aptitudeUse.aosPts === aptitudeAvantModif.aosPts
       && this.select.nom === aptitudeAvantModif.modele.nom)
       {
         this.close();
         return;
       }
       if(this.select.nom != aptitudeAvantModif.modele.nom)
       {
         aptitudeUse.modeleId = this.select.modeleId;
       }
       axios({
          url: `${this.$api}/updateAptitudeCommandement`,
          method: 'PUT',
          data: aptitudeUse
        })
        .then(async res => {
          await this.getAptitudes();
          this.close();
        })
        .catch(e => console.log(e));
      },
      close() {
        this.dialog = false;
        setTimeout(() => {
          this.selectAptitude = {};
          this.select = {};
        }, 10);
      },
      infos(item){
        this.getModeles();
        this.select.nom = item.modele.nom;
        this.dialog = true;
        this.selectAptitude = _.cloneDeep(item);
      },
        async getModeles() {
        axios({
          url: `${this.$api}/findModeles`,
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
      await this.getAptitudes();
    },  
  }
</script>