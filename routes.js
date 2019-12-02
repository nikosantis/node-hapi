'use strict'

const Joi = require('@hapi/joi')
const site = require('./controllers/site')
const user = require('./controllers/user')
const question = require('./controllers/question')

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
    method: 'GET',
    path: '/login',
    handler: site.login
  },
  {
    method: 'GET',
    path: '/question/{id}',
    handler: site.viewQuestion
  },
  {
    method: 'GET',
    path: '/logout',
    handler: user.logout
  },
  {
    method: 'GET',
    path: '/ask',
    handler: site.ask
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
    path: '/create-question',
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required()
        }),
        failAction: user.failValidation
      }
    },
    handler: question.createQuestion
  },
  {
    path: '/answer-question',
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          answer: Joi.string().required(),
          id: Joi.string().required()
        }),
        failAction: user.failValidation
      }
    },
    handler: question.answerQuestion
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