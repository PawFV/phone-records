<template>
  <Dialog
    header="Delete record"
    v-model:visible="visible"
    :style="{ width: '50vw' }"
    :modal="true"
    @update:visible="$emit('closeModal')"
  >
    <p>You are going to delete this record, are you sure?</p>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="$emit('closeModal')" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" @click="deleteRecord" autofocus />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

export default defineComponent({
  props: {
    displayModal: { type: Boolean, required: true },
    recordId: { type: String, required: true }
  },
  components: { Button, Dialog },
  computed: {
    visible() {
      return this.displayModal
    }
  },
  methods: {
    async deleteRecord() {
      await this.$store.dispatch('deleteRecord', this.recordId)
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Record deleted',
        life: 3000
      })
      this.$emit('closeModal')
    }
  }
})
</script>

<style lang="scss">
p {
  font-size: 18px;
}
</style>
