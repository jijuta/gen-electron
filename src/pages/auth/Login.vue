<template>
  <q-page class="bg-light-green window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Saesolsoft & Co</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="backendurl" type="text" placeholder="login server"
                autocomplete="off" label="backendurl" />
            </q-form>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="apiserverurl" type="text" placeholder="api server"
                autocomplete="off" label="apiserverurl" />
            </q-form>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="loginInfo.email" type="email" placeholder="Enter email"
                autocomplete="off" label="email" />
              <q-input square filled clearable v-model="loginInfo.password" type="password" label="password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Login"
              v-on:click="userValidation()" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account
              <router-link to="/sign" tabindex="-1">Sign up</router-link>
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loginInfo: {
        email: "",
        password: ""
      }
    }
  },
  mounted: function () {
    if (this.$store.state.token !== "" && this.$store.state.aut) {
      this.$router.push('gen');
    }
  },
  methods: {
    userValidation: function () {
      this.$axios.post(this.backendurl + '/v1/login', this.loginInfo).then((res) => {
        console.log(res);
        this.$store.commit('initSession', res.data);

        this.$router.push('/gen');
      }).catch((err) => {
        console.log(err);
        alert("로그인 실패");
      })
    },
  },
  computed: {
    apiserverurl: {
      get() {
        return this.$store.state.apiserverurl;
      },
      set(value) {
        this.$store.state.apiserverurl = value;
        // this.$store.commit('updateApiserverurl', value);
      },
    },
    backendurl: {
      get() {
        return this.$store.state.backendurl;
      },
      set(value) {
        this.$store.state.backendurl = value;
      },
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  }
}
</script>

<style scoped>
.q-card {
  width: 490px;
}
</style>
