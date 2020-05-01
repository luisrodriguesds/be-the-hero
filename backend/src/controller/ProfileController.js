const conn = require('../database/connection')

module.exports = {
  async index (request, response){
    const ong_id = request.headers.authorization
    const incidents = await conn('incidents').where('ong_id', ong_id).select('*')

    return response.send(incidents)
  },
  async session (request, response){
    const {id} = request.body

    const ong = await conn('ongs').where('id', id).select('name').first()

    if (!ong) {
      return response.status(400).json({error:'Nada encontrado'})
    }

    return response.json(ong)
  }
}