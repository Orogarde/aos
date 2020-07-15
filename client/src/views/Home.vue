<template>
  <v-container>
     <v-row
        :justify="justify"
      >
      <v-col
        cols="8"
        sm="8"
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
            <v-card>
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
              <span>{{item.cout_max}}</span>
               <div   v-for="model in item.modeles"
                :key="model.modeleId" class="text-center border">
                <v-chip
                  class="ma-2"
                >
                  {{model.nom}}
                </v-chip>
                <v-spacer></v-spacer>
                 <v-btn @click="ajout(model,'1')" class="mx-2" fab dark small color="primary">
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn> 
                <v-btn @click="ajout(model,'2')" class="mx-2" fab dark small color="pink">
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
        cols="4"
        sm="4"
      >
      <span>coucou</span>
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
      ajout(item,equipe)
      {
        console.log("coucou");
        if(equipe === '1')this.team1.push(item);
        if(equipe === '2')this.team2.push(item);
        console.log(this.team1);
      }
    },
    async mounted() {
      await this.getBattleTomes();
    },  
  }
</script>
<style>
.border {
  border: solid 2px #000000;
  border-radius: 5%;
}

</style>