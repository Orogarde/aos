<template>
  <v-container>
    <radial-menu v-if="ok"
      style="margin: auto; margin-top: 300px; background-color: white"
      :itemSize="100"
      :size="100"
      :radius="220"
      :angle-restriction="180"
      :rotation="20"
      >
        <radial-menu-item 
          v-for="(item, index) in Unites" 
          :key="index"
          @click="handleClick(item)"
        >
          <v-avatar size="200">
            <img
              :src="`${api}/image/${item.visuel}`"
              alt="battletomes"
            >
          </v-avatar>
        </radial-menu-item>
      </radial-menu>
  </v-container>
</template>
<script>
import { RadialMenu,  RadialMenuItem } from 'vue-radial-menu'
import axios from 'axios';
import _ from 'lodash'; 
export default {
  name: "UniteSelected",
  components: {
    RadialMenu,
    RadialMenuItem,
  },
  data () {
    return {
      lastClicked: '',
      Unites:[],
      ok: false
    }
  },
  methods: {
  async getUnites() {
    this.api = this.$api;
    axios({
      url: `${this.api}/findUnites`,
      method: 'GET'
    })
    .then(async (res) => {
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
