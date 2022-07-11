import React from 'react';
import { withRouter } from 'react-router-dom';

function Error({mensaje}) {

    return(
        <div className="row justify-content-center">
            <p className="alert alert-danger p-3 text-center">
                {mensaje}
            </p>
        </div>  
    )
}

export default withRouter(Error);