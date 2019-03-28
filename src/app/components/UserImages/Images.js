import React, { Component, Fragment } from 'react';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';

import './images.scss';

function Image(props) {
    return (
        <div className="col-12 col-lg-3 col-md-4 col-sm-6">
            <div className="image-container">
                <img src={props.imageURL} alt="Imágen de usuario" className="user-image" />
            </div>
        </div>
    )
}

class Images extends Component {
    render() {
        return(
            <Fragment>
                <ImageUpload/>
                <div className="container-fluid pt-3">
                    <div className="row">
                        <Image imageURL="http://gotaroja.com/pietra.jpeg" />
                        <Image imageURL="http://gotaroja.com/pietra.jpeg" />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Images;