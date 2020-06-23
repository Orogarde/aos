<template>
  <v-container>
    <radial-menu v-if="enableBt"
      style="margin: auto; margin-top: 300px; background-color: white"
      :itemSize="100"
      :size="100"
      :radius="230"
      :angle-restriction="180"
      :rotation="180"
      >
        <radial-menu-item class="selectRadial"
          v-for="(item, index) in Battletomes" 
          :key="index"
          @click="handleClick(item)"
        >
          <v-avatar size="160" class="sizeChange border-white"> 
            <img 
              :src="`${api}/image/${item.visuel}`"
              alt="battletomes"
            >
          </v-avatar>
        </radial-menu-item>
      </radial-menu>
      <UniteSelected  v-if="enableUnit" :idBt="lastClicked.battletomeId"/>
        <v-btn v-if="enableUnit" @click="returnBt()"
          color="pink"
          dark
          small
          top
          left
          fab
          >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
  </v-container>
</template>
<script>
import { RadialMenu,  RadialMenuItem } from 'vue-radial-menu'
import axios from 'axios';
import _ from 'lodash'; 
import UniteSelected from '../components/UniteSelected'
export default {
  components: {
    RadialMenu,
    RadialMenuItem,
    UniteSelected,
    ooo: ''
  },
  data:() => ({
      enableBt: true,
      enableUnit:false,
      lastClicked: '',
      Battletomes:[''],
      api: ''
  }),
  methods: {
  async getBattleTomes() {
    this.api = this.$api;
    axios({
      url: `${this.api}/findBattletomes`,
      method: 'GET'
    })
    .then(res => {
      res = res.data;
      this.Battletomes = res;
    })
    .catch(e => console.log(e));
  },
  handleClick (item) {
      this.lastClicked = item;
      this.enableBt = false;
      this.enableUnit = true;
    },
  returnBt()
  {
    this.enableBt = true;
    this.enableUnit = false;
    this.lastClicked = "";
  }
  },
  async mounted() {;
    await this.getBattleTomes();
  },  
}
</script> 
<style>
.sizeChange{
  width: 100%;
  height: 100%;
  transition: width 1s, height 1s;
}
.sizeChange:hover{
  width: 250px !important;
  height: 250px !important;
  /* left:-200px; */
}
.selectRadial:hover{
    z-index: 99999999999999999999 !important;
}
.border-white:hover {
   border: solid 2px #ffffff;
   transition: width 1s, height 1s;
}
</style>