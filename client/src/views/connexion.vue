<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="login"
            :rules="Rules"
            :counter="10"
            label="login"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="12" 
        >
          <v-text-field
            v-model="password"
            :rules="Rules"
            :counter="10"
            label="password"
            required
          ></v-text-field>
        </v-col>

        <v-col class="text-center" 
        cols="12" 
        sm="12">
        <div class="my-2">
          <v-btn small color="primary"
          :disabled="!valid"
          @click="validate">Valider</v-btn>
          <v-btn small color="secondary"
          @click="deco">Déconnexion</v-btn>
        </div>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import axios from 'axios';
  import md5 from 'md5';
  export default {
    data: () => ({
      valid: false,
      login: '',
      password: '',
      Rules: [
        v => !!v || 'input is required',
        v => v.length <= 10 || 'input must be less than 10 characters',
      ],
    }),
    methods: {
      validate () {
        const logins = {
          username: this.login,
          password: md5(this.password)
        }
        axios({
          url: `${this.$api}/findUtilisateur`,
          method: 'POST',
          data: logins
        })
        .then((res) => {
          let user = res.data;
          if (user) {
            localStorage.setItem('userId', user.utilisateurId);
          }
        })
        .catch(e => console.log(e));
      },
      deco() {
        localStorage.removeItem('userId');
      }
    },
  }
</script>
