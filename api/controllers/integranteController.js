const Integrante = require('../models/Integrante');

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
        const integrantes = await Integrante.find({});
        res.json(integrantes);
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
        res.json(integrante);
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