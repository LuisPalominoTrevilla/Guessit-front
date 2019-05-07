import React, { Component, Fragment } from 'react';
import './EditProfile.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

class EditProfile extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.onSubmitUser = this.onSubmitUser.bind(this);
    
        this.state = {
          show: false,
          imageURL: null,
          error: false,
          age: null,
          image: null,
          name: null,
          username: null,
          lastName: null,
          email: null,
          gender: null,
        };
      }
    
      handleClose() {
        this.setState({ 
          show: false,
          imageURL: null,
          error: false,
          age: null,
          image: null,
          name: null,
          username: null,
          lastName: null,
          email: null,
          gender: null,
        });
      }
    
      handleShow() {
        this.setState({ show: true });
      }

      handleChangeAge(e){
        this.setState({ age: e.target.value }); 
      }

      handleChangeName(e){
        this.setState({ name: e.target.value }); 
      }

      handleChangeUsername(e){
        this.setState({ username: e.target.value }); 
      }

      handleChangeLastName(e){
        this.setState({ lastName: e.target.value }); 
      }

      handleChangeEmail(e){
        this.setState({ email: e.target.value }); 
      }

      handleChangeGender(e){
        this.setState({ gender: e.target.value }); 
      }

      handleChangeImage(e) {
        this.setState({ image: e.target.files[0] });
        this.setState({ imageURL: URL.createObjectURL(new Blob(e.target.files))});
      }

      onSubmitUser(e) {
        //HERE
    }

    render () {
        return (
            <Fragment>
            <div className="d-flex flex-row-reverse mr-5 mt-3">
                <button className="edit-profile-button" onClick={this.handleShow}>
                    <i class="fas fa-pencil-alt"></i>
                </button>
            </div>
    
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>EditarPerfil</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form> 
                    <div className="form-group">
                        <img src={this.state.image? this.state.image : this.props.user.user.image ? this.props.user.user.image : 'https://www.allafricanhits.com/wp-content/uploads/2017/11/user-default-avatar.png'} alt="" className="before-image"/>
                        <p className="input-labels">Ingrese una Imagen</p>
                        <input type="file" className="form-control-file" id="file" onChange={this.handleChangeImage}/>
                    </div>
                </form>
                <p className="input-labels">Ingrese Nombre(s)!</p>
                <input className="form-control" id="name" defaultValue={this.props.user.user.name} onChange={this.handleChangeName}></input>
                <p className="input-labels">Ingrese Apellidos!</p>
                <input className="form-control" id="apellido" defaultValue={this.props.user.user.lastName} onChange={this.handleChangeLastName}></input>
                <p className="input-labels">Ingrese el Username!</p>
                <input className="form-control" id="username" defaultValue={this.props.user.user.username} onChange={this.handleChangeUsername}></input>
                <p className="input-labels">Ingrese el Correo!</p>
                <input className="form-control" id="email" defaultValue={this.props.user.user.email} onChange={this.handleChangeEmail}></input>
                <p className="input-labels">Ingrese Genero!</p>
                <input className="form-control" id="gender" defaultValue={this.props.user.user.gender} onChange={this.handleChangeGender}></input>
                <p className="input-labels">Ingrese Edad!</p>
                <input type='number' className="form-control" id="age" defaultValue={this.props.user.user.age} onChange={this.handleChangeAge}></input>
                
              </Modal.Body>
              <Modal.Footer>
                <button className="submit-button py-2 px-3" onClick={this.onSubmitUser}>
                  Editar
                </button>
              </Modal.Footer>
            </Modal>
          </Fragment>
            
        )
    }
}

EditProfile.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, null)(EditProfile);