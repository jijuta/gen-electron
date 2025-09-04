<template>
    <q-page
      class="window-height window-width row justify-center items-center"
      style="background: linear-gradient(135deg,  #EA5C54  0%,#bb6dec 100%);"
    >
      <div class="column">
        <div class="row">
          <q-card square dark class="q-pa-md q-ma-none no-shadow bg-grey-10" style="width:320px;">
            <q-card-section class="q-mt-xl q-mb-md">
              <p class="text-weight-bolder text-grey">Login to your account</p>
            </q-card-section>
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input dark dense square filled clearable v-model="email" type="email" label="Email">
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
                <q-input dark dense square filled clearable v-model="password" type="password" label="Password">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
              </q-form>
            </q-card-section>
            <q-card-actions>
              <div class="row full-width items-center">
                <div class="col-6">
                  <q-btn outline rounded size="md" color="red-4" class="full-width text-white" label="Sign In" />
                </div>
                <div class="col-6">
                  <p class="text-no-wrap text-grey text-caption text-right">Forgot password?</p>
                  
                </div>
              </div>
            </q-card-actions>
            <q-card-section>
              <p class="text-caption text-weight-light text-grey"><router-link to="/gen"><span>home</span></router-link> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce semper laoreet placerat. Nullam semper auctor justo, rutrum posuere odio vulputate nec.</p>

            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        username: '',
        password: ''
      }
    }
  }
  </script>
  
  <style scoped>
  </style>