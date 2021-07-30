const WBK = require('wikibase-sdk');
const fetch = require('node-fetch');

const wbk = WBK({
instance: 'https://www.wikidata.org',
sparqlEndpoint: 'https://query.wikidata.org/sparql'
});

const url = wbk.getEntities({
    ids: [ 'Q107417314' ],
    languages: [ 'es' ]
  })
  
  fetch(url)
  .then(response => response.json())
  // Turns the response in an array of simplified entities
  .then(wbk.parse.wb.entities)
  .then(entities => {
    console.log(JSON.stringify(entities, undefined, 2));
  });



