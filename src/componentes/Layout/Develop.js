import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import Error from '../generico/Alertas/Error';

const initialState = {
    login: {
        usuario: null
        ,password: null
    }
    ,nombre: ''
    ,apepat: ''
    ,apemat: ''
    ,error : false
    ,resultadoToken: null
    ,resultadoAuth: null
}

class Develop extends Component {

    state = { 
        ...initialState
    }

    

    render() {

        const {error } = this.state;

        let respuesta = (error) ? <Error mensaje= {this.state.resultadoToken.errorMessages} /> : '';
        let campoObligatorio = <label className="CampoObligatorio mr-md-1">*</label>

        return(
            
            <Fragment>

                <br />                
                
                {respuesta}
            
            </Fragment>
        );
    }
}

export default withRouter(Develop);