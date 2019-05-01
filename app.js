const express = require('express');
const Nexmo = require('nexmo');
const CronJob = require('cron').CronJob;
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware setup
const nexmo = new Nexmo({
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET
});

const sendText = () => {
  axios.get('https://api.icndb.com/jokes/random')
  .then(joke => {
    let textString = "Here's today's Chuck Norris joke:\n\n";
    textString += joke.data.value.joke;
    textString += '\n\nLove ya Dad\n- Chase';
    nexmo.message.sendSms(process.env.NEXMONUMBER, process.env.SENDTONUMBER, textString);
  })
  .catch(error => console.log(error));
}

new CronJob('0 0 10 * * *', sendText, null, true, 'America/Chicago');

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('App Started'));