const { getPersonData } = require('./routes/controller');
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

const _jsonData = require('./data/data.json');

app.get('/person/json', (req, res) => {
  setTimeout(() => {
    res.send(_jsonData);
  }, 5000);
});

app.get('/person/xml', (req, res) => {
  setTimeout(() => {
    let xml_string = fs.readFileSync('./data/data.xml', "utf8");
    res.type('application/xml');
    res.send(xml_string);
  }, 10000);
});

app.get('/person/data', function (req, res) {
  getPersonData(req, res).then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  //  getPersonData();
})