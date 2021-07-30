const WBK = require('wikibase-sdk');
const fetch = require('node-fetch');

const wbk = WBK({
    instance: 'https://www.wikidata.org',
    sparqlEndpoint: 'https://query.wikidata.org/sparql'
});

// https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=Q54799925
const wikiController = {
    getProperties: (id) => {
        return new Promise((resolve, reject) => {
            let url = "https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=" + id;
            fetch(url).then(res => res.json())
                    .then(json => {
                        entity = json.entities.Q54799925;
                        simplifiedClaims = wbk.simplify.claims(entity.claims);
                        const simplifiedP31Claims = wbk.simplify.propertyClaims(entity.claims.P31)
                        console.log(simplifiedClaims);
                        console.log(simplifiedP31Claims);
                        resolve(json);
                    }).catch(e => {
                        console.log("123123");
                        console.log(e);
                        reject("Exxxxxxx");
                    });
        });
    },
    getId: (id) => {    
        return new Promise((resolve, reject) => {
            const url = wbk.getEntities({
                ids: [ id ], // 'Q107417314'
                languages: [ 'es' ]
            });

            fetch(url).then(res => res.json())
                .then(json => {
                    entity = json.entities.Q54799925;
                    simplifiedClaims = wbk.simplify.claims(entity.claims);
                    const simplifiedP31Claims = wbk.simplify.propertyClaims(entity.claims.P31)
                    console.log(simplifiedClaims);
                    console.log(simplifiedP31Claims);
                    resolve(json);
                }).catch((e) => {
                    console.log(e);
                    reject(e);
                });
        });
    },

    query: (sparql) => {
        return new Promise((resolve, reject) => {
            const url = wbk.sparqlQuery(sparql);
            fetch(url).then(res => res.json())
                .then(json => {
                    resolve(json);
                }).catch(e => {
                    console.log(e);
                    reject(e);
                });
        });
    }
};

module.exports =  wikiController;