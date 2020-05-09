'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Incident = use('App/Models/Incident')

/**
 * Resourceful controller for interacting with incidents
 */
class IncidentController {
  /**
   * Show a list of all incidents.
   * GET incidents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    const {page=1} = request.all()
    const incidents = await Incident.query().paginate(page, 5)
    return incidents
  }

  /**
   * Create/save a new incident.
   * POST incidents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      await auth.check()
    } catch (error) {
      return response.status(401).send({
        message:"Usuário não logado.",
        error:true
      })
    }

    const data = request.only([
      'title',
      'description',
      'value'
    ])

    const incident = await Incident.create({...data, user_id:auth.user.toJSON().id})
    await incident.load('user')
    return incident

  }

  /**
   * Display a single incident.
   * GET incidents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const incident = await Incident.findBy('id', params.id)
    await incident.load('user')
    return incident
  }

 

  /**
   * Update incident details.
   * PUT or PATCH incidents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const incident = await Incident.findBy('id', params.id)
    const data = request.only([
      'title',
      'description',
      'value'
    ])

    incident.merge(data)
    await incident.save()
    return incident
  }

  /**
   * Delete a incident with id.
   * DELETE incidents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const incident = await Incident.findBy('id', params.id)
    await incident.delete()
    return response.status(200).send({message:"Incidente deletado com sucesso!", error:false})
  }
}

module.exports = IncidentController
