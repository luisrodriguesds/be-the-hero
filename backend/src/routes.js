const express = require('express')
const OngController = require('./controller/OngController')
const IncidentController = require('./controller/IncidentController')
const ProfileController = require('./controller/ProfileController')

const routes = express.Router()

routes.get('/ongs', OngController.index)

routes.post('/ongs', OngController.store)

routes.post('/incidents', IncidentController.store)
routes.get('/incidents', IncidentController.index)
routes.delete('/incidents/:id', IncidentController.delete)


routes.get('/profile', ProfileController.index)
routes.post('/sessions', ProfileController.session)


module.exports = routes