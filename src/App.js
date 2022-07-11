import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './componentes/Layout/Header';
import Develop from './componentes/Layout/Develop';
import Principal from './componentes/Principal';
import Logins from './componentes/Auth/Logins'

import './componentes/css/Generico.css';
import './componentes/css/Login.css';
import './componentes/css/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'

import Session from './componentes/Session';

const App = ({refetch, session}) => {

  return (

    <Router>
      <Fragment>
        <Header session={session}/>
        <div className="container-fluid sobre-nosotros">
          <Switch>
            <Route exact path="/" render={() => <Logins refetch={refetch} />} />
            <Route exact path="/principal" render={() => <Principal session={session} />} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

const RootSession = Session(App);

export { RootSession }
