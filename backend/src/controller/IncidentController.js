const conn = require('../database/connection')

module.exports = {
  async store (request, response) {
    const data = request.body
    const ong_id = request.headers.authorization
    const [id] = await conn('incidents').insert({
      ong_id, ...data
    })
  
    return response.json({id})
  },
  async index (request, response){
    const {page=1} = request.query
    const [count] = await conn('incidents').count()

    const incidents = await conn('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit('5')
      .offset((page-1)*5)
      .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.city', 'ongs.uf'])

    response.header('X-Total-Count', count['count(*)'])

    return response.json(incidents)
  },
  async delete (request, response){
    const {id} = request.params
    const ong_id = request.headers.authorization
    const incident = await conn('incidents').where('id', id).select('ong_id').first()

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({error: 'Operação não permitida'})
    }

    await conn('incidents').where('id', id).delete()

    return response.status(204).send()

  }
}