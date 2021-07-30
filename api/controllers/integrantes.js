const Integrante = require('../models/Integrante');
const wiki = require('../libs/wiki');

const path = require('path');

//Crear un nuevo integrante 
exports.nuevoIntegrante = async (req, res, next) => {
    //console.log(req.body);

    // Crear objeto integrante con datos de req.body
    const integrante = new Integrante(req.body);

    try{
        await integrante.save();
        res.json({ mensaje: 'El integrante se agregó correctamente'});
    }catch(error){
        console.log(error);
        next();
    }

}

/** Obtengo todos los integrantes */
exports.obtenerIntegrantes = async (req, res, next) => {
    try{
        console.log("Obteniendo integrantes");
        let integrantes = await Integrante.find({});
        if(integrantes.length > 0 ) {
            console.log("lectura base de datos, integrantes: " + integrantes.length);
            res.json(integrantes);
        }
        else {
            wiki.query(`
            SELECT ?item ?itemLabel ?itemOccupationLabel ?itemImage ?itemPartyLabel ?itemPartyLogo WHERE {
                ?item wdt:P39 wd:Q107417314 .
                ?item wdt:P106 ?itemOccupation .
                ?item wdt:P102 ?itemParty .
                ?item wdt:P18 ?itemImage .
                ?itemParty wdt:P154 ?itemPartyLogo .
                SERVICE wikibase:label { bd:serviceParam wikibase:language "es". }
            }
            `).then((response) => {

                integrantes = [];
                //// nombre, imagen, ocupacion, partido e imagen del partido //
                if (response.results.bindings) {
                    response.results.bindings.forEach((register) => {
                        integrante = new Integrante({
                            entity: path.basename(register.item.value),
                            content: {
                                name: register.itemLabel.value,
                                image: register.itemImage.value,
                                occupation: register.itemOccupationLabel.value,
                                party: {
                                    name: register.itemPartyLabel.value,
                                    logo: register.itemPartyLogo.value
                                }
                            }
                        });

                        console.log(JSON.stringify(integrante, undefined, 2));
                        
                        integrante.save();
                        integrantes.push(integrante);
                    });
                }
                console.info("consulta realizada, integrantes: " + integrantes.length);
                res.json({
                    status: "success",
                    data: {
                        integrantes
                    }
                });
            })
        }
    }
    catch (error){
        console.log(error);
        next();
    }
}

/** Obtengo un integrante específico por ID */
exports.obtenerIntegrante = async (req, res, next) => {
    try{
        const integrante = await Integrante.findById(req.params.id);
        console.log(integrante);
        wiki.getProperties(integrante.entity).then((a) => {
            console.log(JSON.stringify(a, undefined, 2 ));
        });
        res.json({
            status: "success",
            data: {
                integrante
            }
        });
    }
    catch (error){
        console.log(error);
        next();
    }
}

/** Actualiza un registro por su ID */
exports.actualizarIntegrante = async (req, res, next) => {
    try{
        const integrante = await Integrante.findOneAndUpdate({_id : req.params.id}, req.body, {
            new: true
        });
        res.json(integrante);
    }
    catch (error){
        console.log(error);
        next();
    }
}

/** Elimina un paciente por su ID */
exports.eliminarIntegrante = async (req, res, next) => {
    try{
        
        await Integrante.findByIdAndDelete({_id : req.params.id});
        res.json({mensaje: 'El integrante fue eliminado'});
    }
    catch (error){
        console.log(error);
        next();
    }
}