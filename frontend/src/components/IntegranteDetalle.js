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
            console.log(this.state);
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        let listaocupacion = "";

        let contador = 0;
        for (var j in this.state.detalle.content.occupation){
            contador++;
        }

        console.log("Cantidad de profesiones: " + contador);
        console.log("Repeticiones profesiones: " + j);

        for (var i in this.state.detalle.content.occupation){
            if (this.state.detalle.content.occupation[i].length > 0){
                listaocupacion += this.state.detalle.content.occupation[i].charAt(0).toUpperCase() 
                + this.state.detalle.content.occupation[i].slice(1);
            }

            if (i < (contador - 1)){
                listaocupacion += " - \n";
            }
        }
        console.log(listaocupacion);

        contador = 0;
        for (j in this.state.detalle.content.position){
            contador++;
        }
        console.log("Cantidad de actividades: " + contador);
        console.log("Repeticiones actividades: " + j);

        let listaposiciones = "";
        for (i in this.state.detalle.content.position){
            if (this.state.detalle.content.position[i].length > 0){
                listaposiciones += this.state.detalle.content.position[i].charAt(0).toUpperCase() 
                + this.state.detalle.content.position[i].slice(1);
            }

            if (i < (contador - 1)){
                listaposiciones += " - \n";
            }
        }
        console.log(listaposiciones);

        contador = 0;
        for (j in this.state.detalle.content.education){
            contador++;
        }
        console.log("Cantidad de estudios: " + contador);
        console.log("Repeticiones estudios: " + j);

        let listaeducacion = "";
        for (i in this.state.detalle.content.education){
            if (this.state.detalle.content.education[i].length > 0){
                listaeducacion += this.state.detalle.content.education[i].charAt(0).toUpperCase() 
                + this.state.detalle.content.education[i].slice(1);
            }

            if (i < (contador - 1)){
                listaeducacion += " - \n";
            }
        }
        console.log(listaeducacion);

        let genero = String(this.state.detalle.content.gender);
        let detallegenero = "";

        if (genero.length > 0){
            detallegenero = genero.charAt(0).toUpperCase() + genero.slice(1);
        }

        let nacimiento = JSON.stringify(this.state.detalle.content.birth);
        
        let datosfecha = String(nacimiento).split(",");
        let nacimientolugar = datosfecha[0];
        let nacimientofecha = String(datosfecha[1]);

        nacimientolugar = nacimientolugar.replace('{"place":"','');
        nacimientolugar = nacimientolugar.replace('"','');

        console.log(nacimientolugar);

        nacimientofecha = nacimientofecha.replace('"date":"','');
        nacimientofecha = nacimientofecha.replace('"}','');
        nacimientofecha = nacimientofecha.substr(0,10);

        console.log(nacimientofecha);
        

        let partido = JSON.stringify(this.state.detalle.content.party);
        
        let datospartido = String(partido).split('","');
        let partidonombre = String(datospartido[0]);
        let partidologo = String(datospartido[1]);

        partidonombre = partidonombre.replace('{"name":"','');
        partidonombre = partidonombre.replace('"','');

        partidologo = partidologo.replace('logo":"','');
        partidologo = partidologo.replace('"}','');

        console.log(partidonombre);
        console.log(partidologo);

        return( 
            <Fragment>
                <section className="py-4 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">Integrante: {this.state.detalle.content.name}</h1>

                            <p className="lead text-muted">En esta sección se muestra el detalle
                            del integrante de la convención seleccionado.
                            </p>
                            <p>
                                <Link to={'/agregar'} className="btn btn-success my-2">Agregar integrante</Link>
                                &nbsp;
                                <Link to={'/comentarios'} className="btn btn-primary my-2">Envíanos tus comentarios</Link>
                            </p>
                        </div>
                    </div>
                </section>

                <div className="container px-4 py-4 bg-light" id="icon-grid">
                    <h2 className="pb-2 border-bottom">Detalle</h2>

                    <div className="row featurette">
                        <div className="col-md-8">

                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4 py-5">
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
                                    <p>{listaocupacion}</p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <i class="fas fa-chart-line iconoportal"></i>
                                    <div>
                                    <h4 className="fw-bold mb-0">Posición</h4>
                                    <p>{listaposiciones}</p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <i className="fas fa-school iconoportal"></i>
                                    <div>
                                    <h4 className="fw-bold mb-0">Educación</h4>
                                    <p>{listaeducacion}</p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <i className="fas fa-venus-mars iconoportal"></i>
                                    <div>
                                    <h4 className="fw-bold mb-0">Género</h4>
                                    <p>{detallegenero}</p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <i className="fas fa-globe-americas iconoportal"></i>
                                    <div>
                                    <h4 className="fw-bold mb-0">Lugar de Nacimiento</h4>
                                    <p>{nacimientolugar}</p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <i className="fas fa-birthday-cake iconoportal"></i>
                                    <div>
                                    <h4 className="fw-bold mb-0">Fecha de Nacimiento</h4>
                                    <p>{nacimientofecha}</p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <i className="fas fa-users iconoportal"></i>
                                    <div>
                                    <h4 className="fw-bold mb-0">Partido político</h4>
                                    <p>{partidonombre}</p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <i className="fas fa-sign iconoportal"></i>
                                    <div>
                                    <h4 className="fw-bold mb-0">Logo partido</h4>
                                    <br/>
                                    <p><img src={partidologo} className="estilologo" alt={`Logo ${partidonombre}`} /></p>
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