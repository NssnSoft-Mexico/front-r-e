import React, { Component, Fragment } from 'react';
import { environment } from './../environment';
import { withRouter, Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Select from 'react-select';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Toast } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import { QUERY_CATALOGOS, QUERY_GETCURSOS, QUERY_GETCURSOS_BY_ID, QUERY_SEQUENCE, QUERY_DATOS, GET_CURSOS_PROV, QUERY_CURSOS_USERS,QUERY_PERFIL, QUERY_COMPETENCIAS, QUERY_COMPETENCIA, QUERY_CONOCIMIENTOS } from '../../src/queries';
import { NUEVO_CURSO, UPDATE_CURSOS, ELIMINAR_CURSO } from '../../src/mutations';
import moment from 'moment';
import Swal from 'sweetalert2';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { faFile, faTrash,faSearch,faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popup } from "semantic-ui-react";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


const client = new ApolloClient({
	cache: new InMemoryCache({
		addTypename: false
    }),
    uri: 'http://localhost:4000/graphql',
    onError: ({ networkError, graphQLErrors }) => {
		console.log('graphQLErrors', graphQLErrors);
		console.log('networkError', networkError);
    }    
});

class Principal extends Component {

    constructor(props) {
        super(props);
        this.state={
            modal: false,
            modalTabla: false,
            modalConstancia: false,
            modalAyuda: false,
            modalAviso: true,
            modalEliminar: false,
            modalComentario: false,
            modalCursos: false,
            modalCurso: false,
            modalPerfil: false,
            modalCompetencias: false,
            modalConocimientos: false,
            periodoFiltro: '2022',
            
            id_modificacion: 0,

            curso: {
                //crear curso
                id_modificacion: ''
                ,proveedor: ''
                ,id_curso: 0
                ,nombre_curso: ''
                ,total_horas: 0
                ,calificacion: ''
                ,fecha_inicio: ''
                ,fecha_fin: ''
                ,id_usuario_alta: Number(JSON.parse(localStorage.getItem('perfil')).id)
                ,id_estado: 1
                ,fecha_alta: new Date()
                ,nombre_archivo: ''
                ,comentario: ''
                ,nombre_institucion: ''
                ,estatus: 'SOLICITADO'
                ,tipo_curso: 'CURSO'
                ,comentario: ''
                ,expediente_name: ''
                ,trimestre: ''
                ,ejercicio: ''
                ,periodo: ''
            },
            login: {
                usuario: null
            }
            ,help_text: ''
            ,id_consecutivo: '' 
            ,error : false
            ,erromsg: false
            ,msgExito : false
            ,msgExitoDoc: false
            ,documentEx: []
            ,documento: {
                modulo: 'principal'
                ,expediente: null
                ,nombre: null
                ,archivo: null
            }
        }
    }

    limpiarCache = () => {
        this.setState({
            curso: {
                id_modificacion: ''
                ,proveedor: ''
                ,id_curso: 0
                ,nombre_curso: ''
                ,total_horas: 0
                ,calificacion: ''
                ,fecha_inicio: ''
                ,fecha_fin: ''
                ,id_usuario_alta: Number(JSON.parse(localStorage.getItem('perfil')).usuario.id)
                ,id_estado: 1
                ,fecha_alta: new Date()
                ,nombre_archivo: ''
                ,comentario: ''
                ,nombre_institucion: ''
                ,estatus: 'SOLICITADO'
                ,tipo_curso: 'CURSO'
                ,comentario: ''
                ,expediente_name: ''
                ,trimestre: ''
                ,ejercicio: ''
                ,periodo: ''
            }
        });
    }


    abrirModalTabla = (item) => { 
        this.setState({
            curso: item,
            modalTabla: !this.state.modalTabla
        }); 
    }
    cerrarModalTabla = () =>{
        this.setState({modalTabla: false});
        this.limpiarCache();
    }

    validarForms = () => {
        const { name }= this.state.curso; 

        const noValido = !name;
        return noValido;
    }

