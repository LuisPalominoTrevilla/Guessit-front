import React, { Component } from 'react';
import http from 'services/http';

import './guessit.scss';

class Image extends Component {

    constructor(props) {
        super(props);

        this.state = {
            age: ""
        }
    }

    handleClick() {
        const age = parseInt(this.state.age);
        http.post(`/Image/${this.props.imageId}/Rate`, { age })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleAgeChange(e) {
        const numRegexp = /^[0-9]+$/;
        const input = e.target.value;
        if (input == "" || numRegexp.test(input) && input > 0 && input < 110) {
            this.setState({
                age: input
            });
        } else {
            console.log('Input not valid');
        }
    }

    render() {
        return (
            <div className="guessit-image col-12 col-xl-3 col-lg-4 col-md-6">
                <div className="guessit-rate-container">
                    <div className="guessit-image-container">
                        <img
                            src={this.props.url}
                            alt="Imágen"
                            className="user-image cur-pointer"/>
                    </div>
                    <div className="guessit-input-container">
                        <input
                            placeholder="How old is he/she?"
                            type="text"
                            value={this.state.age}
                            onChange={(e) => this.handleAgeChange(e)}
                            data-lpignore={true}/>
                        <i
                            className="submit-age-btn cur-pointer fas fa-check"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Calificar imágen"
                            onClick={() => this.handleClick()}/>
                    </div>
                </div>
            </div>
        )
    }
}

const RenderImages = ({ images }) => {
    return images.map(image =>
        (
            <Image
                key={image.id}
                url={`${process.env.REACT_APP_IMAGES_BASE_URL}${image.url}`}
                imageId={image.id}
                age={image.age} />
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