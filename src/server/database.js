let mongoose = require('mongoose')

const server = 'localhost'
const database = 'dashboard'

class Database {
  constructor() {
    this.connnected = false
    this._connect()
  }
  
    _connect() {
     mongoose.connect(`mongodb://${server}/${database}`,{
            useNewUrlParser: true
        })
       .then(() => {
         console.log('Database connection successful')
         this.connnected = true
       })
       .catch(err => {
         console.error('Database connection error')
         this.connnected = false
       })
  }

  isConnected(){
      return this.connnected
  }
}

module.exports = new Database()