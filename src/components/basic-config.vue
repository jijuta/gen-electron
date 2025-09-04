<template>
  <div>{{payLoad}}</div>
</template>

<script>
export default {
  name: 'basic-config',
  data () {
    return {
      payLoad : this.payLoad
    }
  },
   props: ['payload'],
}
</script>
