<template>
  <PhoneRecordsTable />
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

import PhoneRecordsTable from './components/PhoneRecordsTable.vue'

export default defineComponent({
  components: {
    PhoneRecordsTable
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
