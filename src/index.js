import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.css';
import {RootSession} from './App';
import * as serviceWorker from './serviceWorker';
import { environment } from './environment';

const clientCat = new ApolloClient({
	cache: new InMemoryCache({
		addTypename: false
	}),
    uri: environment.API_CAPACITACIONES,
    request: operation => {
        operation.setContext({
            headers: {
                authorization: environment.TOKEN_CAPACITACIONES
            }
        })
    },
    onError: ({ networkError, graphQLErrors }) => {
		console.log('graphQLErrors', graphQLErrors);
		console.log('networkError', networkError);
	}
});

ReactDOM.render(
    <ApolloProvider client={clientCat}>
        <RootSession />
    </ApolloProvider>
    , document.getElementById('root')
);

serviceWorker.unregister();
