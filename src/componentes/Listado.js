import React, { Component, Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import Resultado from './Resultado';

class Listado extends Component {

	state = {
        numExpediente: ''
	}

    buscarExp = (numExpediente) => {
        this.setState({
            paginador:{
                ...this.state.paginador
            }
            ,numExpediente
        })		
	}

    render() {
        
        let usuario = (JSON.parse(this.props.session)) ? JSON.parse(this.props.session).usuario.usuario: null;
        let rol = (JSON.parse(this.props.session)) ? JSON.parse(this.props.session).apis[0].roles[0].rol : null;
        if(rol === null) return <Redirect to="/logins"/>;

        return (

            <Fragment>
                <br/>
                <h2 className="text-center text-light">Inventario</h2>
                <Resultado numExpediente={this.state.numExpediente} rol={rol} usuario={usuario} />                           
            </Fragment>
        )
    }
};

export default withRouter(Listado);