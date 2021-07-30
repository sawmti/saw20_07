const express = require("express"); 
const wiki = require('./services/wiki');
const sparql = require('./services/sparql');

const app = express();

// negociacion de contenido //
app.get('/constituyentes', async (req, res) => {
    await wiki.getId('Q3068132');
    /// LECTUIRA WIKIDATA y ALMACENAMIENTO MONGO
    /*
    await wiki.query(`
    SELECT ?item ?itemLabel ?itemPartyImage ?itemPartyLabel ?itemPartyLogo WHERE {
        ?item wdt:P39 wd:Q107417314 .
        ?item wdt:P102 ?itemParty .
        ?item wdt:P18 ?itemPartyImage .
        ?itemParty wdt:P154 ?itemPartyLogo .
        SERVICE wikibase:label { bd:serviceParam wikibase:language "es". }
      }
    `)*/
    //// nombre, imagen, ocupacion, partido e imagen del partido //
    res.json({
        status: "success"
    });
});

app.get('/constituyentes/{id}', async (req, res) => {
    /// LECTUIRA WIKIDATA y ALMACENAMIENTO MONGO
    res.json({
        status: "success",
        data: {
            id: "Q3431244",
            name: "Juan Perez",
            xxx: yyy,
            nacionalidad: "chilena",
            ars: "10"
        }
    });
});

app.post('/constituyentes/Q3431244', async (req, res) => {
    /*
    {
        etiqueta: "valor",
        color: "verde",
        jacob: "vega"
    }
    */
    res.json({
        status: "success"
    });
});

app.put('/constituyentes', async (req, res) => {
    /*
        nombre: "asdasdasd",
        ocupacion: "asdasd",
        codigoExterno: "Q123",
        image: "asdasdasdasd"
    */
    res.json({
        status: "success"
    });
});

/*
*/

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
