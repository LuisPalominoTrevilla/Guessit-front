import React, { Component } from 'react';
import http from 'services/http';

import './guessit.scss';

const Image = props => {
    return (
        <div className="col-12 col-lg-3 col-md-4 col-sm-6">
            <div className="image-container">
                <img src={ props.url } alt="Imágen" className="user-image" />
            </div>
        </div>
    )
}

const RenderImages = ({ images }) => {
    return images.map(image =>
        (
            <Image key={image.id} url={`${process.env.REACT_APP_IMAGES_BASE_URL}${image.url}`} age={image.age} />
        )
    );
};

class GuessIt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    componentWillMount() {
        http.get('/Image')
            .then(({ images }) => {
                this.setState({
                    images
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="container-fluid pt-3">
                <div className="row">
                    <RenderImages images={this.state.images} />
                </div>
            </div>
        )
    }
}

export default GuessIt;