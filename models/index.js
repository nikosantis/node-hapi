'use strict'

var admin = require('firebase-admin');
var serviceAccount = require('../config/firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://platzioverflow-c708a.firebaseio.com'
});

const db = admin.database()

const Users = require('./users')

module.exports = {
  users: new Users(db)
}
