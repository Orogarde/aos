<template>
  <v-container>
    <v-row v-if="result">
      <v-col
        cols="12"
        sm="6">
          <v-card
          id="scroll-indigo"
          class="mx-auto scroll-result"
          max-width="700"
          max-height=""
        >
          <v-img
          max-width="700"
          max-height=""
          class=""
          :src="`${$api}/image/${team1[0].visu}`"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          >     
          <v-card-text>
            <v-chip
              class="ma-2"
              color="indigo"
              text-color="white"
            >
              Equipe 1
            </v-chip>
            <p class="white--text align-end display-1 py-1 mx-5  border-r font-weight-bold">
              {{ team1_cout_aos.toFixed(1) }}
            </p>
            <p class="white--text">score aos</p>
          </v-card-text>
            <v-row v-for="(item, i) in team1"
                        :key="i">
              <v-divider class="divider-white"
              inset
              ></v-divider>
              <v-col cols="12" sm="12">
                <p class="opacity-white border-r white--text"><span class="font-weight-bold">{{item.nom}}</span>
                    <v-spacer></v-spacer>
                    ( {{item.unites[0].nom}} )
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card
                  class="mx-auto border-img"                  
                  max-height=""
                  max-width="700"
                  >
                  <v-img 
                    class="white--text align-end "
                    height=""
                    width="700"
                    :src="`${$api}/image/${item.visuUnit}`"
                    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                    aspect-ratio="2"
                  >
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6">
                    <v-progress-circular class="my-2 font-weight-bold"
                        :value="CalculRatio(item.cout_aos,'1')"
                        color="white"
                        :width="15"
                        :size="100"
                    >
                    {{ CalculRatio(item.cout_aos,'1').toFixed(1)  }} %
                    </v-progress-circular>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card
        id="scroll-pink"
        class="mx-auto scroll-result"
        max-width="700"
        max-height=""
        >
          <v-img
          max-width="700"
          max-height=""
          class=""
          :src="`${$api}/image/${team2[0].visu}`"
          gradient="to top right, rgba(100,115,201,.33), rgba(90,32,72,.7)"
          >     
          <v-card-text>
            <v-chip
              class="ma-2"
              color="pink"
              text-color="white"
            >
              Equipe 2
            </v-chip>
            <p class="white--text align-end display-1 py-1 mx-5  border-r font-weight-bold">
              {{ team2_cout_aos.toFixed(1) }}
            </p>
            <p class="white--text">score aos</p>
          </v-card-text>
            <v-row v-for="(item, i) in team2"
                        :key="i">
              <v-divider class="divider-white"
              inset
              ></v-divider>
              <v-col cols="12" sm="12">
                 <p class="border-r opacity-white  white--text"><span class="font-weight-bold">{{item.nom}}</span>
                      <v-spacer></v-spacer>
                     ( {{item.unites[0].nom}} )
                  </p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card  
                  class="mx-auto border-img"
                  max-width="600"
                  max-height=""
                  >
                  <v-img
                    class="white--text align-end"
                    height=""
                    width="600"
                    :src="`${$api}/image/${item.visuUnit}`"
                    gradient="to top right, rgba(100,115,201,.33), rgba(85,32,72,.7)"
                    aspect-ratio="2"
                  >
                    <!-- <v-card-text class="align-end">{{item.nom}}
                      <v-spacer></v-spacer>
          
                      {{item.unites[0].nom}}
                    </v-card-text> -->
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6">
                    <v-progress-circular class="my-2 font-weight-bold"
                        :value="CalculRatio(item.cout_aos,'2')"
                        color="white"
                        :width="15"
                        :size="100"
                    >
                    {{ CalculRatio(item.cout_aos,'2').toFixed(1)  }} %
                    </v-progress-circular>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios';
import _ from 'lodash'; 
export default {
  name: "ResultatComparateur",
  components: {
  },
  props:{
      team1: {
      type: Array,
      required: true
    },
      team2: {
      type: Array,
      required: true
    },
    team1_cout_aos: 0,
    team2_cout_aos: 0,
    CalculCoutTeam1:0,
    CalculCoutTeam2:0,

  },
  data () {
    return {
      result: true,
    }
  },
  computed: {
    // CalculNoteSur20Team1(){
    //   return (this.team1_cout_aos/this.CalculCoutTeam1)*20;
    // },
    // CalculNoteSur20Team2(){
    //   return (this.team2_cout_aos/this.CalculCoutTeam2)*20;
    // }

  },
  methods: {
        CalculRatio(nb,equipe){
          if(equipe === "1")return (nb/this.team1_cout_aos) *100; 
          if(equipe === "2")return (nb/this.team2_cout_aos) *100; 
    },
  },
  async mounted() {
    },  
}
</script> 
<style>
.border-img{
  border-radius: 0px 200px 200px 0px !important;
  -moz-border-radius: 0px 200px 200px 0px;
  -webkit-border-radius: 0px 200px 200px 0px;
  border: 0px solid #000000;
}
.scroll-result{
  height: 500px;
  overflow: auto;
}
.opacity-white {
  border: solid 2px #ffffff;
  opacity: 0.8;
  margin-left: 20%;
  margin-right: 20%;
}
.divider-white {
 border-top : solid 4px #ffffff;
 border-color: #ffffff !important;
 opacity: 0.5;
}
#scroll-pink::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

#scroll-pink::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

#scroll-pink::-webkit-scrollbar-thumb
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background: rgb(136,14,79);
  background: linear-gradient(0deg, rgba(136,14,79,1) 42%, rgba(248,187,208,1) 100%);
}

#scroll-indigo::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

#scroll-indigo::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

#scroll-indigo::-webkit-scrollbar-thumb
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background: rgb(26,35,126);
  background: linear-gradient(0deg, rgba(26,35,126,1) 42%, rgba(197,202,233,1) 100%);
}
</style>