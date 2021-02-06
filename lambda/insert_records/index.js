require('dotenv').config()
const { Client } = require('pg')

const config = {
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}

exports.handler = function(event, context, callback) {

  var email = event.email
  var ticketsLeft = event.ticketsLeft
  var contact = event.contact
  var campus = event.campus

  var query = `INSERT INTO student (email, tickets_left, contact, campus)
              VALUES('${email}', ${ticketsLeft}, '${contact}', ${campus})
              ON CONFLICT (email)
              DO
                 UPDATE SET tickets_left = ${ticketsLeft}, contact = '${contact}', campus=${campus};`

  const client = new Client(config)
  client.connect(err => {
    if (err) {

      callback(err, null)

    } else {

      client.query(query, (err, res) => {

        if(err) {

          callback(err, null)

        }

        client.end()
        callback(null, res)

      })
    }
  })

};
