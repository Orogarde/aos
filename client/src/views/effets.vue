<template>
  <v-container>
     <v-row
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
           <p class="title">Effets :</p>
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
                    <v-text-field  label="blessure :" v-model="selectEffet.blessure" required></v-text-field>
                    <v-text-field  label="nom :" v-model="selectEffet.nom" required></v-text-field>
                    <v-text-field  label="valeur :" v-model="selectEffet.valeur" required></v-text-field>
                    <v-text-field  label="points Aos :" v-model="selectEffet.aosPts" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Fermer</v-btn>
              <v-btn color="blue darken-1" text @click="modif(selectEffet)">Sauvegarder</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-col  
      v-for="(item, i) in groupedEffets"
        :key="i" 
        cols="12"
        md="10"
      >
      <div class="title white--text">{{item[0].modele.nom}}</div>
      <v-data-table
      :headers="headers"
      :items="item"
      class="elevation-1"
            >
              <template v-slot:item.actions="{ item }">
               <v-btn class="mx-2" @click="infos(item)" fab dark x-small color="success">
                  <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="mx-2"  @click="supprimer(item.effetId)" fab dark x-small color="error">
                  <v-icon dark>mdi-delete</v-icon>
                </v-btn>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
          <!-- <v-card
              class="mx-auto"
              max-width="400"
            >

              <v-card-text class="">
                <div class="title">modèle: {{ item.modele.nom }}</div>
                <hr>
                <div class="subtitle-1">Points AOS : {{ item.aosPts }}</div>
                <div class="subtitle-2">blessure : {{item.blessure}}</div>
                <div class="subtitle-2">nom : {{item.nom}}</div>
                <div class="subtitle-2">valeur : {{item.valeur}}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn class="mx-2" @click="infos(item)" fab dark small color="success">
                      <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
                <v-btn class="mx-2"  @click="supprimer(item.effetId)" fab dark small color="error">
                  <v-icon dark>mdi-delete</v-icon>
                </v-btn>
          </v-card-actions>
        </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash'; 
  export default {
    data: () => ({
          headers: [
      {
        text: 'Nom',
        align: 'start',
        value: 'nom',
      },
      {
        text: 'Valeur',
        value: 'valeur'
      },
       {
        text: 'Blessure',
        value: 'blessure'
      },
      {
        text: 'Point',
        value: 'aosPts'
      },
      {
        text:'Actions',
        value:'actions'
      },
    ],
      select:{},
      selectEffet:{},
      dialog: false,
      item:0,
      items:[],
      effets: [],
      groupedEffets: [],
      alignment: 'center',
      justify: 'center',
    }),
    methods: {
      async getEffets() {
        axios({
          url: `${this.$api}/findEffets`,
          method: 'GET'
        })
        .then((res) => {
          res = res.data;
          let group = res;
          group = _.mapValues(_.groupBy(res, 'modeleId'),
            clist => clist.map(effet => _.omit(effet, 'modeleId')));
          console.log(group);
          this.effets = res;
          this.groupedEffets = group;
        })
        .catch(e => console.log(e));
      },
      create(){
        this.$router.push("/createEffet").catch(e => {});
      },
      supprimer(effetId){
      const effetIdSup = effetId;
      axios.post(`${this.$api}/deleteEffet`, {effetIdSup})
        .then((response) => {
          this.getEffets();

        })
        .catch((err) => {
          return new Error(err.message);
        })
      },
      modif(effetUse){
        
       const effetAvantModif = this.effets.find(effet => effetUse.effetId === effet.effetId);
       if (effetUse.nom === effetAvantModif.nom
       && effetUse.valeur === effetAvantModif.valeur
       && effetUse.blessure === effetAvantModif.blessure
       && effetUse.aosPts === effetAvantModif.aosPts
       && this.select.nom === effetAvantModif.modele.nom)
       {
         this.close();
         return;
       }
       if(this.select.nom != effetAvantModif.modele.nom)
       {
         effetUse.modeleId = this.select.modeleId;
       }
       axios({
          url: `${this.$api}/updateEffet`,
          method: 'PUT',
          data: effetUse
        })
        .then(async res => {
          await this.getEffets();
          this.close();
        })
        .catch(e => console.log(e));
      },
      close() {
        this.dialog = false;
        setTimeout(() => {
          this.selectEffet = {};
          this.select = {};
        }, 10);
      },
      infos(item){
        this.getModeles();
        this.select.nom = item.modele.nom;
        this.dialog = true;
        this.selectEffet = _.cloneDeep(item);
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
      await this.getEffets();
    },  
  }
</script>