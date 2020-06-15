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
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="select"
                      :label="`${select.nom}`"
                      :items="items"
                      item-text="nom"
                      item-value="nom"
                      dense
                      outlined
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                    <v-text-field  label="nom :" v-model="selectArme.nom" required></v-text-field>
                    <v-text-field  label="portée :" v-model="selectArme.portee" required></v-text-field>
                    <v-text-field  label="nb attaques :" v-model="selectArme.nb_attaque" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field  label="touche :" v-model="selectArme.touche" required></v-text-field>
                    <v-text-field  label="blesse :" v-model="selectArme.blesse" required></v-text-field>
                    <v-text-field  label="perforation :" v-model="selectArme.perforation" required></v-text-field>
                    <v-text-field  label="degat :" v-model="selectArme.degat" required></v-text-field>
                    <v-text-field  label="points Aos :" v-model="selectArme.aosPts" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="modif(selectArme)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-col  
      v-for="(item, i) in armes"
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
                <div class="title">arme : {{item.nom}}</div>
                <div class="subtitle-1">Points AOS : {{ item.aosPts }}</div>
                <div class="subtitle-2">portée : {{item.portee}}</div>
                <div class="subtitle-2">nb attaques : {{item.nb_attaque}}</div>
                <div class="subtitle-2">touche : {{item.touche}}</div>
                <div class="subtitle-2">blesse : {{item.blesse}}</div>
                <div class="subtitle-2">perforation : {{item.perforation}}</div>
                <div class="subtitle-2">degat : {{item.degat}}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn class="mx-2" @click="infos(item)" fab dark small color="success">
                      <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
                <v-btn class="mx-2"  @click="supprimer(item.armeId)" fab dark small color="error">
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
      selectArme:{},
      dialog: false,
      item:0,
      items:[],
      armes: [],
      alignment: 'center',
      justify: 'center',
    }),
    methods: {
      async getArmes() {
        axios({
          url: `${this.$api}/findArmes`,
          method: 'GET'
        })
        .then((res) => {
          res = res.data;
          this.armes = res;
        })
        .catch(e => console.log(e));
      },
      create(){
        this.$router.push("/createArme").catch(e => {});
      },
      supprimer(armeId){
      const armeIdSup = armeId;
      axios.post(`${this.$api}/deleteArme`, {armeIdSup})
        .then((response) => {
          this.getArmes();

        })
        .catch((err) => {
          return new Error(err.message);
        })
      },
      modif(armeUse){
       const armeAvantModif = this.armes.find(arme => armeUse.armeId === arme.armeId);
       if (armeUse.nom === armeAvantModif.nom
       && armeUse.portee === armeAvantModif.portee
       && armeUse.nb_attaque === armeAvantModif.nb_attaque
       && armeUse.touche === armeAvantModif.touche
       && armeUse.blesse === armeAvantModif.blesse
       && armeUse.perforation === armeAvantModif.perforation
       && armeUse.degat === armeAvantModif.degat
       && armeUse.aosPts === armeAvantModif.aosPts
       && this.select.nom === armeAvantModif.modele.nom)
       {
         this.close();
         return;
       }
       if(this.select.nom != armeAvantModif.modele.nom)
       {
         armeUse.modeleId = this.select.modeleId;
       }
       axios({
          url: `${this.$api}/updateArme`,
          method: 'PUT',
          data: armeUse
        })
        .then(async res => {
          await this.getArmes();
          this.close();
        })
        .catch(e => console.log(e));
      },
      close() {
        this.dialog = false;
        setTimeout(() => {
          this.selectArme = {};
          this.select = {};
        }, 10);
      },
      infos(item){
        this.getModeles();
        this.select.nom = item.modele.nom;
        this.dialog = true;
        this.selectArme = _.cloneDeep(item);
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
      await this.getArmes();
    },  
  }
</script>