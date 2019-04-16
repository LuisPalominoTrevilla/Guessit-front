import React, { Component } from 'react';
import http from 'services/http';

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
                console.log(images);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="container-fluid pt-3">
                <div className="row">
                    
                </div>
            </div>
        )
    }
}

export default GuessIt;