
const WBK = require('wikibase-sdk');
const fetch = require('node-fetch');

const wbk = WBK({
    instance: 'https://www.wikidata.org',
    sparqlEndpoint: 'https://query.wikidata.org/sparql'
});

const wikiController = {
    getId: (id) => {
        /*
        console.log(id);
        const url = wbk.getEntities({
            ids: [ id ], // 'Q107417314'
            props: [ 'info', 'claims' ],
            languages: [ 'es' ]
        });

        console.log(url);
        res = await fetch(url);
        fetch.then((res) => {
            console.log(res.json();)
        }).catch((e) => {
            console.log("ERROR");
        }); 

        //parse = await res.json();
        //parse = await wbk.parse.wb.entities(res);
        //console.log(JSON.stringify(parse, undefined, 2));
        */
        return 10;
    },

    query: (sparql) => {
        return new Promise((resolve, reject) => {
            const url = wbk.sparqlQuery(sparql);
            fetch(url).then((res) => {
                console.log(res.json());
                resolve();
            }).catch((e) => {
                reject("E");
            });
        });
    }
};

module.exports =  wikiController;