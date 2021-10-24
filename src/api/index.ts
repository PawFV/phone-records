import axios from 'axios'
import { PhoneRecord, ResponseMessage } from '../../types/index'

const api = () => {
  const url = process.env.URL || 'http://localhost:3000/phonebook/'
  return {
    getAll: () => axios.get<PhoneRecord[]>(url),
    updateOne: (id: string, record: PhoneRecord) => axios.put<ResponseMessage>(url + id, record),
    deleteOne: (id: string) => axios.delete<ResponseMessage>(url + id),
    createOne: (record: PhoneRecord) => axios.post<ResponseMessage>(url, record)
  }
}

export default api()
