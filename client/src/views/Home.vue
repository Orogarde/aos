<template>
  <v-container>
     <v-row v-if="result == false"
        :justify="justify"
      >
      <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">choix nom :</v-card-title>
             <v-text-field
                label="Nom"
                single-line
                v-model="nomUnitSelected"
              ></v-text-field>
               <v-select v-if="listeNomsUnitSelected.length != [] "
                v-model="truc"
                label="sélectionnez une unité"
                :items="listeNomsUnitSelected"
                item-text="nom"
                item-value="nom"
                dense
                outlined
                persistent-hint
                return-object
                single-line
              ></v-select>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="ajout() , close()">OK</v-btn>
              <v-btn color="green darken-1" text @click="close()">fermer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-col
        cols="12"
        sm="12"
      >
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            label="recherche"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="12"
            md="6"
            lg="4"
          >
            <v-card class=" scroll pa-3">
              <v-card-title class="teal--text border-r d-inline-flex align-center rounded font-weight-bold">{{ item.description }}</v-card-title>
                <v-spacer></v-spacer>
                 <v-card-title class="white--text border-r d-inline-flex align-center teal darken-4 py-0 subtitle-1 mb-2">{{item.battletome.description}}</v-card-title>

              <v-divider></v-divider>

              <!-- <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
                  <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === key }">{{ item[key.toLowerCase()] }}</v-list-item-content>
                </v-list-item>
              </v-list> -->
               <div v-for="model in item.modeles"
                :id="model.modeleId"
                :key="model.modeleId" class="text-center border my-2"
                v-bind:class="{ blueColor: choixColorBlue(model.modeleId), pinkColor: choixColorPink(model.modeleId),mixColor: colorMix(model.modeleId) }">
                <span
                  class="font-weight-bold d-inline-flex align-center justify-center pa-1 "
                >
                  {{model.nom}}
                </span>
                <v-spacer></v-spacer>
                <v-chip v-if="model.est_special"
                  class="ma-2" color="secondary"
                >
                  special
                   <v-icon right>mdi-star</v-icon>
                </v-chip>
                 <v-spacer></v-spacer>
                 <v-btn @click="nomUnit(model,'1',item)" class="mx-2" fab dark small color="indigo">
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn> 
                <v-btn @click="nomUnit(model,'2',item)" class="mx-2" fab dark small color="pink">
                      <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
               </div>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="black--text">unités par page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} sur {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
      </v-col>
      <v-col
        cols="12"
        sm="12"
      >
        <v-expansion-panels popout>
          <v-expansion-panel>
            <v-expansion-panel-header class="white--text font-weight-bold indigo">Equipe 1</v-expansion-panel-header>
            <v-expansion-panel-content class="panel-color indigo">
              <v-simple-table dark>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">Nom</th>
                    <th class="text-center">Nombres</th>
                    <th class="text-center">Coût</th>
                    <th class="text-center">Suppression</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="py-2" v-for="(item,i) in team1" :key="i">
                    <td class="white--text">unité : {{ item.nom }}
                      <v-spacer></v-spacer>
                      <span>({{item.unites[0].nom}})</span>
                    </td>
                    <td>{{ item.nb }}</td>
                    <td>{{ item.cout_total }}</td>
                    <td> 
                      <v-btn color="warning"  @click="supprimer(item,'1')"  fab x-small dark>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <div class="pt-4">
                <p class="font-weight-bold text-right white--text">
                  Coût Team 1 : {{CalculCoutTeam1}} points
                </p>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-spacer class="py-2"></v-spacer>
         <v-expansion-panels popout>
          <v-expansion-panel>
            <v-expansion-panel-header class="white--text font-weight-bold pink darken-3">Equipe 2</v-expansion-panel-header>
            <v-expansion-panel-content class="panel-color pink darken-3">
              <v-simple-table dark>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">Nom</th>
                    <th class="text-center">Nombres</th>
                    <th class="text-center">Coût</th>
                    <th class="text-center">Suppression</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="py-2" v-for="(item,i) in team2" :key="i">
                    <td class="white--text">unité : {{ item.nom }}
                      <v-spacer></v-spacer>
                      <span>({{item.unites[0].nom}})</span>
                    </td>
                    <td>{{ item.nb }}</td>
                    <td>{{ item.cout_total }}</td>
                    <td> 
                      <v-btn color="warning"  @click="supprimer(item,'2')"  fab x-small dark>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <div class="pt-4">
                <p class="font-weight-bold text-right white--text">
                  Coût Team 2 : {{CalculCoutTeam2}} points
                </p>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div class="my-2">
            <v-btn color="warning" @click="Calcul()" dark>Valider</v-btn>
        </div>
      </v-col>
     </v-row>
     <ResultatComparateur v-if="result" 
     :team1="team1" :team2="team2" 
     :team1_cout_aos="team1_cout_aos" :team2_cout_aos="team2_cout_aos"
     :CalculCoutTeam1='CalculCoutTeam1' :CalculCoutTeam2="CalculCoutTeam2"
     />
     <v-btn v-if="result" @click="returnHome()"
          color="pink"
          dark
          small
          top
          left
          fab
          >
          <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash';
  import ResultatComparateur from '../components/ResultatComparateur'
  export default {
     components: {
    ResultatComparateur,
  },
    data: () => ({
      result:false,
      truc:'',
      listeNomsUnitSelected:[],
      nomUnitSelected:"",
      dialog:false,
      selectedUnit:[],
      api: '',
      tabColor1:[],
      tabColor2:[],
      dialog: false,
      datas: [],
      alignment: 'center',
      justify: 'center',
            itemsPerPageArray: [3, 6, 9],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 3,
        sortBy: 'description',
        keys: [
          'Name',
          'Modele',
        ],
        items: [],
        team1 :[],
        team1_cout_aos: 0,
        team2_cout_aos: 0,
        team2 :[],
    }),
     computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
      CalculCoutTeam1(){
  
        let equipe1 = _.cloneDeep(this.team1)
        let coutFinal = 0;
        equipe1.forEach(element => {
          coutFinal += element.cout_total;
        });
        return coutFinal;
      },
      CalculCoutTeam2(){
  
        let equipe1 = _.cloneDeep(this.team2)
        let coutFinal = 0;
        equipe1.forEach(element => {
          coutFinal += element.cout_total;
        });
        return coutFinal;
      }
    },
    methods: {
      async getBattleTomes() {
        this.api = this.$api;
        axios({
          url: `${this.api}/findBattletomesAndUnits`,
          method: 'GET'
        })
        .then(async (res) => {
          res = res.data;
          this.items = res;
          // this.datas = res;
          // this.items = this.datas.map(data=> {
          //   return{uniteId: data.uniteId, description: data.description,modele : data.modeles}
          // })
        })
        .catch(e => console.log(e));
      },
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      nomUnit(item,equipe,unite){
        if (this.team1.length && equipe==='1') {
          // affiche la liste
          this.listeNomsUnitSelected = [];
          let filtred = _.cloneDeep(this.team1)
          let noms = [];
          filtred.forEach(element => {
           if(element.uniteId == unite.uniteId)
           noms.push(element.nom);
          });
          //console.log("noms : ",noms);
          // filtrer sur l'id unit
          this.listeNomsUnitSelected = noms;

        };
        if (this.team2.length && equipe==='2') {
          // affiche la liste
          this.listeNomsUnitSelected = [];
          let filtred = _.cloneDeep(this.team2)
          let noms = [];
          filtred.forEach(element => {
           if(element.uniteId == unite.uniteId)
           noms.push(element.nom);
          });
          //noms = noms.filter(this.team1.)
          // filtrer sur l'id unit
          this.listeNomsUnitSelected = noms;

        };
        this.dialog=true;
        this.listeNomsUnitSelected
        this.selectedUnit =[];
        this.selectedUnit=[item,equipe,unite];
      },
      close() {
        this.dialog = false;
        setTimeout(() => {
          this.nomUnitSelected = '';
          this.listeNomsUnitSelected = [];
          this.truc = '';
        }, 10);
      },
      ajout()
      { 
        const [item, equipe, unite] = this.selectedUnit;
        const nomUnitSelected = this.nomUnitSelected || this.truc;
        let modeleUse = _.cloneDeep(item);
        if (equipe === '1') {

          // if (!modeleUse.est_special) {
          //   findTeam1.nb += unite.taille_min;
          //   const cout = unite.cout_min;
          //   findTeam1.cout_total += cout;
          // }
          const teamsUnit = this.team1.find(item => item.nom === nomUnitSelected);
          this.tabColor1.push(modeleUse.modeleId);
          if (teamsUnit) {
            if (!modeleUse.est_special) {
              if (teamsUnit.nb === unite.taille_max) {
                alert("unité deja complete ");
                return;
              }
              teamsUnit.nb += unite.taille_min;
              teamsUnit.cout_total += unite.cout_min;
            } 
            if(teamsUnit.nb === unite.taille_critique) teamsUnit.cout_total = unite.cout_max;
            teamsUnit.unites.push(modeleUse);
            //cout et cout_total (teamsUnit.cout_total += cout)
          }
          if (!teamsUnit) {
            const unit = {};
            unit.visu = unite.battletome.visuel;
            unit.visuUnit = unite.visuel;
            unit.uniteId = unite.uniteId;
            unit.nom = nomUnitSelected;
            unit.unites = [];
            unit.taille_min = unite.taille_min;
            if (!modeleUse.est_special) {
                unit.nb = unite.taille_min;
                unit.cout_total = unite.cout_min;
            } else { 
                unit.nb = 0;
                unit.cout_total = 0;
            }
            unit.unites.push(modeleUse);
            // ajouter cout et cout_total dans unit
            this.team1.push(unit);
          }
          return;

        }
         if (equipe === '2') {

          // if (!modeleUse.est_special) {
          //   findTeam1.nb += unite.taille_min;
          //   const cout = unite.cout_min;
          //   findTeam1.cout_total += cout;
          // }
          const teamsUnit = this.team2.find(item => item.nom === nomUnitSelected);
          this.tabColor2.push(modeleUse.modeleId);
          if (teamsUnit) {
            if (!modeleUse.est_special) {
              if (teamsUnit.nb === unite.taille_max) {
                alert("unité deja complete ");
                return;
              }
              teamsUnit.nb += unite.taille_min;
              teamsUnit.cout_total += unite.cout_min;
            } 
            if(teamsUnit.nb == unite.taille_critique) teamsUnit.cout_total = unite.cout_max;
            teamsUnit.unites.push(modeleUse);
            //cout et cout_total (teamsUnit.cout_total += cout)
          }
          if (!teamsUnit) {
            const unit = {};
            unit.visu = unite.battletome.visuel;
            unit.visuUnit = unite.visuel;
            unit.uniteId = unite.uniteId;
            unit.nom = nomUnitSelected;
            unit.unites = [];
            unit.taille_min = unite.taille_min;
            if (!modeleUse.est_special) {
                unit.nb = unite.taille_min;
                unit.cout_total = unite.cout_min;
            } else { 
                unit.nb = 0;
                unit.cout_total = 0;
            }
            unit.unites.push(modeleUse);
            // ajouter cout et cout_total dans unit
            this.team2.push(unit);
          }
          return;

        }
      },
      choixColorBlue(modeleUse){

        const find1 = this.tabColor1.find(color => modeleUse == color);
        const find2 = this.tabColor2.find(color => modeleUse == color);
        if(find1 && !find2)return true ;
      },
      choixColorPink(modeleUse){
        const find1 = this.tabColor1.find(color => modeleUse == color);
        const find2 = this.tabColor2.find(color => modeleUse == color);
        if(find2 && !find1)return true ;
      },
      colorMix(modeleUse){
        const find1 = this.tabColor1.find(color => modeleUse == color);
        const find2 = this.tabColor2.find(color => modeleUse == color);
        if(find1 && find2)return true;

      },
      supprimer(item,equipe){
        if(equipe === '1')
        {
          item.unites.forEach(element => {
            if(this.tabColor1.find(color => element.modeleId == color))
            {
              const posColor = this.tabColor1.indexOf(element.modeleId);
              this.tabColor1.splice(posColor,1);
            };
          });
          const pos = this.team1.indexOf(item);
          this.team1.splice(pos,1);
        }
        if(equipe === '2')
        {
           item.unites.forEach(element => {
            if(this.tabColor2.find(color => element.modeleId == color))
            {
              const posColor = this.tabColor2.indexOf(element.modeleId);
              this.tabColor2.splice(posColor,1);
            };
          });
          const pos = this.team2.indexOf(item);
          this.team2.splice(pos,1);
        }
      },
      Calcul(){
        this.team1_cout_aos = 0;
        this.team2_cout_aos = 0;
        const teams = [this.team1, this.team2];
        teams.forEach(team => {
          team.cout_aos = 0;
          team = team.map(sousTeam => {
            sousTeam.unites = sousTeam.unites.map(unite => {
              let aptitude_cmd = _.cloneDeep(unite.aptitude_commandements);
              let aptitudes = _.cloneDeep(unite.aptitudes);
              let armes = _.cloneDeep(unite.armes);
              let profils = _.cloneDeep(unite.profils);
              let effets = _.cloneDeep(unite.effets);
              let caracteristiques = [aptitude_cmd, aptitudes, armes, profils, effets];
              caracteristiques = caracteristiques.map(caracteristique => {
                if (caracteristique.length) {
                  caracteristique = caracteristique.map(caracteristique => caracteristique.aosPts)
                  caracteristique = caracteristique.length > 1 ? caracteristique.reduce((a, b) => { 
                    return Number(a) + Number(b)
                    }, 0) : Number(caracteristique[0]);
                } else {
                  caracteristique = 0;
                }
                return caracteristique;
              });
            caracteristiques = caracteristiques.reduce((a, b) => a + b);
            unite.cout_carac = caracteristiques
            return unite;
            });
          console.log(sousTeam);
          let sousTeamUnites = _.cloneDeep(sousTeam.unites);
          sousTeamUnites = sousTeamUnites.map(unite => unite.cout_carac);
          sousTeamUnites = sousTeamUnites.reduce((a, b) => a + b) / sousTeam.unites.length;
          sousTeam.cout_aos = sousTeamUnites * sousTeam.nb;
          if (_.isEqual(team, this.team1)) {
            this.team1_cout_aos += sousTeam.cout_aos;
          };
          if (_.isEqual(team, this.team2)) {
            this.team2_cout_aos += sousTeam.cout_aos;
          };
          this.result = true
          return sousTeam;
          })
        })
      },
      returnHome()
      {
        this.result = false;
      }
    },
    async mounted() {
      await this.getBattleTomes();
    },  
  }
</script>
<style>
.border {
  border: solid 2px #37474F;
  border-radius: 2%;
}
.blueColor{
  background-color: #1A237E;
  color : #ffffff !important;
}
.pinkColor{
  background-color: #880E4F;
  color : #ffffff !important;
}
.mixColor{
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(26,35,126,1) 0%, rgba(136,14,79,1) 100%);
  color: #ffffff !important;
}
.scroll{
  height: 400px;
  overflow: auto;
}
.border-r{
  border-radius: 15px;
}


</style>