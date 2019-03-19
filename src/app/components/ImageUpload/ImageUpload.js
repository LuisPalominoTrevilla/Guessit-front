import React, { Component } from 'react';
import './ImageUpload.scss';
import { Modal } from 'react-bootstrap';
import http from 'services/http';

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
          error: false,
        };
      }
    
      handleClose() {
        this.setState({ show: false });
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
        this.setState({ image: e.target.files[0] })
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
        .then(res => {
            this.handleClose();
        })
        .catch(err => {
            this.setState({
                error: true
            });
        });
    }
    
      render() {
        return (
          <>
            <div className="d-flex flex-row-reverse mr-5 mt-3">
                <button className="add-button" onClick={this.handleShow}>
                +
                </button>
            </div>
    
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add a New Image</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form> 
                    <div className="form-group">
                        <p className="input-labels">Input an Image</p>
                        <input type="file" className="form-control-file" id="file" onChange={this.handleChangeImage}/>
                    </div>
                </form>
                <p className="input-labels">Input the age!</p>
                <input className="form-control" id="imageAge" placeholder="AGE" onChange={this.handleChangeAge}></input>
              </Modal.Body>
              <Modal.Footer>
                <button className="submit-button py-2 px-3" onClick={this.onSubmitImage}>
                  Submit
                </button>
              </Modal.Footer>
            </Modal>
          </>
        );
    }
}


export default ImageUpload;