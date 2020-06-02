<template>
  <v-container>
    <v-card   class="mx-auto overflow-hidden">
     <v-system-bar color="deep-purple darken-3"></v-system-bar>
  
      <v-app-bar
        color="deep-purple accent-4"
        dark
        prominent
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
        <v-toolbar-title>My files</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <p v-if="session">Admin</p>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :permanent="permanent"
        :src="bg"
        :app="true"
        temporary
        dark
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Application</v-list-item-title>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in filteredItems"
            :key="item.title"
            @click="Redirect(item.link)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
           <v-list-item v-if="session"
            @click="deco()"
          >
            <v-list-item-icon>
              <v-icon>mdi-image</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Deconnexion</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-if="session">
          <v-list-group
            v-for="item in laboItems"
            :key="item.title"
            v-model="item.active"
            prepend-icon="mdi-view-dashboard"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="subItem in item.elems"
              :key="subItem.title"
              @click="Redirect(subItem.link)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        session: localStorage.getItem('userId'),
        drawer: false,
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard',link:'/' },
          { title: 'About', icon: 'mdi-image',link:'/about' },
          { title: 'Armees', icon: 'mdi-image',link:'/armees' },
          { title: 'Connexion', icon: 'mdi-help-box',link:'/connexion' },
        ],
        laboItems: [
          {
            title: 'Laboratoire',
            elems: [
              { title: 'Battletomes',link:'/battletomes'},
              { title: 'Unités',link:'/unites' },
              { title: 'modèles',link:'/modeles' },
              { title: 'aptitudes',link:'/aptitudes' },
            ],
          },
        ],
        filteredItems: [],
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: false,
        permanent: false,
        miniVariant: false,
        expandOnHover: false,
        background: true,
      }
    },
    computed: {
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
    },
    watch: {
      async $route(to, from) {
        const isConnected = localStorage.getItem('userId');
        this.session = isConnected;
        this.filteredItems = this.items;
        this.filteredItems = this.items.filter(item => {
          if (item.title === 'Connexion' && this.session) {
            return false;
          };
          return true;
        });
      }
    },
    async mounted() {
        const isConnected = localStorage.getItem('userId');
        this.session = isConnected;
        this.filteredItems = this.items;
        this.filteredItems = this.items.filter(item => {
          if (item.title === 'Connexion' && this.session) {
            return false;
          };
          return true;
        });
    },
    methods:{
        Redirect(link) {
          this.$router.push(link).catch(e => {});
        },
        deco() {
        localStorage.removeItem('userId');
        this.$router.push('/connexion').catch(e => {});
      },
    }
  }
</script>