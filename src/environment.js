
// STAGING
export const environment = {
    API_LDAP: 'https://dgti-ees-servicio-consulta-ldap.apps.funcionpublica.gob.mx',

    API_CAPACITACIONES: 'http://localhost:4000/graphql',
    //API_CAPACITACIONES: 'https://dgti-ees-capacitacion-rh-backend-staging.k8s.funcionpublica.gob.mx/graphql',
    TOKEN_CAPACITACIONES: 'U2FsdGVkX19x2KOlv+IDbTJvvy0n0PBc99ebV+PgU6c=',

    API_MINIO_DOC: 'https://dgti-ees-document-api.k8s.funcionpublica.gob.mx/document/get',
    API_MINIO_EXP: 'https://dgti-ees-document-api.k8s.funcionpublica.gob.mx/new/document/expediente',
    MINIO: {
        SERVER: 'minio-stg',
        BUCKET: 'capacitaciones-prod'
    }
};