'use strict'
const User = use('App/Models/User')
class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    const user = await User.findBy('email',email)
    return response.status(200).send({
      token:token.token,
      user:user.toJSON()
    })
  }
}

module.exports = SessionController
