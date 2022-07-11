import React from 'react';
import { withRouter } from 'react-router-dom';

import CerrarSesion from './CerraSesion';


let usuario = null;
let rol = null;
let dependencia = null;
let id = null;

let opciones = null;

const Header = ({session}) => {

    let barra = (JSON.parse(session)) ? <NavegacionAutenticado session={session} /> : <NavegacionNoAutenticado />

    return (                    
        <div>
            {barra}                                                  
        </div>           
    );
}
const NavegacionNoAutenticado = () =>(

    <nav className="navbar navbar-expand-lg navbar-dark justify-content-between d-flex">
        <div className="text-left brand" >
        </div>
        <div className="text-center ">            
        </div>
        <div className="float-left">                                
        </div>
    </nav>    
);
    
const NavegacionAutenticado = (session) =>(
    <nav className="navbar navbar-expand-lg navbar-dark justify-content-between d-flex">
        <div className="collapse navbar-collapse col-md-auto cerrar" id="navegacion">
            <ul className="navbar-nav ml-auto text-right ">                
                <CerrarSesion />
            </ul>
        </div>
    </nav>
);
        
export default withRouter(Header);
