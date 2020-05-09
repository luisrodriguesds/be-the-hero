'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IncidentSchema extends Schema {
  up () {
    this.create('incidents', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('title', 80).notNullable()
      table.text('description')
      table.string('value', 80)
      table.timestamps()
    })
  }

  down () {
    this.drop('incidents')
  }
}

module.exports = IncidentSchema
