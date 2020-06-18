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
           <p class="title">Battletomes :</p>
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
                    <v-text-field  label="description" v-model="selectBt.description" required></v-text-field>
                      <v-file-input
                        v-model="visuel"
                        :label="selectBt.visuel"
                      >
                      </v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="modif(selectBt)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-col  
      v-for="(item, i) in Battletomes"
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
                height="200px"
                :src="`http://localhost/aos/app/public/${item.visuel}`"
              >
              </v-img>


              <v-card-text class="">
                <div class="title">{{item.description}}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn class="mx-2" @click="infos(item)" fab dark small color="success">
                      <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
                <v-btn class="mx-2"  @click="supprimer(item.battletomeId)" fab dark small color="error">
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
      visuel:{},
      selectBt:{},
      dialog: false,
      item:0,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
      Battletomes: [],
      alignment: 'center',
      justify: 'center',
    }),
    methods: {
      async getBattleTomes() {
        axios({
          url: `${this.$api}/findBattletomes`,
          method: 'GET'
        })
        .then((res) => {
          res = res.data;
          this.Battletomes = res;
        })
        .catch(e => console.log(e));
      },
      create(){
        this.$router.push("/createBattletome").catch(e => {});
      },
      supprimer(battletomeId){
        const btId = battletomeId;
      axios.post(`${this.$api}/deleteBattletome`, {btId})
        .then((response) => {
          this.getBattleTomes();

        })
        .catch((err) => {
          return new Error(err.message);
        })
      },
      modif(battletomeUse){
       const btAvantModif = this.Battletomes.find(battletome => battletomeUse.battletomeId === battletome.battletomeId);
       if ((this.visuel.name === btAvantModif.visuel || !this.visuel.name) && battletomeUse.description === btAvantModif.description)
       {
         this.close();
         return;
       }
       if (this.visuel.name) {
         battletomeUse.visuel = this.visuel.name;
       }
       axios({
          url: `${this.$api}/updateBattletome`,
          method: 'PUT',
          data: battletomeUse
        })
        .then(async res => {
          if (this.visuel.name) {
            await this.handleImage();
          };
          await this.getBattleTomes();
          this.close();
        })
        .catch(e => console.log(e));
      },
      close() {
        this.dialog = false;
        setTimeout(() => {
          this.selectBt = -1;
        }, 300);
      },
      infos(battletome){
        this.dialog = true;
        this.selectBt = _.cloneDeep(battletome);
      },
      handleImage() {
        const selectedImage = this.visuel;
        this.createBase64Image(selectedImage);
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
        .then((response) => {
          console.log(name);
          this.remoteUrl = response.data.url;
        })
        .catch((err) => {
          return new Error(err.message);
        })
    },
    },
    async mounted() {
      await this.getBattleTomes();
    },  
  }
</script>