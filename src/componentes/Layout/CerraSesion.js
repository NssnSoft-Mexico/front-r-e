import React from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

const CerrarSesionUsuario = (cliente, history) => {

    localStorage.removeItem('perfil', '');
    localStorage.removeItem('idSolicitudActual', '');
    // desloguear
    cliente.resetStore();
    // reedireccionar
    history.push('/');
}

const CerrarSesion = ({history}) => (    
    <ApolloConsumer>
        {cliente => {
            return (
                <button 
                    onClick={() => CerrarSesionUsuario(cliente, history)}
                    className="ml-md-2 mt-2 mt-md-0 botonCerrarSesion ">
                    Cerrar Sesión
                </button>
            );
        }}
    </ApolloConsumer>
)

export default withRouter(CerrarSesion);
