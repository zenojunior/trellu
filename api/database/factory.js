'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Group', async (faker, i, data) => {
  return {
    name: data.name,
  }
})

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  return {
    name: data[i].name,
    email: data[i].email,
    username: data[i].username,
    password: data[i].password,
    group_id: data[i].group_id
  }
})
