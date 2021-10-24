import fs from 'fs-extra'
import faker from 'faker'
import { PhoneRecord } from '../../types/'

const fakeJSONDB = () => {
  const phoneBook: PhoneRecord[] = []

  for (let i = 0; i < 50; i++) {
    phoneBook.push({
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email()
    })
  }

  if (!fs.existsSync('./db/db.json')) {
    fs.writeJSONSync('./db/db.json', { phoneBook })
  }
}

export default fakeJSONDB
