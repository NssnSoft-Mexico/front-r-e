import React, { Component, Fragment } from 'react';
import { environment } from './../environment';
import { withRouter, Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Select from 'react-select';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Toast } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import { QUERY_CATALOGOS, QUERY_GETCURSOS, QUERY_GETCURSOS_BY_ID, QUERY_SEQUENCE, QUERY_DATOS, GET_CURSOS_PROV,QUERY_PROD,QUERY_PRODUCT, QUERY_CURSOS_USERS,QUERY_PERFIL, QUERY_COMPETENCIAS, QUERY_COMPETENCIA, QUERY_CONOCIMIENTOS } from '../../src/queries';
import { NUEVO_CURSO, UPDATE_CURSOS,CREAR_PRODUCTO,DEL_PRODUCT, ELIMINAR_CURSO } from '../../src/mutations';
import moment from 'moment';
import Swal from 'sweetalert2';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { faFile, faTrash,faSearch,faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popup } from "semantic-ui-react";
import { useMutation } from '@apollo/client';

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
            modalProducto: false,
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
                id: '',
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

    abrirModalProducto = (item) => { 
        this.setState({
            curso: item,
            modalProducto: !this.state.modalProducto
        }); 
    }
    cerrarModalProducto = () =>{
        this.setState({modalProducto: false});
        this.limpiarCache();
    }

    abrirEliminar = (modificacion) => {
        this.setState({
            id: modificacion,
            modalEliminar: !this.state.modalEliminar
        });
    }
    cerarEliminar = () => { this.setState({modalEliminar: false}); }

    abirCursos = () => { this.setState({modalCursos: !this.state.modalCursos}); }
    cerarCursos = () => { this.setState({modalCursos: false}); }

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
                'El dato se actualizo correctamente.',
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
                        this.abrirModalProducto();
                }}>{'Añadir a Compras' }</Button>
                <Button className="tBoton acciones" 
                    onClick={() => {
                        this.abirCursos();
                }}>{'Lista de Eliminados' }</Button>
                
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

                                    <Modal onHide={this.cerarEliminar} isOpen={this.state.modalEliminar}>
                                        <ModalHeader className="body-modal-aviso">
                                            <label className="modalTitulo fl"> Confirmación </label>
                                            <label className="modalTitulo fr" onClick={this.cerarEliminar}>X</label>
                                        </ModalHeader>
                                        <ModalBody className="body-modal-Aviso">
                                            <FormGroup>
                                                <Mutation mutation={DEL_PRODUCT}
                                                onCompleted = {(loading,error,res) => 
                                                    this.setState({
                                                        ...this.state,
                                                        modalEliminar: false
                                                    })
                                                }>
                                                    {(addTodo, { loading, data }) => (
                                                        <Fragment>
                                                            <div className="color">
                                                                <label className='textJus'> Seguro que quiere eliminar el curso? </label>
                                                                <div className="mt-1 text-center">
                                                                    <div className="text-center">
                                                                        <button type="button" className="eliminar-btn"
                                                                        onClick={ e => {
                                                                            e.preventDefault();
                                                                            console.log("s",data)
                                                                            addTodo({ variables: { id: this.state.id, activo: '0' } });
                                                                            window.location.reload(false);
                                                                        }}> Eliminar </button>
                                                                        <span className="mr-3 margin"/>
                                                                        <button type="button" className="cancelar-btn" onClick={this.cerarEliminar}> Cancelar </button>
                                                                    </div> 
                                                                </div> 
                                                            </div>
                                                        </Fragment>
                                                    )}
                                                </Mutation>
                                            </FormGroup>
                                        </ModalBody>
                                    </Modal>

                                    <Modal className="modal-dialog modal-lg" isOpen={this.state.modalProducto}>
                                        <ModalHeader className="body-modal-aviso"> 
                                            <label className="modalTitulo fl">Modificar Datos</label>
                                            <label className="modalTitulo fr" onClick={this.cerrarModalProducto}> X </label>
                                        </ModalHeader>
                                        <ModalBody className="gird">
                                            <div>
                                                <FormGroup>
                                                <div className="w50p">
                                                    {campoObligatorio}
                                                    <label>Nombre:</label>
                                                </div>
                                                <div className="w50p">
                                                    <label>{campoObligatorio}Cantidad:</label>
                                                </div>
                                                </FormGroup>

                                            </div>
                                            <FormGroup>
                                                <Mutation mutation = {CREAR_PRODUCTO} 
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
                                                                                name,
                                                                                cantidad,
                                                                                activo
                                                                            } = this.state.curso;
                                                                            
                                                                            localStorage.setItem('user', JSON.stringify(this.state.curso));

                                                                            updateCursos({
                                                                                variables: {
                                                                                    name: name,
                                                                                    cantidad: cantidad,
                                                                                    activo: '1',
                                                                                } 
                                                                            })
                                                                        }
                                                                    } >
                                                <div className="pb7p">
                                                    <div>
                                                        <input type="text" 
                                                            className="form-control dw20" 
                                                            placeholder="Nombre"
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
                                                            placeholder="Cantidad"
                                                            onChange={e => {
                                                                this.setState({
                                                                    curso:{
                                                                        ...this.state.curso,
                                                                        cantidad: e.target.value
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="float-left">
                                                                <button type="submit" 
                                                                
                                                                    className="grl-btn">Agregar producto</button>
                                                </div>
                                                
                                                        </form>
                                                        )
                                                    }}
                                                </Mutation>
                                            </FormGroup>
                                        </ModalBody>
                                        <div className='form-control'><span className="obligado">* Campos requeridos</span></div>
                                    </Modal>

                    
                                    <Modal
                                        size="xl"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        isOpen={this.state.modalCursos}>
                                        <ModalHeader className="body-modal-ayuda">
                                            <label className="modalTitulo fl">Lista de compras Eliminados</label>
                                            <label className="modalTitulo fr" onClick={this.cerarCursos}>X</label>
                                        </ModalHeader>
                                        <ModalBody className="body-modal-ayuda">
                                            <FormGroup>
                                                <div>
                                                    <Query client= {client} query={QUERY_PRODUCT} >
                                                        {({ loading, error, data, startPolling, stopPolling }) => {
                                                            if(loading){
                                                                return <p className="text-light">Cargando....</p>
                                                            }
                                                            if(error) return null; 
                                                            const array = data.getProductDel;
                                                            let datos = [];                                     
                                                                return(
                                                                    <Fragment>
                                                                        <table className="table">
                                                                            <thead className="Tabla">
                                                                                <tr className="font-weight-bold">
                                                                                    <th> Id </th>
                                                                                    <th> Nombre </th>
                                                                                    <th> Cantidad </th>
                                                                                    <th> Activo </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {array.map((item) =>(
                                                                                <tr className="font-weight-bold"  key={item.id}>
                                                                                    <td> {item.id} </td>
                                                                                    <td> {item.name}</td>
                                                                                    <td> {item.cantidad} </td>
                                                                                    <td> {item.activo == "1" ? 'En inventario' : 'Sin registros'} </td> 
                                                                                </tr>
                                                                            ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </Fragment>
                                                                )
                                                        }}
                                                    </Query>
                                                </div>
                                            </FormGroup>
                                        </ModalBody>
                                    </Modal>
                                    </Fragment>
                                )
                            }}
                        </Query>

                        <br/><br/>  
                        <h2>Lista de compras</h2>
                        <Query client= {client} query={QUERY_PROD}>
                            {({ loading, error, data, startPolling, stopPolling }) => {
                                if(loading){
                                    return <p className="text-light">Cargando....</p>
                                }
                                if(error) return null;
                                const array = data.getProduct;
                                let datos = [];
                     
                                return(
                                    <Fragment>
                                        <table className="table">
                                            <thead className="Tabla">
                                                <tr className="font-weight-bold">
                                                    <th> Id </th>
                                                    <th> Nombre </th>
                                                    <th> Cantidad </th>
                                                    <th> Activo </th>
                                                    <th> Acciones </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {array.map((item) =>(
                                                <tr className="font-weight-bold"  key={item.id}>
                                                    <td> {item.id} </td>
                                                    <td> {item.name}</td>
                                                    <td> {item.cantidad} </td>
                                                    <td> {item.activo == "1" ? 'En inventario' : 'Sin registros'} </td> 
                                                    <td>
                                                        <div className="disF">
                                                            <a id='dwnldLnk' />
                                                            <Popup content={'Eliminar solicitud'} trigger={
                                                                <FontAwesomeIcon className={item.estatus==='SOLICITADO'?'cursor':'cursor disTrash'}
                                                                icon={faTrash}
                                                                onClick={ e => {
                                                                    e.preventDefault();
                                                                        this.abrirEliminar(item.id);
                                                                }} size='2x' color='#9d2449' />}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
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
