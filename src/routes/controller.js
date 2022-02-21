const axios = require('axios');
const xml2js = require('xml2js');

async function getPersonData(req, res) {
  const jsonDataPromise = getPersonJSONData();
  const xmlDataPromise = getPersonXMLData();
  const [jsonData, xmlData] = await Promise.all([jsonDataPromise, xmlDataPromise]);
  const convertedData = convertXMLToJSON(xmlData).persons;
  const newJson = jsonData.person.concat(convertedData.person);
  sortedJson = sortJSON(newJson, 'id');
  return { persons: sortedJson }
}

async function getPersonJSONData() {
  const url = 'http://localhost:3000/person/json';
  try {
    const { data: response } = await axios.get(url);
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

async function getPersonXMLData() {
  const url = 'http://localhost:3000/person/xml';
  try {
    const { data: response } = await axios.get(url);
    return response;
  }
  catch (error) {
    console.log(error);
  }
}


function convertXMLToJSON(xmlData) {
  let convertedData = {};
  const parser = new xml2js.Parser({ explicitArray: false });

  parser.parseString(xmlData, function (err, results) {
    convertedData = results;
  });
  return convertedData;
}


function sortJSON(array, key) {
  return array.sort(function (a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

module.exports =
  { getPersonData }