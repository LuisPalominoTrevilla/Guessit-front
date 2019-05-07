import React, { Component, Fragment } from 'react';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

import './images.scss';

const options = {
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 10,
        fontColor: "white",
      }
    }
  }

function Image(props) {
    const data = {
        labels: [
            'Correct',
            'Incorrect'
        ],
        datasets: [{
            data: [props.correctUnregister, props.quantityUnregister - props.correctUnregister],
            backgroundColor: [
            '#ffffff'
            ],
        }]
    }
    const data1 = {
        labels: [
            'Correct',
            'Incorrect'
        ],
        datasets: [{
            data: [props.correctRegister, props.quantityRegister - props.correctRegister],
            backgroundColor: [
            '#ffffff'
            ],
        }]
    }
    return (
        <div className="col-12 col-lg-3 col-md-4 col-sm-6">
            <div className="image-container">
                <img src={ props.imageURL } alt="Imágen de usuario" className="user-image" />
                <div className="overlay-image"> 
                    <Pie
                        data={data}
                        options={options}
                    />
                    <Pie
                        data={data1}
                        options={options}
                    />
                
                </div>
            </div>

        </div>
    )
}

function RenderImages({ images }) {
    return images.map(image => (
        <Image key={image.id} 
        imageURL={`${process.env.REACT_APP_IMAGES_BASE_URL}${image.url}`}
        correctUnregister={image.unregisteredGuesses ? image.unregisteredGuesses.correct : 0}
        quantityUnregister={image.unregisteredGuesses ? image.unregisteredGuesses.quantity : 0}
        correctRegister={image.registeredGuesses ? image.registeredGuesses.correct : 0}
        quantityRegister={image.registeredGuesses ? image.registeredGuesses.quantity: 0}/>

    ));
}

class Images extends Component {
    render() {
        return(
            <Fragment>
                <ImageUpload/>
                <div className="container-fluid pt-3">
                    <div className="row">
                        <RenderImages images={ this.props.user.images ? this.props.user.images : [] } />
                    </div>
                </div>
            </Fragment>
        )
    }
}

Images.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, null)(Images);