require('dotenv').config()
const { Client } = require('pg')

const config = {
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}

exports.handler = function(event, context, callback) {

  var email = event.body.email
  var ticketsLeft = event.body.ticketsLeft
  var contact = event.body.contact

  var query = `INSERT INTO student
              VALUES('${email}', ${ticketsLeft}, '${contact}')
              ON CONFLICT (email)
              DO
                 UPDATE SET tickets_left = ${ticketsLeft}, contact = '${contact}';`

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
