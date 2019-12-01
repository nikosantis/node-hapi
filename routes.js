'use strict'

const Joi = require('@hapi/joi')
const site = require('./controllers/site')
const user = require('./controllers/user')

module.exports = [
  {
    path: '/',
    method: 'GET',
    handler: site.home
  },
  {
    path: '/register',
    method: 'GET',
    handler: site.register
  },
  {
    path: '/create-user',
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required().min(3),
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        }),
        failAction: user.failValidation
      }
    },
    handler: user.createUser
  },
  {
    path: '/login',
    method: 'GET',
    handler: site.login
  },
  {
    path: '/logout',
    method: 'GET',
    handler: user.logout
  },
  {
    path: '/validate-user',
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        }),
        failAction: user.failValidation
      }
    },
    handler: user.validateUser
  },
  {
    path: '/assets/{param*}',
    method: 'GET',
    handler: {
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  },
  {
    method: ['GET', 'POST'],
    path: '/{any*}',
    handler: site.notFound
  }
]