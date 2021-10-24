import { mount } from '@vue/test-utils'
import PhoneRecordsTable from '@/components/PhoneRecordsTable.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import store from '@/store'

describe('PhoneRecordsTable.vue', () => {
  const wrapper = getWrapper(PhoneRecordsTable)
  it('Renders: First Name, Last Name, Phone and Email', () => {
    const TableHeaderText = ['First Name', 'Last Name', 'Phone', 'Email']
    TableHeaderText.forEach(headerText => expect(wrapper.text()).toContain(headerText))
  })
})

function getWrapper(component) {
  return mount(component, {
    global: {
      plugins: [store, PrimeVue, ToastService]
    }
  })
}
