const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const integrantesSchema = new Schema({
    entity: String,
    content: Object
});

module.exports = mongoose.model('Integrante',integrantesSchema);
