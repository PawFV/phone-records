import { createStore } from 'vuex'
import { RootState } from '../../types/store'
import api from '@/api/'
import { PhoneRecord } from '../../types/index'

export default createStore<RootState>({
  state: {
    phoneRecords: []
  },
  mutations: {
    setPhoneRecords(state, phoneRecords: PhoneRecord[]) {
      state.phoneRecords = phoneRecords
    }
  },
  actions: {
    async loadRecords({ commit }) {
      const { data: phoneRecords } = await api.getAll()
      commit('setPhoneRecords', phoneRecords)
    },
    async deleteRecord({ dispatch }, recordId: string) {
      await api.deleteOne(recordId)
      dispatch('loadRecords')
    },
    async updateRecord({ dispatch }, record: PhoneRecord) {
      await api.updateOne(record.id, record)
      dispatch('loadRecords')
    },
    async createRecord({ dispatch }, record: PhoneRecord) {
      await api.createOne(record)
      dispatch('loadRecords')
    }
  },
  modules: {}
})
