<template>
    <q-layout>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
  
<script>
export default {
    data() {
        return {
            left: false,
            right: false
        }
    }
}
</script>
  