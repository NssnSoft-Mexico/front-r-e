import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { ENVIA_REVISION } from '../../mutations';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';

const logo = require('../../assets/img/icon_pregunta.png');

class EnviarOIC extends Component {

    state = { 
        envio: {
            clave: `ACUSE-${new Date().getFullYear()}-${localStorage.getItem('idProcesoEnvia').toString()}`
            ,id_proceso:  localStorage.getItem('idProcesoEnvia').toString()
            ,id_usuario:  JSON.parse(localStorage.getItem('perfil')).usuario.id
            ,responsable: JSON.parse(localStorage.getItem('perfil')).usuario.nombre + ' ' +JSON.parse(localStorage.getItem('perfil')).usuario.apellido1 + ' '  + JSON.parse(localStorage.getItem('perfil')).usuario.apellido2
            ,id_rol: JSON.parse(localStorage.getItem('perfil')).apis[0].roles[0].id     
        }
        ,error : false
        ,msgExito : false
    }

    render() {

        if(this.state.msgExito){
            Swal.fire(
                '¡Exito!',
                'Se Envio al OIC para su revisión correctamente.',
                'success'
            ).then(function() {
                window.location.href = "/listadoProceso";      
            });
        }

        const modalStyles={
            position: "absolute"
            ,top: "50%"
            ,left: "50%"
            ,transform: "translate(-50%, -50%)"
        }

        let aux = localStorage.getItem('abrirModal').toString();
        
        return( 

            <Modal isOpen={aux} style={modalStyles}>
                
                <ModalHeader>
                    <div className="m-1 text-center">
                        <img src={logo} alt=''></img>
                    </div>     
                    <div className="m-1 modalTitulo">
                        <h2>Revisión OIC</h2>
                    </div>                     
                </ModalHeader>

                <ModalBody>
                    <div className="m-1 modalTexto">
                        <label>
                            Una vez que se envie el proceso a revisión, no se podra hacer ninguna modificación hasta que el OIC haga observaciones o valide la información
                        </label>
                    </div>
                    <div className="m-1 text-center modalTexto">
                        <label>
                            ¿Se confirma el envio a revisión del OIC?
                        </label>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Mutation 
                        mutation = {ENVIA_REVISION}
                        onCompleted = {() => 
                            this.setState({
                                ...this.state,
                                msgExito: true
                            })                            
                        }
                        ignoreResults = {false}
                    >    
                        { enviarProcesoRevision => {

                            return(

                                <form className="m-1 text-light" 
                                    onSubmit = {
                                        e => {
                                            e.preventDefault();
    
                                            const { clave, id_proceso, id_usuario, responsable, id_rol } = this.state.envio;
    
                                            this.setState({
                                                error: false
                                            })

                                            const AcuseEnvioInput = {
                                                clave
                                                ,id_proceso: Number(id_proceso)
                                                ,id_usuario: id_usuario.toString()
                                                ,responsable: responsable.toString()
                                                ,id_rol: Number(id_rol)
                                            };

                                            enviarProcesoRevision({
                                                variables: { AcuseEnvioInput }
                                            })
                                            console.log("se guardo")
                                        }
                                    } >

                                    <div className="mt-1 text-center">
                                        <div className="text-center">
                                            <button type="submit" 
                                                className="btn btn-success"
                                            >
                                                Aceptar
                                            </button>       
                                            <span className="mr-3"/>
                                            <button type="button" 
                                                className="btn btn-danger" 
                                                onClick = { () => {
                                                    window.location.href = "/listadoProceso";
                                                }}         
                                            >
                                                Cancelar 
                                            </button>                         
                                        </div> 
                                    </div>                                       
                                </form>
                            )
                        }}
                    </Mutation>
                </ModalFooter>
            </Modal>
        );
    }
}

export default EnviarOIC;