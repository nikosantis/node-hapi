'use strict'

const Hapi = require('@hapi/hapi')
const handlerbars = require('handlebars')
const inert = require('@hapi/inert')
const path = require('path')
const Vision = require('@hapi/vision')

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

async function init () {
  try {
    await server.register(inert)
    await server.register(Vision)

    server.views({
      engines: {
        hbs: handlerbars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })

    server.route({
      method: 'GET',
      path: '/',
      handler: (req, h) => {
        return h.view('index', {
          title: 'home'
        })
      }
    })

    server.route({
      method: 'GET',
      path: '/register',
      handler: (req, h) => {
        return h.view('register', {
          title: 'Registro'
        })
      }
    })

    server.route({
      method: 'POST',
      path: '/create-user',
      handler: (req, h) => {
        console.log(req.payload)
        return 'Usuario creado'
      }
    })

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          index: ['index.html']
        }
      }
    })
    await server.start()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Servidor lanzado en: ${server.info.uri}`)
}

init()
