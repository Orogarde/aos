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
           <p class="title">Unités :</p>
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
                    <v-text-field  label="description" v-model="selectUnit.description" required></v-text-field>
                    <v-select
                      v-model="select"
                      :label="`${select.description}`"
                      :items="itemsBt"
                      item-text="description"
                      item-value="battletomeId"
                      dense
                      outlined
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                    <v-text-field  label="cout min" v-model="selectUnit.cout_min" required></v-text-field>
                    <v-text-field  label="cout max" v-model="selectUnit.cout_max" required></v-text-field>
                    <v-text-field  label="taille min" v-model="selectUnit.taille_min" required></v-text-field>
                    <v-text-field  label="taille max" v-model="selectUnit.taille_max" required></v-text-field>
                    <v-text-field  label="taille critique" v-model="selectUnit.taille_critique" required></v-text-field>
                      <v-file-input
                        v-model="visuel"
                        :label="selectUnit.visuel"
                      >
                      </v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="modif(selectUnit)">Save</v-btn>
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
                    <v-img
                      class="white--text align-end"
                      height="300px"
                      :src="`${api}/image/${item.visuel}`"
                    >
                    </v-img>


                    <v-card-text class="">
                      <div class="title">{{item.description}}</div>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center">coût min</th>
                              <th class="text-center">taille min</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{{ item.cout_min }}</td>
                              <td>{{ item.taille_min }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center">coût max</th>
                              <th class="text-center">taille max</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{{ item.cout_max }}</td>
                              <td>{{ item.taille_max }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                      <div class="subtitle-2">taille critique : {{ item.taille_critique }}</div>
                      <div class="subtitle-2">battletome: {{ item.battletome.description }}</div>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn class="mx-2" @click="infos(item)" fab dark small color="success">
                            <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn class="mx-2"  @click="supprimer(item.uniteId)" fab dark small color="error">
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
      api:'',
      visuel:{},
      select:{},
      selectUnit:{},
      dialog: false,
      item:0,
      items:[],
      unites: [],
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
        'description',
      ],
      itemsBt:[],
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
      async getUnites() {
        this.api = this.$api;
        axios({
          url: `${this.api}/findUnites`,
          method: 'GET'
        })
        .then((res) => {
          res = res.data;
          this.items = res;
        })
        .catch(e => console.log(e));
      },
      create(){
        this.$router.push("/createUnite").catch(e => {});
      },
      supprimer(uniteId){
        const unitId = uniteId;
      axios.post(`${this.$api}/deleteUnite`, {unitId})
        .then((response) => {
          this.getUnites();

        })
        .catch((err) => {
          return new Error(err.message);
        })
      },
      modif(uniteUse){
      console.log(this.select);
       const uniteAvantModif = this.items.find(unite => uniteUse.uniteId === unite.uniteId);
      console.log(uniteAvantModif.battletome.description);
       if ((this.visuel.name === uniteAvantModif.visuel || !this.visuel.name) 
       && uniteUse.description === uniteAvantModif.description
       && uniteUse.cout_min === uniteAvantModif.cout_min
      && uniteUse.cout_max === uniteAvantModif.cout_max
      && uniteUse.taille_min === uniteAvantModif.taille_min
      && uniteUse.taille_max === uniteAvantModif.taille_max
      && uniteUse.taille_critique === uniteAvantModif.taille_critique
      && this.select.description === uniteAvantModif.battletome.description
       )
       {
         this.close();
         return;
       }
       if (this.visuel.name) {
         uniteUse.visuel = this.visuel.name;
       }
       if(this.select.description != uniteAvantModif.battletome.description)
       {
         uniteUse.battletomeId = this.select.battletomeId;
       }
       axios({
          url: `${this.$api}/updateUnite`,
          method: 'PUT',
          data: uniteUse
        })
        .then(async res => {
          if (this.visuel.name) {
            await this.handleImage()
          } else {
            await this.getUnites();
          }
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
        this.getBattleTomes();
        this.select.description = item.battletome.description;
        this.dialog = true;
        this.selectUnit = _.cloneDeep(item);
      },
      async handleImage() {
        const selectedImage = this.visuel;
        return this.createBase64Image(selectedImage);
      },
      createBase64Image(fileObject){
        const reader = new FileReader();
        reader.onload = () => {
          const visuFinal = this.visuel;
          this.visuFinal = reader.result;
          this.uploadImage();
        };
        reader.readAsDataURL(fileObject);

      },
      uploadImage() {
      const { visuFinal } = this;
      const name = this.visuel.name;
      axios({
          url: `${this.$api}/upload`,
          method: 'POST',
          data: [{visuFinal} , name]
        })
        .then(async (response) => {
          this.remoteUrl = response.data.url;
          await this.getUnites();
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
          this.itemsBt = res;
        })
        .catch(e => console.log(e));
      },
    },
    async mounted() {
      await this.getUnites();
    },  
  }
</script>