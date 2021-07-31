import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';

class CrearAnotacion extends React.Component {
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

        const actualizarCodigo = e => {
            this.state.detalle.entity = e.target.value;
            console.log(this.state.detalle);
        }

        const actualizarNombre = e => {
            //console.log(e.target.name);
            this.state.detalle.content.name = e.target.value;
            //console.log(e.target.value)
            console.log(this.state.detalle);
        }

        const actualizarGenero = e => {
            this.state.detalle.content.gender = e.target.value;
            console.log(this.state.detalle);
        }

        const actualizarImagen = e => {
            this.state.detalle.content.image = e.target.value;
            console.log(this.state.detalle);
        }

        const actualizarOcupacion = e => {
            //this.state.detalle.content.image = e.target.value;
            let datosocupacion = String(e.target.value).split(",");
            this.state.detalle.content.occupation = datosocupacion;
            //console.log(datosocupacion);
            console.log(this.state.detalle);
        }

        const actualizarEducacion = e => {
            let datoseducacion = String(e.target.value).split(",");
            this.state.detalle.content.education = datoseducacion;
            console.log(this.state.detalle);
        }

        const actualizarPosicion = e => {
            let datosposicion = String(e.target.value).split(",");
            this.state.detalle.content.position = datosposicion;
            console.log(this.state.detalle);
        }

        const actualizarLugarNacimiento = e => {
            console.log(e.target.value);
        }

        const actualizarFechaNacimiento = e => {
            console.log(e.target.value);
        }

        const actualizarNombrePartido = e => {
            console.log(e.target.value);
        }

        const actualizarLogoPartido = e => {
            console.log(e.target.value);
        }

        // Enviar una petición a la API
        const editarIntegrante = e => {
            e.preventDefault();

            // enviar la petición por axios
            clienteAxios.put('/integrantes/'+this.state.id, this.state.detalle)
                .then(respuesta => {
                    console.log(respuesta);
                    //props.guardarConsultar(true);

                    //Redireccionar  
                    this.props.history.push('/')
                })
        }

        const nacimiento = JSON.stringify(this.state.detalle.content.birth);
        //let nacimiento = String(this.state.detalle.content.birth);
        //let nacimiento = JSON.parse(JSON.stringify(this.state.detalle.content.birth));
        //console.log(this.state.detalle.content.birth[0].place);
        console.log(nacimiento);
        
        let datosfecha = String(nacimiento).split(",");
        var nacimientolugar = String(datosfecha[0]);
        var nacimientofecha = String(datosfecha[1]);

        nacimientolugar = String(nacimientolugar.replace('{"place":"',''));
        nacimientolugar = String(nacimientolugar.replace('"',''));
        //var txtlugar = document.getElementById("birthplace");
        //txtlugar.value = String(nacimientolugar);
        this.state.proplugnacimiento = nacimientolugar;
        console.log(this.state.proplugnacimiento);

        nacimientofecha = nacimientofecha.replace('"date":"','');
        nacimientofecha = nacimientofecha.replace('"}','');
        this.state.propfecnacimiento = nacimientofecha;

        console.log(nacimientofecha);

        let partido = JSON.stringify(this.state.detalle.content.party);
        
        let datospartido = String(partido).split('","');
        let partidonombre = String(datospartido[0]);
        let partidologo = String(datospartido[1]);

        partidonombre = partidonombre.replace('{"name":"','');
        partidonombre = partidonombre.replace('"','');

        console.log(partidonombre);

        partidologo = partidologo.replace('logo":"','');
        partidologo = partidologo.replace('"}','');

        console.log(partidologo);

        return( 
            <Fragment>
                <section className="py-4 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">Crear anotación</h1>

                            <p className="lead text-muted">
                                En esta sección puedes agregar una anotación a un integrante 
                                ya existente. Los datos que puedes indicar están dentro de un 
                                universo establecido.
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
                        <div className="row row-cols-1 row-cols-sm-10 row-cols-md-8 g-3">

                            <form method="post" onSubmit={editarIntegrante}>
                                <div className="mb-3">
                                    <label htmlFor="entity" className="form-label">Código Wikidata</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="entity" 
                                        name="entity" 
                                        defaultValue={this.state.detalle.entity}
                                        onChange = {actualizarCodigo}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="name" 
                                        name="name"
                                        aria-describedby="txtnombreHelp" 
                                        defaultValue={this.state.detalle.content.name}
                                        onChange = {actualizarNombre}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gender" className="form-label">Género</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="gender" 
                                        name="gender"
                                        aria-describedby="txtnombreHelp" 
                                        defaultValue={this.state.detalle.content.gender}
                                        onChange={actualizarGenero}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Dirección imagen</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="image" 
                                        name="image" 
                                        defaultValue={this.state.detalle.content.image}
                                        onChange={actualizarImagen}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="occupation" className="form-label">Ocupación</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="occupation" 
                                        name="occupation" 
                                        defaultValue={this.state.detalle.content.occupation}
                                        onChange={actualizarOcupacion}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="education" className="form-label">Educación</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="education" 
                                        name="education" 
                                        defaultValue={this.state.detalle.content.education}
                                        onChange={actualizarEducacion}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="position" className="form-label">Posición</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="position" 
                                        name="position" 
                                        defaultValue={this.state.detalle.content.position}
                                        onChange={actualizarPosicion}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="birthplace" className="form-label">Lugar de Nacimiento</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="birthplace" 
                                        name="birthplace" 
                                        defaultValue={nacimientolugar}
                                        onChange={actualizarLugarNacimiento}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="birthdate" className="form-label">Fecha de Nacimiento</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="birthdate" 
                                        name="birthdate" 
                                        defaultValue={nacimientofecha}
                                        onChange={actualizarFechaNacimiento}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="partyname" className="form-label">Nombre partido</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="partyname" 
                                        name="partyname" 
                                        defaultValue={partidonombre} 
                                        onChange={actualizarNombrePartido}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="partylogo" className="form-label">Logo partido</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="partylogo" 
                                        name="partylogo" 
                                        defaultValue={partidologo} 
                                        onChange={actualizarLogoPartido}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">Actualizar</button>
                            </form>

                        </div>
                    </div>
                </div>

            </Fragment>
        );

    }

}

export default withRouter(CrearAnotacion);