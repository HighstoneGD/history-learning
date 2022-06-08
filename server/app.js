const express = require('express')
const moment = require('moment')
const { DEFAULT_FORMAT } = require('./constants/momentFormats')

const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/events/:start/:end', (req, res) => {
  const parsedEventsJson = require('./db/events.json')

  if (!moment(req.params.start, DEFAULT_FORMAT).isValid() || !moment(req.params.end, DEFAULT_FORMAT).isValid()) {
    res.status(400).send('Wrong date format.')
  }

  const from = moment(req.params.start, DEFAULT_FORMAT).toDate().getTime()
  const to = moment(req.params.end, DEFAULT_FORMAT).toDate().getTime()

  const result = parsedEventsJson.filter((event) => {
    const {
      exact,
      start,
      end
    } = event.date

    const exactDate = !!exact && moment(exact, DEFAULT_FORMAT).toDate().getTime()
    const startDate = !!start && moment(start, DEFAULT_FORMAT).toDate().getTime()
    const endDate = !!end && moment(end, DEFAULT_FORMAT).toDate().getTime()

    if (exact) {
      return exactDate >= from && exactDate <= to
    }

    return startDate <= to || endDate >= from
  })

  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
