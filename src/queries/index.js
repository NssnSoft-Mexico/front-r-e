import gql from "graphql-tag";

export const QUERY_CATALOGO_GENERICO = gql`
	query CatGenericoListByCat($catalogo: String) {
		CatGenericoListByCat(catalogo:$catalogo){
			id
			clave
			orden
			descripcion
			catalogo
		}
	}
`;

//************************************* */

export const QUERY_CATALOGO_POR_ID_PADRE = gql`
	query CatGenericoListByIdPadre($id_padre: String) {
		CatGenericoListByIdPadre(id_padre:$id_padre){
			id
			clave
			orden
			descripcion
			catalogo
		}
	}
`;

/*aqui empieza el nuevo modulo*/ 

export const QUERY_CATALOGOS = gql`
	query getCatalogos($nombre: String!){
		getCatalogo(nombre: $nombre) {
		identificador
		descripcion
		status
		}
	} 
`;

export const QUERY_TOTAL_HORAS = gql`
	query getReporteComHorF($ejercicio: String, $nombre_completo: String!) {
		getReporteComHorF(ejercicio: $ejercicio, nombre_completo: $nombre_completo) {
			nombre_completo
			total_horas
		}
	}
`;

export const QUERY_GETCURSOS = gql`
	query getProveedores{ 
		getProveedores {
			id_proveedor
			empresa
		}
	}
`;

export const GET_CURSOS_PROV = gql`
	query getCursosProv($nombre: String!, $nombre_codigo: String){ 
		getCursosProv(nombre: $nombre, nombre_codigo: $nombre_codigo){
			id_curso
			nombre
		}
	}
`;


export const QUERY_GETCURSOS_USERS = gql`
	query getCursosUsers{ 
		getCursosUsers {
			id_trimestre
			nombre_curso
			tipo{
			identificador
			descripcion
			}
			modalidad{
			identificador
			descripcion
			}
			tipo_curso
			total_horas
			calificacion
			fecha_inicio
			fecha_fin
			estatus 
		}
	}
`;

export const QUERY_GETCURSOS_BY_ID = gql`
	query getCursosUsersbyId($id_usuario_alta: Int, $estatus: String, $ejercicio: String){
		getCursosUsersbyId(id_usuario_alta: $id_usuario_alta, estatus: $estatus, ejercicio: $ejercicio){
			id_modificacion
			trimestre
			nombre_curso
			id_curso
			nombre_institucion
			expediente_name
			curso { identificador descripcion }
			estado { identificador descripcion }
			tipo_curso
			total_horas
			calificacion
			fecha_inicio
			fecha_fin
			estatus
			comentario
			proveedor
			ejercicio
		}
  	}
`;

export const QUERY_SEQUENCE = gql`
	  query getSequence{
		getSequence
		getHelp {
			help_text
		}
	  }
`;

export const QUERY_DATOS = gql `
	query getHelp {
		getHelp {
			help_text
		}
	}
`;

export const QUERY_GETUSUARIO_LDAP = gql`
	query getLogin($user: String!,$pass: String!){
		getLogin(user: $user,pass: $pass){
			id
			nombre
			direccion
		}
	}
`;

export const QUERY_USERS_DATA = gql`
	query getEmail($email: String!){
		getEmail(email: $email){
			id_integrante
			nombre
			apepat
			apemat
			ubicacion { identificador descripcion }
		}
	}
`;

export const QUERY_CURSOS_USERS = gql`
	query getUsers{
		getUsers{
			id
			name
			direccion
			ciudad
			pais
			telefono
			email
			user
			pass
		} 
	}
`;

export const QUERY_PERFIL = gql`
query getIntegrantebyId($id_integrante: Int!) { 
    getIntegrantebyId(id_integrante: $id_integrante) {
        id_integrante
        rusp
        nombre
        apepat
        apemat
        rfc
        homo
        curp
        genero { identificador descripcion }
        email
        telefono
        ramo { identificador descripcion }
        adscripcion { identificador descripcion }
        nivel { identificador descripcion }
        nombre_puesto
        id_usuario_alta
        fecha_alta
        fecha_ingreso
        fecha_nombramiento
        fecha_baja
        credencial
        nombramiento { identificador descripcion }  
        ubicacion { identificador descripcion } 
        plaza_nomina
        plaza_jefe 
        nivelpago { identificador descripcion }                    
    }
}
`;
export const QUERY_COMPETENCIAS = gql`
query getAllCompetencias($id_integrante: Int, $id_ubicacion: Int){
    getCompetenciaByIdUser(id_integrante: $id_integrante){
        identificador
        familia { identificador descripcion }
        nivel { identificador descripcion }
    }
    getCompetenciaUnidadByIdUbicacion(id_ubicacion: $id_ubicacion){
        identificador
        ubicacion { identificador descripcion }
        unidad { identificador descripcion }
    }
}
`;
export const QUERY_COMPETENCIA = gql`
query getCompetencia($id_integrante: Int){
    getCompetenciaByIdUser(id_integrante: $id_integrante){
        identificador
    }
}
`;

export const QUERY_CONOCIMIENTOS = gql `
query getAllConocimientos($id_competencia: Int){
    
    getonocimientoCursoByIdCompetencia(id_competencia: $id_competencia) {
        identificador
        curso {identificador descripcion}
    }
    getonocimientoEspecificoByIdCompetencia(id_competencia: $id_competencia) {
        identificador
        especifico {identificador descripcion}
    }
    getonocimientoTransversalByIdCompetencia(id_competencia: $id_competencia) {
        identificador
        transversal {identificador descripcion}
    }
}
`;
