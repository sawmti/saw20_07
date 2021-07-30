const SparqlClient = require('sparql-http-client')

module.exports = async function() {

    const endpointUrl = 'https://query.wikidata.org/sparql'
    const query = `
    SELECT ?item ?itemLabel ?itemParty WHERE {
        ?item wdt:P39 wd:Q107417314 .
        ?item wdt:P102 ?itemParty .
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
    `
    const client = new SparqlClient({ endpointUrl })
    const stream = await client.query.select(query)

    stream.on('data', row => {
        console.log(JSON.stringify(row, undefined, 2));
       
    });

    stream.on('error', err => {
        console.error(err)
    });
}

