<template>
  <Dialog
    header="Edit record"
    v-model:visible="visible"
    :style="{ width: '50vw' }"
    :modal="true"
    @update:visible="$emit('closeModal')"
  >
    <div class="card">
      <div class="p-fluid">
        <div class="errors" v-if="hasErrors">
          <p v-for="(error, index) in validations" :key="index">
            <span v-if="error" style="color: red">* {{ error }}</span>
          </p>
        </div>
        <div class="p-field">
          <label for="firstName">First Name</label>
          <InputText
            id="firstName"
            type="text"
            v-model="phoneRecord.firstName"
            :class="validations.fisrtName && 'p-invalid'"
          />
        </div>
        <div class="p-field">
          <label for="lastName">Last Name</label>
          <InputText
            id="lastName"
            type="text"
            v-model="phoneRecord.lastName"
            :class="validations.lastName && 'p-invalid'"
          />
        </div>
        <div class="p-field">
          <label for="phone">Phone</label>
          <InputText
            id="phone"
            type="text"
            v-model="phoneRecord.phone"
            :class="validations.phoneNumber && 'p-invalid'"
          />
        </div>
        <div class="p-field">
          <label for="email">Email</label>
          <InputText
            id="email"
            type="text"
            v-model="phoneRecord.email"
            :class="validations.email && 'p-invalid'"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="$emit('closeModal')"
        class="p-button-text"
      />
      <Button label="Submit" icon="pi pi-check" @click="updateRecord" autofocus />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core'
import { PhoneRecord } from '../../../types/index'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { valuesIn, isBoolean } from 'lodash'

export default defineComponent({
  props: {
    displayModal: { type: Boolean, required: true },
    record: { type: Object as PropType<PhoneRecord>, required: true }
  },
  components: { Button, Dialog, InputText },
  data: () => ({
    phoneRecord: {} as PhoneRecord
  }),
  mounted() {
    /**  If we keep v-model with the default prop reference will update the parent as well
     * to avoid that we assign record by value and not by reference */
    this.phoneRecord = JSON.parse(JSON.stringify(this.record))
  },
  computed: {
    visible() {
      return this.displayModal
    },
    hasErrors() {
      return !valuesIn(this.validations).every(isBoolean)
    },
    validations() {
      return {
        fisrtName: !this.phoneRecord.firstName && 'First Name is required',
        lastName: !this.phoneRecord.lastName && 'Last Name is required',
        phoneNumber: !this.phoneRecord.phone && 'Phone required',
        email:
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.phoneRecord.email) && 'Invalid e-mail address'
      }
    }
  },
  methods: {
    async updateRecord() {
      if (this.hasErrors) return
      await this.$store.dispatch('updateRecord', this.phoneRecord)
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Record updated',
        life: 3000
      })
      this.$emit('closeModal')
    }
  }
})
</script>

<style lang="scss">
.errors p {
  margin: 5px;
}
</style>
