import React from 'react';
import { Query } from 'react-apollo';
import { QUERY_CATALOGOS } from '../queries';

let variablesEstado = { nombre: 'Ejercicio'};

const Session = Component => props => (

    <Query query={QUERY_CATALOGOS} variables={variablesEstado}  >
            
        {({loading, error, data, refetch}) => {
            
            //console.log('+++SESSION-PERFIL:', JSON.parse(localStorage.getItem('perfil')));
            if(loading) return null;

            let perfil = localStorage.getItem('perfil')
            return <Component {...props} refetch={refetch} session={perfil} />
        }}
    </Query>
)

export default Session;