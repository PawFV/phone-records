import db from './db/'
import cors from 'cors'
import express from 'express'
import { PhoneRecord } from '../types'
import { findIndex } from 'lodash'
import faker from 'faker'
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

let PhoneBook: PhoneRecord[]
app.use(async (req, res, next) => {
  db.read()
  PhoneBook = db.data.phoneBook
  next()
})

app.get('/phonebook', async (req, res) => res.json(PhoneBook))

app.post('/phonebook', async (req, res) => {
  const phoneRecord = req.body as PhoneRecord

  PhoneBook.push({ ...phoneRecord, id: faker.datatype.uuid() })
  db.write()

  res.json({ message: 'record created' })
})

app.put('/phonebook/:id', async (req, res) => {
  const { id } = req.params
  const update = req.body as PhoneRecord

  const recordIndex = findIndex(PhoneBook, { id })
  const record = PhoneBook[recordIndex]

  if (!record) {
    return res.status(404).json({ message: 'Record not found' })
  }

  PhoneBook[recordIndex] = { ...record, ...update }
  db.write()

  res.json({ message: 'record updated' })
})

app.delete('/phonebook/:id', (req, res) => {
  const { id } = req.params
  const recordIndex = findIndex(PhoneBook, { id })
  const record = PhoneBook[recordIndex]

  if (!record) {
    return res.status(404).json({ message: 'Record not found' })
  }

  PhoneBook.splice(recordIndex, 1)
  db.write()

  res.json({ message: 'record deleted' })
})

app.listen(port, () => console.log(`PhoneBook Server listening on localhost:${port}`))
