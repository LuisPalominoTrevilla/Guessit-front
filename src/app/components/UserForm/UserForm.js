import React, { Component } from 'react';
import './UserForm.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showHideUserForm } from 'reduxConf/actions/clickActions';
import LogIn from './LogIn';
import Register from './Register';

class UserForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showRegister: false,
            showLogin: true,
            error: false
        }
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.onClickRegister = this.onClickRegister.bind(this)
        this.onClickLogin = this.onClickLogin.bind(this);
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
        if (this.wrapperRef && !this.props.checkHeaderClick(event) && !this.wrapperRef.contains(event.target)) {
            if(this.props.showUserForm.show) {
                this.props.showHideUserForm(false);
            }
            this.onClickLogin();
        }
    }

    onClickLogin() {
        if(!this.state.showLogin) {
            this.setState({
                showLogin: !this.state.showLogin,
                showRegister: !this.state.showRegister
            });
        }
    }

    onClickRegister() {
        if(!this.state.showRegister) {
            this.setState({
                showRegister: !this.state.showRegister,
                showLogin: !this.state.showLogin,
            });
        }
    }

    render() {
        return (
            <div ref={this.setWrapperRef} className={this.props.showUserForm.show ? 'userform-container px-3 pt-4 pb-5 show-userform' : 'userform-container px-3 pt-4 pb-5 hide-userform'}>
                <div className="arrow-up"/>
                <div className = "userform-nav">
                    <ul className="navbar-nav d-flex flex-row">
                        <li>
                                <div className = {this.state.showLogin ? "userform-labels px-3 ml-2 mr-2 selected" : "userform-labels px-3 ml-2 mr-2" } onClick={(e) => this.onClickLogin()}>Iniciar sesión</div>
                        </li>
                        <li>
                                <div className = {this.state.showRegister ? "userform-labels px-3 ml-2 mr-2 selected" : "userform-labels px-3 ml-2 mr-2" } onClick={(e) => this.onClickRegister()}>Registro</div>
                        </li>
                    </ul>
                </div>
                {this.state.showLogin && <LogIn/>}
                {this.state.showRegister && <Register/>}
            </div>
        )
    }
}

UserForm.propTypes = {
    showHideUserForm: PropTypes.func.isRequired,
    showUserForm: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    showHideUserForm: state.showHideUserForm,
    showUserForm: state.showUserForm,
});

export default connect(mapStateToProps, {showHideUserForm})(UserForm);