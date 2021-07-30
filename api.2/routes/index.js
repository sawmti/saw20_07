const express = require('express');
const router = express.Router();
const integranteController = require('../controllers/integranteController');

module.exports = function() {

    router.get('/integrantes', 
        integranteController.obtenerIntegrantes
    );

    // Agrega nuevos integrantes via POST
    router.post('/integrantes',
        integranteController.nuevoIntegrante
    );

    // Obtiene un integrante en específico (ID)
    router.get('/integrantes/:id',
        integranteController.obtenerIntegrante 
    );

    // Actualizar un integrante con un ID especifico
    router.put('/integrantes/:id',
        integranteController.actualizarIntegrante
    );

    //Elimina un paciente por su ID
    router.delete('/integrantes/:id',
        integranteController.eliminarIntegrante
    );

    return router;
}
