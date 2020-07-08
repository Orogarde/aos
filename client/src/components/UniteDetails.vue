<template>
  <v-container>
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="indigo"
        dark
        center-active
        show-arrows
      >
        <v-tab @click="calcul(item.armes)"
          v-for="item in Unites"
          :key="item.tab"
        >
          {{ item.nom }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in Unites"
          :key="item.tab"
        >
          <v-card flat>
            <v-tabs vertical 
             background-color="indigo"
             dark
             >
              <v-tab>
                <v-icon left>mdi-account</v-icon>
                PROFIL
              </v-tab>
              <v-tab  @click="calcul(item.armes)">
                <v-icon left>mdi-share-variant</v-icon>
                GRAPHIQUE
              </v-tab>
               <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-list>
                  <span class="title text-center indigo--text">Profil :</span>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="(model, i) in item.profils"
                      :key="i"
                    >
                      <v-list-item-content class="b-indigo subtitle-2">
                        <v-list-item-title>Sauvegarde : {{model.sauvegarde}} +</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content class="b-indigo subtitle-2">
                        <v-list-item-title>Bravoure : {{model.bravoure}}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content class="b-indigo subtitle-2">
                        <v-list-item-title>Mouvement : {{model.mouvement}} "</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content class="b-indigo subtitle-2">
                        <v-list-item-title>Blessure : {{model.blessure}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <v-simple-table dark>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center">Armes</th>
                        <th class="text-center">Portée</th>
                        <th class="text-center">Attaques</th>
                        <th class="text-center">Toucher</th>
                        <th class="text-center">Blesser</th>
                        <th class="text-center">Perf</th>
                        <th class="text-center">Dégâts</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="model in item.armes" :key="model.nom">
                        <td>{{ model.nom }}</td>
                        <td>{{ model.portee }} "</td>
                        <td>{{ model.nb_attaque }}</td>
                        <td>{{ model.touche }} +</td>
                        <td>{{ model.blesse }} +</td>
                        <td>- {{ model.perforation }}</td>
                        <td>{{ model.degat }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-row justify="center">
                  <v-col  v-if="!empty(item.aptitude_commandements)"
                    cols="12"
                    sm="6"
                  >
                  <div class="title indigo--text">Aptitudes :</div>
                  <v-row justify="center">
                      <v-expansion-panels popout>
                        <v-expansion-panel
                          v-for="(model,i) in item.aptitudes"
                          :key="i"
                        >
                          <v-expansion-panel-header class=" indigo--text">{{model.nom}}</v-expansion-panel-header>
                          <v-expansion-panel-content class="panel-color">
                            {{model.effet}}
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-row>
                  </v-col>
                  <v-col v-else
                    cols="12"
                    sm="12"
                  >
                <div class="title indigo--text">Aptitudes :</div>
                  <v-row justify="center">
                      <v-expansion-panels popout>
                        <v-expansion-panel
                          v-for="(model,i) in item.aptitudes"
                          :key="i"
                        >
                          <v-expansion-panel-header class=" indigo--text">{{model.nom}}</v-expansion-panel-header>
                          <v-expansion-panel-content class="panel-color">
                            {{model.effet}}
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-row>
                  </v-col>
                  <v-col  v-if="!empty(item.aptitude_commandements)"
                    cols="12"
                    sm="6"
                  > 
                  <div class="title indigo--text">Aptitudes de commandements :</div>
                    <v-row justify="center">
                      <v-expansion-panels popout>
                        <v-expansion-panel
                          v-for="(model,i) in item.aptitude_commandements"
                          :key="i"
                        >
                          <v-expansion-panel-header class=" indigo--text">{{model.nom}}</v-expansion-panel-header>
                          <v-expansion-panel-content class="panel-color">
                            {{model.effet}}
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row justify="center" v-if="!empty(item.effets)">
                    <div class="title indigo--text">Tableau dégressif :</div>
                      <v-expansion-panels popout>
                        <v-expansion-panel>
                          <!-- <v-expansion-panel-header @click="Tri(item.effets)">effets</v-expansion-panel-header> -->
                          <v-expansion-panel-header class=" indigo--text" @click="Tri(item.effets)">Tableau de dégâts</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-simple-table dark>
                                <template v-slot:default>
                                  <thead>
                                    <tr>
                                      <th class="text-center">Blessures</th>
                                      <th class="text-center" v-for="model in nomsEffets" :key="model.id">{{model}}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="model in blessuresEffets" :key="model.blessure">
                                      <td>{{ model.blessure }}</td>
                                      <td v-for="val in model.datas" :key="val.nom">{{ val.valeur }}</td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                      <div>
                          <span class="title text-center indigo--text">Graphiques :</span>
                      </div>
                  </v-card-text>
                   <v-row align="center"
                          justify="center">
                    <v-col v-for="data in datacollection" :key="data.armeId"
                      lg=6
                      md=10
                      sm=8
                    >
                          <bar-chart :chart-data="data.degats"></bar-chart>
                      </v-col>
                    </v-row>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
  </v-card>
  </v-container>
</template>
<script>
import { RadialMenu,  RadialMenuItem } from 'vue-radial-menu'
import axios from 'axios';
import _ from 'lodash'; 
import UniteDetails from '../components/UniteDetails'
import { Bar } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import BarChart from './BarChart.js'
export default {
  extends: Bar,
  extends: Line,
  name: "UniteDetails",
  components: {
    RadialMenu,
    RadialMenuItem,
    BarChart,
  },
  props:{
    idUnite:'',
    options:'',
  },
  data () {
    return {
      // chart:'',
      // damage:[],
      // canvas: document.getElementsByClassName('bar-chart'),
      tab: null,
      lastClicked: '',
      Unites:[''],
      api: '',
      nomsEffets: [],
      blessuresEffets: [],
      data: null,
      datacollection:null,
    }
  },
  methods: {

    async getUnites() {
    const uniteId= {
      id : this.idUnite,
    };
    this.api = this.$api;
    axios({
      url: `${this.api}/findUnitesDetails`,
      method: 'Post',
      data: uniteId,
    })
    .then(async (res) => {
      //console.log(res);
      res = res.data;
      this.Unites = res;
      //console.log(typeof this.Unites[0].effets);
    })
    .catch(e => console.log(e));
  },
  handleClick (item) {
      this.lastClicked = item;
    },
  Tri(item){
    item = _.sortBy(item, ['nom']);
    const tab = _.mapValues(_.groupBy(item, 'nom'));
    this.nomsEffets = Object.keys(tab);
    let blessures = _.mapValues(_.groupBy(item, 'blessure'));
    blessures = Object.entries(blessures);
    blessures = blessures.map(blessure => {
      let datas = blessure[1].map(data => {return {nom: data.nom, valeur: data.valeur}});
      datas = _.sortBy(datas, ['nom']);
      return {blessure: blessure[0], datas};
    })
    this.blessuresEffets = blessures;
  },
  calcul(armes) {
    let armesMod = _.cloneDeep(armes);
    armesMod = armes.map(arme => {
      const tableau_degats = this.degat_arme(arme);
      return {armeId: arme.armeId, degats: {
        labels:["1+","2+","3+","4+","5+","6+"],
        datasets: [
          {
            label : "degats "+arme.nom,
            backgroundColor: "#1A237E",
            hoverBackgroundColor: "#303F9F",
            data: tableau_degats,
          }
        ]}};
    });
      //console.log(armesMod);
      this.datacollection = armesMod;
  },
  degat_arme(arme) {
    //console.log('arme', arme);
    const degats = [];
    for (let i = 1; i<= 6; i++) {
      let chancesTotale = 0;
      // attaques
      let compteur = 0;
      let nbr_attaque = 0;
      if (arme.nb_attaque.match('D')) {
        const nbr = arme.nb_attaque.split('D')[0] || 1;
        const val = arme.nb_attaque.split('D')[1];
        while(compteur <= 500) {
          for (let j = 1; j<= nbr; j++) {
            nbr_attaque += Math.floor(Math.random() * Math.floor(6));
          };
          compteur++;
        };
        nbr_attaque = nbr_attaque/500;
      } else {
        nbr_attaque = arme.nb_attaque;
      };
      // chances toucher
      chancesTotale = nbr_attaque * ((6 - (arme.touche -1)) / 6);
      // chances blesser
      chancesTotale *= ((6 - (arme.blesse -1)) / 6);
      // perforation
      const perfo = (i - 1 + parseInt(arme.perforation)) <= 6 ? (i - 1 + parseInt(arme.perforation)) : 6;


      //// autre calcul ////
      chancesTotale *= (1 - ((6 - perfo) / 6));
      //// autra calcul ////

      
      // degats
      let compteur_d = 0;
      let degat_count = 0;
      if (arme.degat.match('D')) {
        const nbr = arme.degat.split('D')[0] || 1;
        const val = arme.degat.split('D')[1];
        while(compteur_d <= 500) {
          for (let j = 1; j<= nbr; j++) {
            degat_count += Math.floor(Math.random() * Math.floor(6));
          };
          compteur_d++;
        };
        degat_count = degat_count/500;
      } else {
        degat_count = arme.degat;
      };
      //console.log(degat_count);
      degats.push(chancesTotale*degat_count);
    };
    return degats;
  },
  empty(item)
  {
    return _.isEmpty(item);
  },
},
  async mounted() {
      await this.getUnites();
    },
}
</script> 
<style>
.sizeChange{
  width: 100%;
  height: 100%;
  transition: width 1s, height 1s;
}
.sizeChange:hover{
  width: 250px !important;
  height: 250px !important;
  /* left:-200px; */
}
.selectRadial:hover{
    z-index: 99999999999999999999 !important;
}
.border-black:hover {
   border: solid 2px #000000;
   transition: width 1s, height 1s;
}
.b-indigo{
  border: solid 2px #3F51B5;
  border-radius: 10%;
  margin:3px;
  background-color: #3F51B5;
  color : #ffffff;
}
.panel-color{
  background-color: #3F51B5;
  color : #ffffff;
  padding-top:4px;
}

</style>