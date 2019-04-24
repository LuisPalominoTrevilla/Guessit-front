import React, { Component } from 'react';
import './UserForm.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import http from 'services/http';
import Notify from 'util/notifier';

import { addUser } from 'reduxConf/actions/userActions';
import { fetchImages } from 'reduxConf/actions/userActions';
import { showHideUserForm } from 'reduxConf/actions/clickActions';

class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            user: ''
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onSubmitUser = this.onSubmitUser.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
    }
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleChangeUserName(e){
        this.setState({
            username: e.target.value
        })
    }
    handleChangePassword(e){
        this.setState({
            password: e.target.value
          })
    }
    onSubmitUser(e) {
        e.preventDefault();
        this.setState({
            showUserForm: {show: false},
        });
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        http.post(`/User/Login`, { ...user })
        .then(res => {
            http.setToken(res.token);
            this.props.fetchImages()
                .catch(err => {
                    console.log(err);
                });
            http.get(`/User/PersonalData`)
                .then(res => {
                    this.setState({
                        user: res
                    })
                    this.props.addUser(this.state.user);
                })
            this.props.showHideUserForm(this.state.show);
        })
        .catch(() => {
            Notify.createNotification('error', 'Login fallido', 'Usuario o contraseña incorrectos');
        });
    }

    render() {
        return (
            <div>
                <div className="mt-4 mb-4 d-flex flex-column">
                    <div className="py-2">
                        <i className="fa fa-user icon pr-2"></i>
                        <input 
                            placeholder="Usuario"
                            className="input-form" 
                            id="username" 
                            value={this.state.username}
                            onChange={this.handleChangeUserName}/>
                    </div>
                    <div className="py-2">
                        <i className="fa fa-key icon pr-2"></i>
                        <input 
                            placeholder="Contraseña"
                            className="input-form" 
                            id="password"
                            value={this.state.password}
                            type= "password"
                            onChange={this.handleChangePassword}/>
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="submit-button px-5 py-2"
                    onClick ={this.onSubmitUser}> SUBMIT 
                </button>
            </div>
        )
    }
}

LogIn.propTypes = {
    fetchImages: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    showHideUserForm: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    showHideUserForm: state.showHideUserForm,
    showUserForm: state.showUserForm
});
export default connect(mapStateToProps, {showHideUserForm, addUser, fetchImages})(LogIn);
