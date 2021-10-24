export interface PhoneRecord {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
}

export interface DB {
  phoneBook: PhoneRecord[]
}

export interface ResponseMessage {
  message: string
}
