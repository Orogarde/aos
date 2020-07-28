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
           <p class="title">Modèles :</p>
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
                      :label="`${select.description}`"
                      :items="itemsM"
                      item-text="description"
                      item-value="uniteId"
                      dense
                      outlined
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                    <v-text-field  label="nom modele :" v-model="selectModel.nom" required></v-text-field>
                    <v-checkbox label="special" v-model="selectModel.est_special" ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="modif(selectModel)">Save</v-btn>
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
            v-for="(item, i) in props.items"
                      :key="i" 
              cols="12"
              md="4"
            >
                <v-card
                    class="mx-auto"
                    max-width="400"
                  >

                    <v-card-text class="">
                      <div class="title">{{item.nom}}</div>
                      <div class="subtitle">est spécial : {{item.est_special}}</div>
                      <div class="subtitle-2">unite: {{ item.unite.description }}</div>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn class="mx-2" @click="infos(item)" fab dark small color="success">
                            <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn class="mx-2"  @click="supprimer(item.modeleId)" fab dark small color="error">
                        <v-icon dark>mdi-delete</v-icon>
                      </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>

            <template v-slot:footer>
              <v-row class="mt-2" align="center" justify="center">
                <span class="grey--text">unités par page</span>
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
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash'; 
  export default {
    data: () => ({
      select:{},
      selectModel:{},
      dialog: false,
      item:0,
      items:[],
      itemsM:[],
      modeles: [],
      alignment: 'center',
      justify: 'center',
      itemsPerPageArray: [3, 6, 9],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 6,
      sortBy: '',
      keys: [
        '',
      ],

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
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
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
      create(){
        this.$router.push("/createModele").catch(e => {});
      },
      supprimer(modeleId){
      const modelId = modeleId;
      axios.post(`${this.$api}/deleteModele`, {modelId})
        .then((response) => {
          this.getModeles();

        })
        .catch((err) => {
          return new Error(err.message);
        })
      },
      modif(modeleUse){
       const modeleAvantModif = this.items.find(modele => modeleUse.modeleId === modele.modeleId);
       if (modeleUse.nom === modeleAvantModif.nom && modeleUse.est_special === modeleAvantModif.est_special
       && this.select.description === modeleAvantModif.unite.description)
       {
         this.close();
         return;
       }
       if(this.select.description != modeleAvantModif.unite.description)
       {
         modeleUse.uniteId = this.select.uniteId;
       }
       axios({
          url: `${this.$api}/updateModele`,
          method: 'PUT',
          data: modeleUse
        })
        .then(async res => {
          await this.getModeles();
          this.close();
        })
        .catch(e => console.log(e));
      },
      close() {
        this.dialog = false;
        setTimeout(() => {
          this.selectUnit = {};
          this.select = {};
        }, 10);
      },
      infos(item){
        this.getUnites();
        this.select.description = item.unite.description;
        this.dialog = true;
        this.selectModel = _.cloneDeep(item);
      },
        async getUnites() {
        axios({
          url: `${this.$api}/findUnites`,
          method: 'GET'
        })
        .then((res) => {
          res = res.data;
          this.itemsM = res;
        })
        .catch(e => console.log(e));
      },
    },
    async mounted() {
      await this.getModeles();
    },  
  }
</script>