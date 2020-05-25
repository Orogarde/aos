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
        <v-btn rounded color="primary" dark>Création</v-btn>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="12"
      >
        <v-card
          class="mx-auto"
          tile
        >
          
          <v-list flat>
            <v-subheader>BATTLETOMES :</v-subheader>
            <v-list-item-group v-model="item" color="success">
              <v-list-item
                v-for="(item, i) in battleTomes"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon>mdi-clock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.description"></v-list-item-title>
                </v-list-item-content>
                  <v-btn class="mx-2" fab dark small color="success">
                  <v-icon dark>mdi-minus</v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab dark small color="warning">
                  <v-icon dark>mdi-minus</v-icon>
                  </v-btn>
              </v-list-item>
            </v-list-item-group>
          </v-list>
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
      }
    },
    async mounted() {
      await this.getBattleTomes();
    },  
  }
</script>