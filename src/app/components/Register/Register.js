import React, { Component } from 'react';
import './Register.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import http from 'services/http';
import { addUser } from 'reduxConf/actions/userActions';
import { showHideRegister } from 'reduxConf/actions/clickActions';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            lastName: '',
            email: '',
            age: 0,
            username: '',
            password: '',
            error: false,
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        //this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
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

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if(this.props.showRegister.show){
                this.props.showHideRegister(this.state.show);
            }
        }
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
    handleChangeName(e){
        this.setState({
            name: e.target.value
          })
    }
    handleChangeLastName(e){
        this.setState({
            lastName: e.target.value
          })
    }
    handleChangeAge(e){
        this.setState({
            age: e.target.value
          })
    }
    handleChangeEmail(e){
        this.setState({
            password: e.target.value
          })
    }
    onRegister(e) {
        e.preventDefault();
        this.setState({
            showRegister: {show: false},
        });
        const user = {
            name: this.state.name,
            image: "",
            username: this.state.username,
            email: this.state.email,
            lastName: this.state.lastName,
            password: this.state.password,
            gender: this.state.gender,
            age: this.state.age
        };
        http.post(`/User/Register`, { ...user })
        .then(res => {
            http.setToken(res.token)
            .then(res => {
                this.setState({
                    user: res
                })
                this.props.addUser(this.state.user);
            })
            this.setState({
                error: false
            })
            this.props.showHideRegister(this.state.show);
        })
        .catch(err => {
            this.setState({
                error: true
            });
        });
    }

    render() {
        return (
            <div ref={this.setWrapperRef} className={this.props.showRegister.show ? 'login-container px-3 pt-4 pb-5 show-log-in' : 'login-container px-3 pt-4 pb-5 hide-log-in'}>
                <div className="arrow-up"/>
                    <div className = "login-nav">
                        <ul className="navbar-nav d-flex flex-row">
                            <li>
                                <a href="/"> 
                                    <div className ="login-labels px-3 ml-2 mr-2 unselected">Log In </div>
                                </a>
                            </li>
                            <li>
                                <a href="/"> 
                                    <div className ="login-labels px-3 mr-2 ml-2">Register </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4 mb-4 d-flex flex-column">
                        <div className="py-2">
                            <i className="fa fa-envelope icon pr-2"></i>
                            <input 
                                placeholder="E-MAIL"
                                className="input-form" 
                                id="email" 
                                value={this.state.email}
                                onChange={this.handleChangeEmail}/>
                        </div>
                        <div className="py-2">
                            <i className="fa fa-id-card icon pr-2"></i>
                            <input 
                                placeholder="FIRST NAME"
                                className="input-form" 
                                id="name" 
                                value={this.state.name}
                                onChange={this.handleChangeName}/>
                        </div>
                        <div className="py-2">
                            <i className="fa fa-id-card icon pr-2"></i>
                            <input 
                                placeholder="LAST NAME"
                                className="input-form" 
                                id="lastName" 
                                value={this.state.lastName}
                                onChange={this.handleChangeLastName}/>
                        </div>
                        <div className="py-2">
                            <i className="fa fa-calendar icon pr-2"></i>
                            <input 
                                type="number"
                                placeholder="AGE"
                                className="input-form" 
                                id="age" 
                                value={this.state.age}
                                onChange={this.handleChangeAge}/>
                        </div>
                        <div className="py-2">
                            <i className="fa fa-user icon pr-2"></i>
                            <input 
                                placeholder="USERNAME"
                                className="input-form" 
                                id="username" 
                                value={this.state.username}
                                onChange={this.handleChangeUserName}/>
                        </div>
                        <div className="py-2">
                            <i className="fa fa-key icon pr-2"></i>
                            <input 
                                placeholder="PASSWORD"
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
                            onClick ={this.onSubmitUser}> 
                            REGISTER 
                        </button>
            </div>

        )
    }
}

Register.propTypes = {
    showRegister: PropTypes.object.isRequired,
    addUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    showRegister: state.showRegister
});
export default connect(mapStateToProps, {showHideRegister, addUser})(Register);