const Integrante = require('../models/Integrante');
const wiki = require('../libs/wiki');

const path = require('path');

const fields = {
    item: "entity",
    itemPartyLabel: "party.name",
    itemPartyLogo: "party.logo",
    itemImage: "image",
    itemBirthDate: "birth.date",
    itemLabel: "name",
    itemOccupationLabel: "occupation",
    itemEducationLabel: "education",
    itemGenderLabel: "gender",
    itemBirthPlaceLabel: "birth.place",
    itemEducationLabel: []
}
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
        results = [];

        let integrantes = await Integrante.find({});
        if(integrantes.length > 0 ) {
            console.log("lectura base de datos, integrantes: " + integrantes.length);
            integrantes.forEach((integrante) => {
                results.push({
                    entity: integrante.entity,
                    content: {
                        name: integrante.content.name,
                        image: integrante.content.image
                    }
                });
            });
            
            res.json({
                status: "success",
                data: {
                    integrantes: results
                }
            });
        }
        else {
            wiki.query(`
            SELECT ?item ?itemLabel ?itemOccupationLabel ?itemGenderLabel ?itemBirthDate ?itemBirthPlaceLabel ?itemEducationLabel ?itemPositionLabel ?itemImage ?itemPartyLabel ?itemPartyLogo WHERE {
                ?item wdt:P39 wd:Q107417314 .
                ?item wdt:P106 ?itemOccupation .
                ?item wdt:P21 ?itemGender .
                ?item wdt:P569 ?itemBirthDate .
                ?item wdt:P19 ?itemBirthPlace .
                ?item wdt:P69 ?itemEducation .
                ?item wdt:P102 ?itemParty .
                ?item wdt:P18 ?itemImage .
                ?item wdt:P39 ?itemPosition .
                ?itemParty wdt:P154 ?itemPartyLogo .
                SERVICE wikibase:label { bd:serviceParam wikibase:language "es". }
            }
            `).then((response) => {

                integrantes = {};
                //// nombre, imagen, ocupacion, partido e imagen del partido //
                if (response.results.bindings) {
                    response.results.bindings.forEach((register) => {
                        
                        key = path.basename(register.item.value);
                        if (!integrantes[key]) {
                            integrantes[key] = {
                                entity: key,
                                content: {
                                    name: register.itemLabel.value,
                                    gender: register.itemGenderLabel.value,
                                    image: register.itemImage.value,
                                    occupation: [], //register.itemOccupationLabel.value,
                                    education: [], //register.itemEducationLabel.value,
                                    position: [], //register.PositionLabel.value,
                                    birth: {
                                        place: register.itemBirthPlaceLabel.value,
                                        date: register.itemBirthDate.value
                                    },
                                    party: {
                                        name: register.itemPartyLabel.value,
                                        logo: register.itemPartyLogo.value
                                    }
                                }
                            };
                        }

                        if (integrantes[key].content.occupation.indexOf(register.itemOccupationLabel.value) < 0)
                            integrantes[key].content.occupation.push(register.itemOccupationLabel.value);
                        if (integrantes[key].content.education.indexOf(register.itemEducationLabel.value) < 0)    
                            integrantes[key].content.education.push(register.itemEducationLabel.value);
                        if (integrantes[key].content.position.indexOf(register.itemPositionLabel.value) < 0)
                            integrantes[key].content.position.push(register.itemPositionLabel.value);
                       
                    });
                }

                Object.keys(integrantes).forEach((key) => {

                    created = new Integrante(integrantes[key]);
                    created.save();
                    
                    results.push({
                        _id: created._id,
                        entity: integrantes[key].entity,
                        content: {
                            name: integrantes[key].content.name,
                            image: integrantes[key].content.image
                        }
                    });
                });
                
                console.info("consulta realizada, integrantes: " + results.length);
                res.json({
                    status: "success",
                    data: {
                        integrantes: results
                    }
                });
            });
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