import React, { Component, Fragment } from 'react';
import { environment } from './../../environment';
import { withRouter } from 'react-router-dom';
import { QUERY_GETUSUARIO_LDAP, QUERY_USERS_DATA } from '../../queries';
import ApolloClient, {HttpLink} from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Error from '../generico/Alertas/Error';
import { createHttpLink } from '@apollo/client';
import { setContext } from "apollo-link-context";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


const initialState = {
    login: {
        user: null,
        pass: null
    }
    ,nombre: ''
    ,apepat: ''
    ,apemat: ''
    ,error : false
    ,resultadoToken: null
    ,resultadoAuth: null
    ,modalAyuda: false
}
const clientLDAP = new ApolloClient({
	cache: new InMemoryCache({
		addTypename: false
	}),
    uri: 'http://localhost:4000/graphql',
    onError: ({ networkError, graphQLErrors }) => {
		console.log('graphQLErrors', graphQLErrors);
		console.log('networkError', networkError);
	}
});


const client = new ApolloClient({
	cache: new InMemoryCache({
		addTypename: false
    }),            
    uri: 'http://localhost:4000/graphql',
    //uri: environment.API_CAPACITACIONES,

    onError: ({ networkError, graphQLErrors }) => {
		console.log('graphQLErrors', graphQLErrors);
		console.log('networkError', networkError);
    }    
});

const autentificaLDAP = async (usuario,passwd) => {
    let variables = { 
        user: usuario,
        pass: passwd
    };

    return await clientLDAP.query({
        query: QUERY_GETUSUARIO_LDAP,
        variables: variables,
        fetchPolicy: "network-only" 
      })
      .then(result => {console.log("HOLA",result); return result.data.getLogin[0];})
      .catch(err => {console.log("error: "+err); return null});
}

const getIdUser = async (sAMAccountName) => {
    let variables = { email: sAMAccountName };

    return await client.query({
        query: QUERY_USERS_DATA,
        variables: variables,
        fetchPolicy: "network-only"
      })
      .then(result => {
          console.log("AQUI", result.data.getEmail);
          return result.data.getEmail;})
      .catch(err => {console.log("error: "+err); return null});
}

class Logins extends Component {

    state = { 
        ...initialState
    }

    limpiarState = () => {
        this.setState({...initialState});
   }

   abrirAyuda = () => { this.setState({modalAyuda: !this.state.modalAyuda}); }
   cerarAyuda = () => { this.setState({modalAyuda: false}); }
   toggle     = () => { this.setState({modalAyuda: !this.state.modalAyuda}); }

    consultarUsuario = e => {

        e.preventDefault();

        // prevenir ejecución
        if(this.state.login.user === '' || this.state.login.pass === '') return;
    
        const consultarTokenAPI = async () => {
        
            var respuesta = await autentificaLDAP(this.state.login.user,this.state.login.pass);
            console.log("respuesta: ", respuesta);
            var resultadoAuth=
            {
                "id": respuesta.id,
                "nombre":respuesta.nombre
        
            };
            this.setState({
                ...this.state,
                resultadoAuth
                ,error: false
            })
            console.log("NEGRO",resultadoAuth)
            localStorage.setItem('perfil', JSON.stringify(resultadoAuth));
            this.limpiarState();
            window.location.replace('/principal');
            setTimeout(() => {
                this.props.history.push("/principal");
            },2000);

        }
        consultarTokenAPI();
    };

    validarForm = () => {        
        const {user} = this.state.login;
        const noValido = !user;
        return noValido;
    }

    render() {

        const {error } = this.state;

        let respuesta = (error) ? <Error mensaje= {this.state.resultadoToken.errorMessages} /> : '';
        let campoObligatorio = <label className="CampoObligatorio mr-md-1">*</label>

        return(
            <Fragment>
                

                <br />                
                
                {respuesta}

                <div className="form spadl">                
                    <form className="form text-light text-center"
                        onSubmit={this.consultarUsuario}
                    >
                        <h2>Acceso</h2>
                         <br></br>
                        <label>Usuario</label>
                        <input type="text" 
                            className="form-control" 
                            placeholder="Usuario"
                            onChange={e => {
                                this.setState({
                                    login:{
                                        ...this.state.login,
                                        user: e.target.value
                                    }
                                })
                            }}
                        />
                        <label>Contraseña</label>
                        <input type="password" 
                            className="form-control" 
                            placeholder="Contraseña"
                            onChange={e => {
                                this.setState({
                                    login:{
                                        ...this.state.login,
                                        pass: e.target.value
                                    }
                                })
                            }}
                        />
                        <button type="submit" 
                            disabled={this.validarForm()}
                            className="btn btn-success mr-md-2 mb-2 mb-md-0">Acceso
                        </button>
                        
                    </form>                
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Logins);
