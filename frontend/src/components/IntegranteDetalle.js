import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';

class IntegranteDetalle extends React.Component {
//const  = (props) => {
    constructor(props) {
        super(props);
        this.state = {
            id: props.integranteid,
            detalle: {
                content: {}
            }
        };
    }

    componentDidMount() {
        clienteAxios.get('/integrantes/'+this.state.id)
        .then(respuesta => {
            this.setState({ detalle: respuesta.data.data.integrante });
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return( 
            <Fragment>
                <section className="py-4 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">Integrante: </h1>

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

                <div className="container px-4 py-4" id="icon-grid">
                    <h2 className="pb-2 border-bottom">Detalle</h2>

                    <div className="row featurette">
                        <div className="col-md-8">

                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 py-5">
                                <div className="col d-flex align-items-start">
                                    <i className="fas fa-code iconoportal"></i>
                                    <div>
                                    <h4 className="fw-bold mb-0">Código WikiData</h4>
                                    <p>{this.state.detalle.entity}</p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <i className="fas fa-briefcase iconoportal"></i>
                                    <div>
                                    <h4 className="fw-bold mb-0">Ocupación</h4>
                                    <p>{this.state.detalle.content.occupation}</p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <i className="fas fa-briefcase iconoportal"></i>
                                    <div>
                                    <h4 className="fw-bold mb-0">Posicion</h4>
                                    <p>{this.state.detalle.content.position}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <img src={this.state.detalle.content.image} className="card-img-top" alt="nombre" />
                        </div>
                    </div>

                </div>

            </Fragment>
        );
    }
}

export default withRouter(IntegranteDetalle);