import pkg from "pg"
import dotenv from 'dotenv'

dotenv.config()

const {Pool} = pkg

const DBSERVER = process.env.DBSERVER
const DBUSER = process.env.DBUSER
const DBPWD = process.env.DBPWD
const DBHOST = process.env.DBHOST
const DBPORT = process.env.DBPORT
const DB = process.env.DB

export default new Pool({
    //connectionString:`postgres://dev:${encodeURIComponent('1234')}@127.0.0.1:5432/kushop`
    connectionString:`${DBSERVER}://${DBUSER}:${encodeURIComponent(DBPWD)}@${DBHOST}:${DBPORT}/${DB}`
})

