const express = require('express')
const app = express()
const bindPort = Number(process.env.FGIP_BIND_PORT) || 8080
const includeCountry = Boolean(process.env.FGIP_INCLUDE_COUNTRY)

app.use((req, res) => {
  res
    .status(200)
    .json({
      ip: req.ip
    })
})

app.listen(bindPort, () => {
  console.info(`Listening on ${bindPort}`)
})
