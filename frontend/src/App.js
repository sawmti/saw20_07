import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import clienteAxios from './config/axios';
 

//Componentes 
import Integrantes from './components/Integrantes';
import CrearAnotacion from './components/CrearAnotacion';
import IntegranteDetalle from './components/IntegranteDetalle';
import AgregarIntegrante from './components/AgregarIntegrante';

function App() {

  //console.log(process.env.REACT_APP_BACKEND_URL);

  //State de la app
  const [listaIntegrantes, guardarIntegrantes] = useState([]);
  const [consultar, guardarConsultar] = useState(true);

  useEffect( () => {
    //console.log('desde useEffect');

    if (consultar){
      const consultarAPI = () => {
        clienteAxios.get('/integrantes')
          .then(respuesta => {
            //console.log(respuesta.data)
            // Colocar en el state el resultado 
            guardarIntegrantes(respuesta.data);

            // Deshabilitar la consulta 
            guardarConsultar(false);

          })
          .catch(error => {
            console.log(error)
          })
      }
      consultarAPI();
    }

  }, [consultar]);

  return (
    <Router>
      <Switch>

        <Route
          exact 
          path="/"
          component={() => <Integrantes listaintegrantes={listaIntegrantes} />}
        />

        <Route
          exact 
          path="/agregar"
          component={() => <AgregarIntegrante guardarConsultar={guardarConsultar} />}
        />

        <Route
          exact 
          path="/crear"
          component={CrearAnotacion}
        />

        <Route
          exact 
          path="/integrante/:id"
          render={(props) => {
            //console.log(props.match.params.id);
            //const integrante = listaIntegrantes.filter(integrante => integrante._id === props.match.params.id)

            //console.log(integrante);

            return (
              <IntegranteDetalle integrante={listaIntegrantes} 
                integranteid={props.match.params.id} />
            )
          }}
        />

      </Switch>
    </Router>
  );
}

export default App;
