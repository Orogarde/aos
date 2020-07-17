<template>
  <v-container>
     <v-row
        :justify="justify"
      >
      <v-col
        cols="9"
        sm="9"
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
            label="Search"
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
            <v-card class="pa-3">
              <v-card-title class="subheading font-weight-bold">{{ item.description }}
              </v-card-title>

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
               <div   v-for="model in item.modeles"
                :key="model.modeleId" class="text-center border my-2">
                <v-chip
                  class="ma-2"
                >
                  {{model.nom}}
                </v-chip>
                <v-spacer></v-spacer>
                <v-chip v-if="model.est_special"
                  class="ma-2" color="secondary"
                >
                  special
                   <v-icon right>mdi-star</v-icon>
                </v-chip>
                 <v-spacer></v-spacer>
                 <v-btn @click="ajout(model,'1',item)" class="mx-2" fab dark small color="primary">
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn> 
                <v-btn @click="ajout(model,'2',item)" class="mx-2" fab dark small color="pink">
                      <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
               </div>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
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
            Page {{ page }} of {{ numberOfPages }}
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
        cols="3"
        sm="3"
      >
      <div>
        <span>Equipe 1 :</span>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nom</th>
                  <th class="text-left">nombres</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in team1" :key="i">
                  <td>{{ item.nom }}</td>
                  <td>{{ item.nb }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-spacer class="my-2"></v-spacer>
        </div>
         <div>
          <span>Equipe 2 :</span>
            <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nom</th>
                  <th class="text-left">nombres</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in team2" :key="i">
                  <td>{{ item.nom }}</td>
                  <td>{{ item.nb }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
       </div>
      </v-col>
     </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash'; 
  export default {
    data: () => ({
      api: '',
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
        team2 :[],
    }),
     computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
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
      ajout(item,equipe,unite)
      { 
        let modeleUse = _.cloneDeep(item);
        const findTeam1 = this.team1.find(team => modeleUse.modeleId === team.modeleId)
        const findTeam2 = this.team2.find(team => modeleUse.modeleId === team.modeleId)
        console.log('team1 : ',findTeam1);
        console.log('team2 : ',findTeam2);
        if (findTeam1 && equipe === '1')
        {
          if (!modeleUse.est_special) {
            findTeam1.nb += unite.taille_min;
            const cout = unite.cout_min;
            findTeam1.cout_total += cout;
          }
          console.log(findTeam1.nb);
          console.log(unite.taille_critique);
          return;

        }
        if (!findTeam1 && equipe === '1')
        {
          modeleUse.nb = unite.taille_min;
          if (!modeleUse.est_special) {
            modeleUse.nb = (unite.taille_min - 1);
            modeleUse.cout_total = unite.cout_min;
          } else {
            modeleUse.nb = 0;
            modeleUse.cout_total = 0;
          }
          this.team1.push(modeleUse);
          return ;
        }

        if (findTeam2 && equipe === '2')
        {
          findTeam2.nb += unite.taille_min;
          return;

        }
        if(!findTeam2 && equipe === '2')
        {
          modeleUse.nb = unite.taille_min;
          this.team2.push(modeleUse);
          return;
        }
      },
    },
    async mounted() {
      await this.getBattleTomes();
    },  
  }
</script>
<style>
.border {
  border: solid 2px #000000;
  border-radius: 7%;
}

</style>