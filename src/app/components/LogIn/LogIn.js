import React, { Component } from 'react';
import './LogIn.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import http from 'services/http';
import { addUser } from 'reduxConf/actions/userActions';
import { showHideLogIn, showHideRegister } from 'reduxConf/actions/clickActions';

class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            user: '',
            error: false
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onSubmitUser = this.onSubmitUser.bind(this);
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
            if(this.props.showLogIn.show){
                this.props.showHideLogIn(this.state.show);
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
    onSubmitUser(e) {
        e.preventDefault();
        this.setState({
            showLogIn: {show: false},
        });
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        http.post(`/User/Login`, { ...user })
        .then(res => {
            http.setToken(res.token)
            http.get(`/User/PersonalData`)
            .then(res => {
                this.setState({
                    user: res
                })
                this.props.addUser(this.state.user);
            })
            this.setState({
                error: false
            })
            this.props.showHideLogIn(this.state.show);
        })
        .catch(err => {
            this.setState({
                error: true
            });
        });
    }

    onClickRegister() {
        this.setState({
            showRegister: !this.state.showRegister
        });

        this.props.showHideRegister(this.state.showRegister);
    }

    render() {
        return (
            <div ref={this.setWrapperRef} className={this.props.showLogIn.show ? 'login-container px-3 pt-4 pb-5 show-log-in' : 'login-container px-3 pt-4 pb-5 hide-log-in'}>
                <div className="arrow-up"/>
                    <div className = "login-nav">
                        <ul className="navbar-nav d-flex flex-row">
                            <li>
                                <a href="/"> 
                                    <div className ="login-labels px-3 ml-2 mr-2">Log In </div>
                                </a>
                            </li>
                            <li>
                                <a> 
                                    <div className ="login-labels px-3 mr-2 ml-w unselected" onClick={(e) => this.onClickRegister()}>Register </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                <div className="mt-4 mb-4 d-flex flex-column">
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
                <div className={this.state.error ? 'error-message py-2': 'd-none'}> username or password incorrect </div>
                <button 
                    type="submit" 
                    className="submit-button px-5 py-2"
                    onClick ={this.onSubmitUser}> SUBMIT </button>
            </div>
        )
    }
}

LogIn.propTypes = {
    showLogIn : PropTypes.object.isRequired,
    showRegister : PropTypes.object.isRequired,
    showHideRegister: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    showLogIn: state.showLogIn,
    showRegister: state.showRegister,
    showHideRegister: state.showHideRegister
});

export default connect(mapStateToProps, {showHideLogIn, addUser})(LogIn);