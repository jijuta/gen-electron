<script>
export default {
  data() {
    return {
      message: 'logout 중입니다........'
    }
  },
  mounted() {
    this.$store.commit('deleteSession', null);
    this.$router.push('/login');
  }
}
</script>

<template>
  <h1>{{ message }}</h1>
</template>