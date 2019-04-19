import React, { Component } from 'react';
import http from 'services/http';

import './guessit.scss';

class Image extends Component {

    constructor(props) {
        super(props);

        this.state = {
            age: "",
            response: {
                guessed: false,
                correct: false,
                message: ""
            }
        }
    }

    handleClick() {
        const age = parseInt(this.state.age);
        if (this.state.response.guessed) return; 
        http.post(`/Image/${this.props.imageId}/Rate`, { age })
            .then(res => {
                this.setState({
                    response: {
                        guessed: true,
                        correct: res.correct,
                        message: res.message
                    }
                });
                setTimeout(() => {
                    this.props.removeImage(this.props.imageId);
                }, 1500);
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
                            hidden={this.state.response.guessed}
                            src={this.props.url}
                            alt="Imágen"
                            className="user-image cur-pointer"/>
                        <div
                            hidden={!this.state.response.guessed}
                            className={`guess-response ${this.state.response.correct ? "correct" : "incorrect" }`}>
                            <h4>{this.state.response.message}</h4>
                        </div>
                    </div>
                    <div className="guessit-input-container">
                        <input
                            disabled={this.state.response.guessed}
                            placeholder="How old is he/she?"
                            type="text"
                            value={this.state.age}
                            onChange={(e) => this.handleAgeChange(e)}
                            data-lpignore={true}/>
                        <i
                            className={`submit-age-btn ${!this.state.response.guessed ? 'cur-pointer' : ''} fas fa-check`}
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

const RenderImages = ({ images, removeImage }) => {
    return images.map(image =>
        (
            <Image
                key={image.id}
                url={`${process.env.REACT_APP_IMAGES_BASE_URL}${image.url}`}
                imageId={image.id}
                removeImage={removeImage}
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

    removeImage(id) {
        this.setState({
            images: this.state.images.filter(image => image.id !== id)
        });
    }

    render() {
        return (
            <div className="container-fluid pt-3">
                <div className="row">
                    <RenderImages
                        images={this.state.images}
                        removeImage={(id) => this.removeImage(id)}/>
                </div>
            </div>
        )
    }
}

export default GuessIt;