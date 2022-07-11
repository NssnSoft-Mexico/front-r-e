import gql from 'graphql-tag';

/*  seccion de cursos */
export const NUEVO_CURSO = gql`
    mutation nuevoCurso(
        $id_curso: Int,
        $nombre_curso: String,
        $trimestre: String,
        $ejercicio: String,
        $proveedor: String,
        $total_horas: Int,
        $calificacion: String,
        $fecha_inicio: Date,
        $fecha_fin: Date,
        $id_usuario_alta: Int,
        $id_estado: Int,
        $fecha_alta: Date,
        $nombre_archivo: String,
        $comentario: String,
        $estatus: String,
        $tipo_curso: String,
        $nombre_institucion: String,
        $expediente_name: String,
    ){
    nuevoCurso(
        id_curso: $id_curso,
        nombre_curso: $nombre_curso,
        trimestre: $trimestre,
        ejercicio: $ejercicio,
        proveedor: $proveedor,
        total_horas: $total_horas,
        calificacion: $calificacion,
        fecha_inicio: $fecha_inicio,
        fecha_fin: $fecha_fin,
        id_usuario_alta: $id_usuario_alta,
        id_estado: $id_estado,
        fecha_alta: $fecha_alta,
        nombre_archivo: $nombre_archivo,
        comentario: $comentario,
        estatus: $estatus,
        tipo_curso: $tipo_curso,
        nombre_institucion: $nombre_institucion,
        expediente_name: $expediente_name,
    )}
`;

export const UPDATE_CURSOS = gql`
    mutation updateUserInfo(
        $id: Int
        $name: String
        $direccion: String
        $ciudad: String
        $pais: String
        $telefono: String
        $email: String
        $foto: String
        $pass: String
        $user: String
    ){
    updateUserInfo(
        id: $id,
        name: $name,
        direccion: $direccion,
        ciudad: $ciudad,
        pais: $pais,
        telefono: $telefono,
        email: $email,
        foto: $foto,
        pass: $pass,
        user: $user,
    )}
`;

export const CREAR_PRODUCTO = gql`
    mutation insertProduct(
        $name: String
        $cantidad: String
        $activo: String
    ){
        insertProduct(
        name: $name,
        cantidad: $cantidad,
        activo: $activo
    )}
`;

export const DEL_PRODUCT = gql`
    mutation deleteProduct(
        $id: String
        $activo: String
    ){
        deleteProduct(
        id: $id,
        activo: $activo
    )}
`;

export const ELIMINAR_CURSO = gql`
    mutation deleteCurso($id_modificacion: Int) {
        deleteCurso(id_modificacion: $id_modificacion)
    }
`;
