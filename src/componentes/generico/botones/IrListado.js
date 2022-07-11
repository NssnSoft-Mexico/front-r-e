import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class IrListado extends Component {

    render(){

        return(
            <><span className="mr-3"/>
            <button type="button" 
                className="btn btn-danger"
                onClick = { () => {
                    window.location.href = "/listadoProceso";
                }} 
            >
                {this.props.nombre} 
            </button></>
        )
    }
}

export default withRouter(IrListado);