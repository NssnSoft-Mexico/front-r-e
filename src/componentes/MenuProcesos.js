import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import { QUERY_MENU_LISTADO } from '../queries';

class MenuProcesos extends Component {

    state = {
        id: this.props.id
        ,idRol: this.props.idRol
        ,idProceso: this.props.idProceso
        ,dependencia: this.props.dependencia
        ,proceso: this.props.proceso
        ,area: this.props.area
        ,procesoSist: this.props.procesoSist  
        ,idAcuseEnvio: this.props.idAcuseEnvio
        ,enviarOIC: false
        ,enviarObs: false
        ,validarProceso: false
        ,area_opera_proceso: this.props.area_opera_proceso
        ,id_estado_proceso: this.props.id_estado_proceso
        ,estatus: this.props.estatus
        ,anio: this.props.anio
    }

    render(){

        let campoComp = {};

        let variablesMenu = { 
            idIdentificacionProceso: Number(this.state.id)
            ,idRol: Number(this.state.idRol)
        };

        const {enviarOIC, enviarObs, validarProceso } = this.state;
        return (

			<Fragment>	
                
                <Query query={QUERY_MENU_LISTADO} variables={variablesMenu}  >

                    {({ loading, error, data }) => {      

                        if(loading) return 'Cargando...';
                        if(error) return `Error ${error.message}`;
                        
                        campoComp = data.MenuAccionesByProcesoAndRol;
                        
                        if(campoComp.length === 0) {

                            return '' 

                        } else { 

                            return (

                                <Fragment>

                                    <button type="button"
                                        className="navbar-dark btn botonMenu avatar" 
                                        data-toggle="dropdown" 
                                        title="Procesos"
                                    >
                                        <span className="navbar-toggler-icon" />
                                    </button>

                                    <div className="navbar-collapse" id="navegacion2">
                                        <ul className="navbar-nav text-right">
                                            <li>
                                                <div className="dropdown-menu botonMenuBorde" aria-labelledby="navegacion2">
                                                    {campoComp.map((item) => {

                                                        let realizado = '';
                                                        let opcion = '';

                                                        if(item.completado === 'true'){
                                                            realizado = <Fragment>
                                                                            <i className="fa fa-check" aria-hidden="true"/> <span className="mr-1"/>
                                                                        </Fragment>
                                                        }else{
                                                            realizado =  <span className="mr-4"/>
                                                        }

                                                        if( item.url === '/proceso/envioOIC'){
                                                            return <Link to="" data-toggle="modal"
                                                                        data-target="#exampleModal"
                                                                        className="dropdown-item botonOpcion"
                                                                        onClick = { () => {
                                                                            this.setState({
                                                                                ...this.state,
                                                                                enviarOIC: true
                                                                            })   
                                                                            localStorage.setItem('idProcesoEnvia', this.state.id);        
                                                                            localStorage.setItem('abrirModal', true);        
                                                                            setTimeout(() => {
                                                                            },2000);                                                                                    
                                                                        }}   
                                                                    >
                                                                        {realizado} <label>{item.descripcion}</label>     
                                                                    </Link>;
                                                        }else if( item.url === '/proceso/envioObservaciones'){
                                                            return <Link to="" data-toggle="modal"
                                                                        data-target="#exampleModal"
                                                                        className="dropdown-item botonOpcion"
                                                                        onClick = { () => {
                                                                            this.setState({
                                                                                ...this.state,
                                                                                enviarObs: true
                                                                            })   
                                                                            localStorage.setItem('idProcesoEnvia', this.state.id);        
                                                                            localStorage.setItem('idAcuseEnvio',  this.state.idAcuseEnvio);
                                                                            localStorage.setItem('idRol',  this.state.idRol);
                                                                            localStorage.setItem('abrirModal', true);        
                                                                            setTimeout(() => {
                                                                            },2000);                                                                                    
                                                                        }}   
                                                                    >
                                                                        {realizado} <label>{item.descripcion}</label>     
                                                                    </Link>;
                                                         }else if( item.url === '/proceso/validarProceso'){
                                                            return <Link to="" data-toggle="modal"
                                                                        data-target="#exampleModal"
                                                                        className="dropdown-item botonOpcion"
                                                                        onClick = { () => {
                                                                            this.setState({
                                                                                ...this.state,
                                                                                validarProceso: true
                                                                            })   
                                                                            localStorage.setItem('idProcesoEnvia', this.state.id);        
                                                                            localStorage.setItem('idRol',  this.state.idRol);
                                                                            localStorage.setItem('abrirModal', true);        
                                                                            setTimeout(() => {
                                                                            },2000);                                                                                    
                                                                        }}   
                                                                    >
                                                                        {realizado} <label>{item.descripcion}</label>     
                                                                    </Link>;                                                                                                            
                                                        } else{                                                        
                                                            return <Link to= {item.url + '/' + this.state.id + '/' + this.state.idProceso + '/' + this.state.proceso + '/' + this.state.area + '/' + this.state.idAcuseEnvio + '/' + this.state.dependencia}
                                                                        className="dropdown-item botonOpcion"
                                                                    >
                                                                        {realizado} <label>{item.descripcion}</label>
                                                                    </Link>;
                                                        }
                                                    })}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Fragment>
                            )
                        }
                    }}
                </Query> 
			</Fragment>
		)
	}
}

export default withRouter(MenuProcesos);
