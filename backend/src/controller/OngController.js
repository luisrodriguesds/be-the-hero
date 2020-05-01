const crypto = require('crypto')
const conn = require('../database/connection')

module.exports = {
  async store (request, response) {
    const data = request.body

    const id = crypto.randomBytes(4).toString('HEX')
  
    await conn('ongs').insert({
      id, ...data
    })
  
    return response.json({id})
  },
  async index (request, response){
    const ongs = await conn('ongs').select('*')

    return response.json(ongs)
  }
}