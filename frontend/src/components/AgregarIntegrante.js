import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';

const AgregarIntegrante = (props) => {

    console.log(props);

    //Generar state como objeto 

    const [integrante, guardarIntegrante] = useState({
        nombre: '',
        codexterno: '',
        ocupacion: '',
        urlimagen: ''
    });

    // Leer los datos del formulario 
    const actualizarState = e => {
        //console.log(e.target.name);
        //console.log(e.target.value)
        guardarIntegrante({
            ...integrante,
            [e.target.name] : e.target.value 
        })
    }

    // Enviar una petición a la API
    const crearNuevoIntegrante = e => {
        e.preventDefault();

        // enviar la petición por axios
        clienteAxios.post('/integrantes', integrante)
            .then(respuesta => {
                console.log(respuesta);

                props.guardarConsultar(true);

                //Redireccionar  
                props.history.push('/')
            })
    }


    return(
        <Fragment>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Agregar Integrante</h1>

                        <p className="lead text-muted">
                            En esta sección puedes agregar un nuevo integrante al listado 
                            de integrantes de la convención constituyente.
                        </p>
                        <p>
                            <Link to={'/buscar'} className="btn btn-primary my-2">Buscar integrante</Link>
                            &nbsp;
                            <Link to={'/comentarios'} className="btn btn-secondary my-2">Envíanos tus comentarios</Link>
                            &nbsp;
                            <Link to={'/agregar'} className="btn btn-success my-2">Agregar integrante</Link>
                        </p>


                    </div>
                </div>
            </section>

            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-10 row-cols-md-8 g-3">

                        <form method="post" onSubmit={crearNuevoIntegrante}>
                            <div className="mb-3">
                                <label htmlFor="txtnombre" className="form-label">Nombre</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="txtnombre" 
                                    name="nombre"
                                    aria-describedby="txtnombreHelp" 
                                    onChange = {actualizarState}
                                />
                                <div id="txtnombreHelp" className="form-text">Nombre y apellidos del integrante de la convención.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtcodexterno" className="form-label">Código externo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="txtcodexterno" 
                                    name="codexterno" 
                                    onChange = {actualizarState}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtocupacion" className="form-label">Ocupación</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="txtocupacion" 
                                    name="ocupacion" 
                                    onChange = {actualizarState}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txturlimagen" className="form-label">Dirección imagen</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="txturlimagen" 
                                    name="urlimagen" 
                                    onChange = {actualizarState}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </form>

                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default withRouter(AgregarIntegrante);