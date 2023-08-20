import mysql from 'mysql'

export default mysql.createConnection({
  host: 'localhost', //Host Name
  user: 'root', // User Name
  password: '', //Password of your database
  database: '' //Database name
})