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
        sm="4"
      >
          <v-card 
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">BATTLETOMES :</div>
              <v-list-item-title class="headline mb-1">{{item.description}}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn class="mx-2" fab dark small color="success">
              <v-icon dark>mdi-minus</v-icon>
              </v-btn>
              <v-btn class="mx-2" fab dark small color="warning">
              <v-icon dark>mdi-minus</v-icon>
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
      }
    },
    async mounted() {
      await this.getBattleTomes();
    },  
  }
</script>