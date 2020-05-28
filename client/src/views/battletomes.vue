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
      <v-col  
      v-for="(item, i) in battleTomes"
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
                <v-btn class="mx-2" fab dark small color="success">
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
  export default {
    data: () => ({
      item:0,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
      battleTomes: [],
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
          this.battleTomes = res;
        })
        .catch(e => console.log(e));
      },
      create(){
        this.$router.push("/createBattletome").catch(e => {});
      },
      supprimer(battletomeId){
        const btId = battletomeId;
        console.log(btId);
      axios.post(`${this.$api}/deleteBattletome`, {btId})
        .then((response) => {
          this.getBattleTomes();

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