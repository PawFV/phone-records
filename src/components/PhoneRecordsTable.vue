<template>
  <div>
    <Toast position="top-right" />
    <DataTable
      :value="filteredRecords"
      responsiveLayout="scroll"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      :paginator="true"
      showGridlines
      dataKey="id"
      :rows="10"
    >
      <template #header>
        <div class="table-header">
          <h2>Phone Records</h2>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filter" placeholder="Keyword Search" id="keywordSearch" />
          </span>
          <Button
            icon="pi pi-plus"
            aria:haspopup="true"
            aria-controls="overlay_panel"
            label="New Record"
            @click="displayNewRecordModal = true"
          />
        </div>
      </template>

      <Column field="firstName" header="First Name" />
      <Column field="lastName" header="Last Name" />
      <Column field="phone" header="Phone" />
      <Column field="email" header="Email" />
      <Column :rowEditor="true" style="width: 10%; min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            @click="editRow(slotProps.data)"
            aria:haspopup="true"
            aria-controls="overlay_panel"
          />
          <Button
            icon="pi pi-times"
            class="delete-btn p-button-danger"
            @click="deleteRow(slotProps.data)"
            aria:haspopup="true"
            aria-controls="overlay_panel"
          />
        </template>
      </Column>

      <template #paginatorLeft>
        <i type="button" class="pi pi-refresh" />
      </template>
      <template #paginatorRight>
        <i type="button" class="pi pi-cloud" />
      </template>
    </DataTable>
    <!-- Pop ups -->
    <DeleteRecordModal
      @closeModal="closeDeleteModal"
      :displayModal="displayDeleteModal"
      :recordId="selectedPhoneRecord.id"
      v-if="displayDeleteModal"
      class="modal"
    />
    <NewRecordModal
      @closeModal="closeNewRecordModal"
      :displayModal="displayNewRecordModal"
      v-if="displayNewRecordModal"
      class="modal"
    />
    <EditRecordModal
      @closeModal="closeEditModal"
      :displayModal="displayEditModal"
      :record="selectedPhoneRecord"
      v-if="displayEditModal"
      class="modal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { PhoneRecord } from '@/../types/'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { valuesIn } from 'lodash'
import EditRecordModal from '@/components/modals/EditRecordModal.vue'
import DeleteRecordModal from '@/components/modals/DeleteRecordModal.vue'
import NewRecordModal from '@/components/modals/NewRecordModal.vue'

export default defineComponent({
  components: {
    DataTable,
    Column,
    InputText,
    Button,
    EditRecordModal,
    DeleteRecordModal,
    NewRecordModal,
    Toast
  },
  data: () => ({
    filter: '',
    displayEditModal: false,
    displayDeleteModal: false,
    displayNewRecordModal: false,
    selectedPhoneRecord: {} as PhoneRecord
  }),
  computed: {
    filteredRecords() {
      return this.phoneRecords.filter(record =>
        valuesIn(record).some(value => value.toLowerCase().includes(this.filter.toLowerCase()))
      )
    },
    phoneRecords() {
      return this.$store.state.phoneRecords
    }
  },
  methods: {
    editRow(phoneRecord: PhoneRecord) {
      this.selectedPhoneRecord = phoneRecord
      this.displayEditModal = true
    },
    deleteRow(phoneRecord: PhoneRecord) {
      this.selectedPhoneRecord = phoneRecord
      this.displayDeleteModal = true
    },
    closeEditModal() {
      this.displayEditModal = false
    },
    closeDeleteModal() {
      this.displayDeleteModal = false
    },
    closeNewRecordModal() {
      this.displayNewRecordModal = false
    }
  },
  async mounted() {
    await this.$store.dispatch('loadRecords')
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

::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  & .p-input-icon-left {
    // Center it exactly in the middle of the container
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

button.delete-btn {
  margin-left: 5px;
}

.modal {
  max-width: 500px;
}
</style>
