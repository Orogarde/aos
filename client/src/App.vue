<template>
  <div id="app">
    <v-app id="inspire">
      <body class="parallax">
        <Drawer/>
         <v-content>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </v-content>
      </body> 
    </v-app>
  </div>
</template>

<script>
import Drawer from './components/Drawer'
export default {
  name: 'App',
  components: {
    Drawer,
  },
  data () {
    return {
      
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.parallax {
  /* The image used */
background-image: url("./assets/bg.png");
/* Set a specific height */
/* height: 500px; */
/* Create the parallax scrolling effect */
background-attachment: fixed;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
height: 100%;
}

#inspire {
  background: none;
}
</style>
