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

  var query = `with students_with_max_tickets as (select *
                                								  from student
                                								  where tickets_left = (select max(tickets_left)
                                														from student))
              select *
              from students_with_max_tickets
              offset floor(random() * (select count(*)
              						from students_with_max_tickets))
              limit 1;`

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
