import { LowSync, JSONFileSync } from 'lowdb'
import { DB } from '../../types'
import { join } from 'path'
import fakeJSONDB from './generator'

fakeJSONDB()
const file = join(__dirname, 'db.json')
const adapter = new JSONFileSync<DB>(file)
const db = new LowSync(adapter)

export default db
