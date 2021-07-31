const express = require('express');
const router = express.Router();
const controller = require('../controllers/integrantes');

module.exports = function() {

    router.get('/integrantes', 
        controller.obtenerIntegrantes
    );

    // Agrega nuevos integrantes via POST
    router.post('/integrantes',
        controller.nuevoIntegrante
    );

    // Obtiene un integrante en específico (ID)
    router.get('/integrantes/:id',
        controller.obtenerIntegrante 
    );

    // Actualizar un integrante con un ID especifico
    router.put('/integrantes/:id',
        controller.actualizarIntegrante
    );

    //Elimina un paciente por su ID
    router.delete('/integrantes/:id',
        controller.eliminarIntegrante
    );

    return router;
}