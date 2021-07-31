import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Integrantes = ({listaintegrantes}) => {
    //console.log(listaintegrantes);


    if (listaintegrantes.length === 0) return null;

    let listado = listaintegrantes.data["integrantes"];

    return (
        <Fragment>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Integrantes de la convención</h1>

                        <p className="lead text-muted">A continuación se indican los integrantes de la convención 
                            constitucional, junto con un enlace a su perfil en Wkidata. Además encontrarás
                            un enlace que te permitirá agregar nuevos datos.
                        </p>
                        <p>
                            <Link to={'/agregar'} className="btn btn-success my-2">Agregar integrante</Link>
                            &nbsp;
                            <Link to={'/comentarios'} className="btn btn-primary my-2">Envíanos tus comentarios</Link>
                        </p>

                    </div>
                </div>
            </section>

            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        
                    {listado.map(detintegrante => (

                        <div key={detintegrante._id} className="col">
                            <div className="card shadow-sm">
                                <img src={detintegrante.content.image} className="img-fluid img-responsive" alt="{detintegrante.entity}" />
                                <div className="card-body">
                                    <h5>{detintegrante.content.name}</h5>
                                    <p className="card-text">{detintegrante.entity}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <Link to={`/integrante/${detintegrante._id}`} className="btn btn-sm btn-outline-secondary">Detalle</Link>
                                            <a href={`http://www.wikidata.org/wiki/${detintegrante.entity}`} target="_blank" className="btn btn-sm btn-outline-secondary" rel="noreferrer">Wikidata</a>
                                            <Link to={`/crear/${detintegrante._id}`} className="btn btn-sm btn-outline-secondary">Editar</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        ))}

                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default Integrantes;