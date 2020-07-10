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
                      :items="items"
                      item-text="description"
                      item-value="uniteId"
                      dense
                      outlined
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                    <v-text-field  label="nom modele :" v-model="selectModel.nom" required></v-text-field>
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
      v-for="(item, i) in modeles"
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
      modeles: [],
      alignment: 'center',
      justify: 'center',
    }),
    methods: {
      async getModeles() {
        axios({
          url: `${this.$api}/findModeles`,
          method: 'GET'
        })
        .then((res) => {
          res = res.data;
          this.modeles = res;
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
       const modeleAvantModif = this.modeles.find(modele => modeleUse.modeleId === modele.modeleId);
       if (modeleUse.nom === modeleAvantModif.nom && this.select.description === modeleAvantModif.unite.description)
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
          this.items = res;
        })
        .catch(e => console.log(e));
      },
    },
    async mounted() {
      await this.getModeles();
    },  
  }
</script>