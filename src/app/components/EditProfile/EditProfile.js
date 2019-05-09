import React, { Component, Fragment } from 'react';
import './EditProfile.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import http from 'services/http';
import Notify from 'util/notifier';

class EditProfile extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.onSubmitUser = this.onSubmitUser.bind(this);
    
        this.state = {
          show: false,
          error: false,
          age: null,
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
          error: false,
          age: null,
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

      onSubmitUser(e) {
        const request = {
          email: this.props.user.user.email
        };
        if (this.state.age !== null) {
          request.age = parseInt(this.state.age);
        }
        if (this.state.name !== null) {
          request.name = this.state.name;
        }
        if (this.state.username !== null) {
          request.username = this.state.username;
        }
        if (this.state.lastName !== null) {
          request.lastName = this.state.lastName;
        }
        if (this.state.email !== null) {
          request.email = this.state.email;
        }
        if (this.state.gender !== null) {
          request.gender = this.state.gender;
        }
        http.put('/User/Update', request)
          .then(res => {
            Notify.createNotification('success', 'Operación exitosa', 'Perfil modificado con éxito');
          })
          .catch(err => {
            Notify.createNotification('error', 'Error al modificar perfil', err);
          });
    }

    render () {
        return (
            <Fragment>
            <div className="d-flex flex-row-reverse mr-5 mt-3">
                <button className="edit-profile-button" onClick={this.handleShow}>
                    <i className="fas fa-pencil-alt"></i>
                </button>
            </div>
    
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>EditarPerfil</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <img src={this.state.image? this.state.image : this.props.user.user.image ? this.props.user.user.image : 'https://www.allafricanhits.com/wp-content/uploads/2017/11/user-default-avatar.png'} alt="" className="before-image"/>
                <p className="input-labels">Edite nombre(s)!</p>
                <input className="form-control" id="name" defaultValue={this.props.user.user.name} onChange={this.handleChangeName}></input>
                <p className="input-labels">Edite apellidos!</p>
                <input className="form-control" id="apellido" defaultValue={this.props.user.user.lastName} onChange={this.handleChangeLastName}></input>
                <p className="input-labels">Edite el nombre de usuario!</p>
                <input className="form-control" id="usrname" defaultValue={this.props.user.user.username} onChange={this.handleChangeUsername}></input>
                <p className="input-labels">Edite el correo!</p>
                <input className="form-control" id="email" defaultValue={this.props.user.user.email} onChange={this.handleChangeEmail}></input>
                <p className="input-labels">Seleccione el género!</p>
                <input className="form-control" id="gender" defaultValue={this.props.user.user.gender} onChange={this.handleChangeGender}></input>
                <p className="input-labels">Edite la edad!</p>
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