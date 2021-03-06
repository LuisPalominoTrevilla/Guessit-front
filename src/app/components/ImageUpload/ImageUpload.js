import React, { Component, Fragment } from 'react';
import './ImageUpload.scss';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import http from 'services/http';
import Notify from 'util/notifier';

import { insertImage } from 'reduxConf/actions/userActions';

class ImageUpload extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.onSubmitImage = this.onSubmitImage.bind(this);
    
        this.state = {
          show: false,
          age: null,
          image: null,
          imageURL: null,
          error: false,
        };
      }
    
      handleClose() {
        this.setState({ show: false, age: null,  image: null, imageURL: null});
      }
    
      handleShow() {
        this.setState({ show: true });
      }

      handleChangeAge(e){
        this.setState({
            age: e.target.value
        })
      }

      handleChangeImage(e) {
        this.setState({ image: e.target.files[0] });
        this.setState({ imageURL: URL.createObjectURL(new Blob(e.target.files))});
      }

      onSubmitImage(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',this.state.image)
        formData.set('age', this.state.age)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        http.post(`/Image/UploadImage`, formData , config)
          .then(image => {
              this.handleClose();
              this.props.insertImage(image);
          })
          .catch(err => {
              Notify.createNotification('error', 'Agregar Imagen', 'Falta completar todos los campos!');
          });
    }
    
      render() {
        return (
          <Fragment>
            <div className="d-flex flex-row-reverse mr-5 mt-3">
                <button className="add-button" onClick={this.handleShow}>
                +
                </button>
            </div>
    
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Agregar una Imagen</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form> 
                    <div className="form-group">
                        <img src={this.state.imageURL} alt="" className="before-image"/>
                        <p className="input-labels">Ingrese una Imagen</p>
                        <input type="file" className="form-control-file" id="file" onChange={this.handleChangeImage}/>
                    </div>
                </form>
                <p className="input-labels">Ingrese la edad!</p>
                <input className="form-control" id="imageAge" placeholder="EDAD" onChange={this.handleChangeAge}></input>
              </Modal.Body>
              <Modal.Footer>
                <button className="submit-button py-2 px-3" onClick={this.onSubmitImage}>
                  Agregar
                </button>
              </Modal.Footer>
            </Modal>
          </Fragment>
        );
    }
}

ImageUpload.propTypes = {
  insertImage: PropTypes.func.isRequired
}

export default connect(null, { insertImage })(ImageUpload);