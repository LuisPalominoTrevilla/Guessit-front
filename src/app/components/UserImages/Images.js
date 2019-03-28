import React, { Component, Fragment } from 'react';
import ImageUpload from 'app/components/ImageUpload/ImageUpload';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchImages } from 'reduxConf/actions/userActions';

import './images.scss';

function Image(props) {
    return (
        <div className="col-12 col-lg-3 col-md-4 col-sm-6">
            <div className="image-container">
                <img src={ props.imageURL } alt="Imágen de usuario" className="user-image" />
            </div>
        </div>
    )
}

function RenderImages({ images }) {
    return images.map((image, index) => (
        <Image key={index} imageURL={`${process.env.REACT_APP_IMAGES_BASE_URL}${image.url}`} />
    ));
}

class Images extends Component {

    componentWillMount() {
        this.props.fetchImages()
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return(
            <Fragment>
                <ImageUpload/>
                <div className="container-fluid pt-3">
                    <div className="row">
                        <RenderImages images={ this.props.user.images } />
                    </div>
                </div>
            </Fragment>
        )
    }
}

Images.propTypes = {
    fetchImages: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { fetchImages })(Images);