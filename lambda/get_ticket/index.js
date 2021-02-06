require('dotenv').config()
const { Client } = require('pg')

const config = {
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}

exports.handler = function(event, context, callback) {

  var query = `with tickets_raffle_campus as (SELECT s.contact
                                              FROM student s
                                              	JOIN generator_31 g
                                              	ON g.n between 1 and s.tickets_left
                                              where campus = ${event.campus}
                                              order by s.email , g.n)
              select *
              from tickets_raffle_campus
              offset floor(random() * (select count(*)
              						from tickets_raffle_campus))
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
        callback(null, res.rows[0])

      })
    }
  })

};
