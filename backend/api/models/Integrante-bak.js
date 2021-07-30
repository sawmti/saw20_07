const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const integrantesSchema = new Schema({
    nombre:{
        type: String,
        trim: true,
    },
    codexterno:{
        type: String,
        trim: true
    },
    ocupacion:{
        type: String,
        trim: true
    },
    urlimagen:{
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Integrante',integrantesSchema);