    render() {
        
        const {erromsg, msgExitos } = this.state;

        if(msgExitos){
            Swal.fire(
                '¡Exito!',
                'El Curso se actualizo correctamente.',
                'success'
            ).then(function() {
                window.location.href = "/principal";
            });
        }

        const {error, msgExito } = this.state;

        if(msgExito){
            Swal.fire(
                '¡Exito!',
                'El Curso se agrego correctamente.',
                'success'
            ).then(function() {
                window.location.href = "/principal";
            });
        }

        const {errorDoc, msgExitoDoc } = this.state;
        if(msgExitoDoc){
            Swal.fire(
                'Â¡Exito!',
                'Se subio el documento correctamente.',
                'success'
            ).then(function() {
                window.location.href = "/principal";
            });
        }

        let campoObligatorio = <label className="CampoObligatorio mr-md-1">* </label>

        return (
            <Fragment>

                <br/><br/>  
                <h2>Usuarios</h2>
                <Button className="tBoton acciones" 
                    onClick={() => {
                        this.abrirModalTabla();
                }}>{'Lista de Compra' }</Button>
                
                <br/><br/>  
                <FormGroup>
                    <div>
                        <Query client= {client} query={QUERY_CURSOS_USERS}>
                            {({ loading, error, data, startPolling, stopPolling }) => {
                                if(loading){
                                    return <p className="text-light">Cargando....</p>
                                }
                                if(error) return null;
                                const array = data.getUsers;
                                let datos = [];
                     
                                return(
                                    <Fragment>
                                        <table className="table">
                                            <thead className="Tabla">
                                                <tr className="font-weight-bold">
                                                    <th> Nombre </th>
                                                    <th> Dirección </th>
                                                    <th> Ciudad</th>
                                                    <th> País </th>
                                                    <th> Correo Electronico </th>
                                                    <th> Teléfono </th>
                                                    <th> Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {array.map((item) =>(
                                                <tr className="font-weight-bold"  key={item.id}>
                                                    <td> {item.name} </td>
                                                    <td> {item.direccion}</td>
                                                    <td> {item.ciudad} </td>
                                                    <td> {item.pais} </td>
                                                    <td> {item.email} </td>
                                                    <td> {item.telefono} </td>
                                                    <td>
                                                        <div className="disF">
                                                            <a id='dwnldLnk' />
                                                            <Button className="acciones" 
                                                            onClick={() => {
                                                                    this.abrirModalTabla(item);
                                                            }}>{'Modificar Datos' }</Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>

                                        <Modal className="modal-dialog modal-lg" isOpen={this.state.modalTabla}>
                                        <ModalHeader className="body-modal-aviso"> 
                                            <label className="modalTitulo fl">Modificar Datos</label>
                                            <label className="modalTitulo fr" onClick={this.cerrarModalTabla}> X </label>
                                        </ModalHeader>
                                        <ModalBody className="gird">
                                            <div>
                                                <FormGroup>
                                                <div className="w50p">
                                                    {campoObligatorio}
                                                    <label>Nombre:</label>
                                                </div>
                                                <div className="w50p">
                                                    <label>{campoObligatorio}Dirección:</label>
                                                </div>
                                                <div className="w50p">
                                                    {campoObligatorio}
                                                    <label>Ciudad:</label>
                                                </div>
                                                <div className="w50p">
                                                    <label>País:</label>
                                                </div>                                
                                                <div className="w50p">
                                                    <label>Teléfono:</label>
                                                </div>
                                                <div className="w50p">
                                                    <label>Correo Electronico:</label>
                                                </div>
                                                <div className="w50p">
                                                    <label>User:</label>
                                                </div>
                                                <div className="w50p">
                                                    {campoObligatorio}
                                                    <label>Password:</label>
                                                </div>
                                                </FormGroup>

                                            </div>
                                            <FormGroup>
                                                <Mutation mutation = {UPDATE_CURSOS} 
                                                        onCompleted = {(loading,error,res) => 
                                                            this.setState({
                                                                ...this.state,
                                                                msgExitos: true
                                                            })
                                                        } ignoreResults = {false} >
                                                        {(updateCursos, {loading, data}) => {

                                                            return(

                                                                <form className="body-modal-corr"
                                                                    onSubmit = {
                                                                        e => {
                                                                            e.preventDefault();
                                    
                                                                            const { 
                                                                                id,
                                                                                name,
                                                                                direccion,
                                                                                ciudad,
                                                                                pais,
                                                                                telefono,
                                                                                email,
                                                                                foto,
                                                                                pass,
                                                                                user,
                                                                            } = this.state.curso;
                                                                            
                                                                            localStorage.setItem('user', JSON.stringify(this.state.curso));

                                                                            updateCursos({
                                                                                variables: { 
                                                                                    id: 1,
                                                                                    name: name,
                                                                                    direccion: direccion,
                                                                                    ciudad: ciudad,
                                                                                    pais: pais,
                                                                                    telefono: telefono,
                                                                                    email: email,
                                                                                    foto: foto,
                                                                                    pass: pass,
                                                                                    user: user
                                                                                } 
                                                                            })
                                                                        }
                                                                    } >
                                                <div className="pb7p">
                                                    <div>
                                                        <input type="text" 
                                                            className="form-control dw20" 
                                                            placeholder="Nombre"
                                                            value={this.state.curso.name}
                                                            onChange={e => {
                                                                this.setState({
                                                                    curso:{
                                                                        ...this.state.curso,
                                                                        name: e.target.value
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            
                                                <div className='pb7p'>
                                                    <div>
                                                        <input type="text" 
                                                            className="form-control dw20" 
                                                            placeholder="Dirección"
                                                            value={this.state.curso.direccion}
                                                            onChange={e => {
                                                                this.setState({
                                                                    curso:{
                                                                        ...this.state.curso,
                                                                        direccion: e.target.value
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input type="text" 
                                                            className="form-control dw20" 
                                                            placeholder="Ciudad"
                                                            value={this.state.curso.ciudad}
                                                            onChange={e => {
                                                                this.setState({
                                                                    curso:{
                                                                        ...this.state.curso,
                                                                        ciudad: e.target.value
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="pb7p">
                                                    <input type="text" 
                                                        className="form-control dw20" 
                                                        placeholder="País"
                                                        value={this.state.curso.pais}
                                                        onChange={e => {
                                                            this.setState({
                                                                curso:{
                                                                    ...this.state.curso,
                                                                    pais: e.target.value
                                                                }
                                                            })
                                                        }}
                                                    />
                                                </div>

                                                <div className="pb7p">
                                                    <input type="text" 
                                                        className="form-control dw20" 
                                                        placeholder="Teléfono"
                                                        value={this.state.curso.telefono}
                                                        onChange={e => {
                                                            this.setState({
                                                                curso:{
                                                                    ...this.state.curso,
                                                                    telefono: e.target.value
                                                                }
                                                            })
                                                        }}
                                                    />
                                                </div>
                                                <div className="pb7p">
                                                    <input type="text" 
                                                        className="form-control dw20" 
                                                        placeholder="Correo Electronico"
                                                        value={this.state.curso.email}
                                                        onChange={e => {
                                                            this.setState({
                                                                curso:{
                                                                    ...this.state.curso,
                                                                    email: e.target.value
                                                                }
                                                            })
                                                        }}
                                                    />
                                                </div>
                                                <div className="pb7p">
                                                    <input type="text" 
                                                        className="form-control dw20" 
                                                        placeholder="User"
                                                        value={this.state.curso.user}
                                                        onChange={e => {
                                                            this.setState({
                                                                curso:{
                                                                    ...this.state.curso,
                                                                    user: e.target.value
                                                                }
                                                            })
                                                        }}
                                                    />                              
                                                </div>
                                                <div className="pb7p">
                                                    <input type="text" 
                                                        className="form-control dw20" 
                                                        placeholder="Password"
                                                        value={this.state.curso.pass}
                                                        onChange={e => {
                                                            this.setState({
                                                                curso:{
                                                                    ...this.state.curso,
                                                                    pass: e.target.value
                                                                }
                                                            })
                                                        }}
                                                    />                              
                                                </div> 
                                                <div className="float-left">
                                                                <button type="submit" 
                                                                disabled={ this.validarForms() }
                                                                    className="grl-btn">Actualizar</button>
                                                </div>
                                                
                                                        </form>
                                                        )
                                                    }}
                                                </Mutation>
                                            </FormGroup>
                                        </ModalBody>
                                        <div className='form-control'><span className="obligado">* Campos requeridos</span></div>
                                    </Modal>
                                    </Fragment>
                                )
                            }}
                        </Query>
                    </div>
                </FormGroup>
        </Fragment>
        );
    }

}

export default withRouter(Principal);