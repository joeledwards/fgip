const fs = require('fs')
const http = require('http')
const https = require('https')
const express = require('express')
const app = express()
const bindPort = Number(process.env.FGIP_BIND_PORT) || 8080
const secureBindPort = Number(process.env.FGIP_SECURE_BIND_PORT) || 8443
const includeCountry = Boolean(process.env.FGIP_INCLUDE_COUNTRY)
const certPath = process.env.FGIP_CERT_PATH
const keyPath = process.env.FGIP_KEY_PATH

console.info('Include Country:', includeCountry)

async function server () {
  app.use((req, res) => {
    const {
      method,
      ip,
      path,
      query,
      headers
    } = req

    const summary = {
      method,
      path,
      query,
      headers
    }

    console.info(`Request from ${ip}\n${JSON.stringify(summary, null, 2)}`)

    const response = { ip }

    if (includeCountry) {
      response.country = {}
    }

    res.status(200).json(response)
  })

  http.createServer(app).listen(bindPort, () => {
    console.info(`Listening on ${bindPort} ...`)
  })

  var sslOptions = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
    passphrase: 'asdf'
  };

  https.createServer(sslOptions, app).listen(secureBindPort, () => {
    console.info(`Listening on ${secureBindPort} ...`)
  })
}

server()
