<template>
  <v-container>
    <radial-menu v-if="enableUnite"
      style="margin: auto; margin-top: 290px; background-color: white"
      :itemSize="100"
      :size="100"
      :radius="230"
      :angle-restriction="180"
      :rotation="180"
      >
        <radial-menu-item  class="selectRadial"
          v-for="(item, index) in Unites" 
          :key="index"
          @click="handleClick(item)"
        >
          <v-avatar size="160" class="sizeChange border-black">
            <img  class="sizeChange"
              :src="`${api}/image/${item.visuel}`"
              alt="battletomes"
            >
          </v-avatar>
        </radial-menu-item>
      </radial-menu>
      <UniteDetails  v-if="enableDetails" :idUnite="lastClicked.uniteId"/>
  </v-container>
</template>
<script>
import { RadialMenu,  RadialMenuItem } from 'vue-radial-menu'
import axios from 'axios';
import _ from 'lodash'; 
import UniteDetails from '../components/UniteDetails'
export default {
  name: "UniteSelected",
  components: {
    RadialMenu,
    RadialMenuItem,
    UniteDetails,
  },
  props:{
    idBt:'',
  },
  data () {
    return {
      enableUnite: true,
      enableDetails: false,
      lastClicked: '',
      Unites:[''],
      api: '',
    }
  },
  methods: {
  async getUnites() {
    const battletomeId= {
      id : this.idBt,
    };
    this.api = this.$api;
    axios({
      url: `${this.api}/findUnitesSpe`,
      method: 'Post',
      data: battletomeId,
    })
    .then(async (res) => {
      console.log(res);
      res = res.data;
      this.Unites = res;
    })
    .catch(e => console.log(e));
  },
  handleClick (item) {
      this.lastClicked = item;
      this.idUnite = this.lastClicked.uniteId;
      this.enableDetails = true;
      this.enableUnite = false;


    },
  },
  async mounted() {
      await this.getUnites();
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
.border-black:hover {
   border: solid 2px #000000;
   transition: width 1s, height 1s;
}
</style>