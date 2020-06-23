<template>
  <v-container>
    {{idUnite}}
  </v-container>
</template>
<script>
import { RadialMenu,  RadialMenuItem } from 'vue-radial-menu'
import axios from 'axios';
import _ from 'lodash'; 
import UniteDetails from '../components/UniteDetails'
export default {
  name: "UniteDetails",
  components: {
    RadialMenu,
    RadialMenuItem,
  },
  props:{
    idUnite:'',
  },
  data () {
    return {
      lastClicked: '',
      Unites:[''],
      api: '',
    }
  },
  methods: {
  async getUnites() {
    const uniteId= {
      id : this.idUnite,
    };
    this.api = this.$api;
    axios({
      url: `${this.api}/findUnitesDetails`,
      method: 'Post',
      data: uniteId,
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