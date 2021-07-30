import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

const IntegranteDetalle = (props) => {

    if (!props.integrante){
        props.history.push('/');
        return null;
    }

    // extraer por props
    const { integrante: { nombre, codexterno, ocupacion, urlimagen } } = props;

    return( 
        <Fragment>
            <section className="py-4 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Integrante: {nombre}</h1>

                        <p className="lead text-muted">En esta sección se muestra el detalle
                        del integrante de la convención seleccionado.
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

            <div class="container px-4 py-4" id="icon-grid">
                <h2 class="pb-2 border-bottom">Detalle</h2>

                <div class="row featurette">
                    <div class="col-md-8">

                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 py-5">
                            <div class="col d-flex align-items-start">
                                <i class="fas fa-code iconoportal"></i>
                                <div>
                                <h4 class="fw-bold mb-0">Código WikiData</h4>
                                <p>{codexterno}</p>
                                </div>
                            </div>
                            <div class="col d-flex align-items-start">
                                <i class="fas fa-briefcase iconoportal"></i>
                                <div>
                                <h4 class="fw-bold mb-0">Ocupación</h4>
                                <p>{ocupacion}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <img src={urlimagen} className="card-img-top" alt="{nombre}" />
                    </div>
                </div>

            </div>

        </Fragment>
    );
}

export default withRouter(IntegranteDetalle);