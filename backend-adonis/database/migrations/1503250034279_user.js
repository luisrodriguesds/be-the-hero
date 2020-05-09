'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 254).notNullable()
      table.string('whatsapp', 60).notNullable()
      table.string('city', 60).notNullable()
      table.string('uf', 2).notNullable()
      table.enu('type', ['user', 'ong'])
      table.integer('status').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
