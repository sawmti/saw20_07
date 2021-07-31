import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const CrearAnotacion = (props) => {

    //Generar state como objeto 

    const [integrante, editarIntegrante] = useState({
        name: '',
        entity: '',
        image: '',
        occupation: ''
    });

    // Leer los datos del formulario 
    const actualizarState = e => {
        //console.log(e.target.name);
        //console.log(e.target.value)
        editarIntegrante({
            ...integrante,
            [e.target.name] : e.target.value 
        })
    }
    
    console.log('Integrante ID:' + props.integranteid);
    console.log(props.listaintegrantes);

    return( 
        <Fragment>

            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Crear anotación</h1>

                        <p className="lead text-muted">
                            En esta sección puedes agregar una anotación a un integrante 
                            ya existente. Los datos que puedes indicar están dentro de un 
                            universo establecido.
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

                        <form method="post">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
                                    name="name"
                                    aria-describedby="txtnombreHelp" 
                                    onChange = {actualizarState}
                                />
                                <div id="txtnombreHelp" className="form-text">Nombre y apellidos del integrante de la convención.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="entity" className="form-label">Código externo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="entity" 
                                    name="entity" 
                                    onChange = {actualizarState}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="occupation" className="form-label">Ocupación</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="occupation" 
                                    name="occupation" 
                                    onChange = {actualizarState}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Dirección imagen</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="image" 
                                    name="image" 
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

export default CrearAnotacion;