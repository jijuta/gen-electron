<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-tabs align="left">
        <q-route-tab to="/login" label="login" />
        <q-route-tab to="/sign" label="sign" />
        <q-route-tab to="/gen" label="전자정부" />
        <q-route-tab to="/gen/cmp" label="스프링" />
        <q-route-tab to="/gen/node" label="노드" />
        <q-route-tab to="/gen/php" label="PHP" />
      </q-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      right: false
    }
  }
}
</script>
