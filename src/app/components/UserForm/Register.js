import React, { Component } from 'react';
import './UserForm.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import http from 'services/http';
import { showHideUserForm } from 'reduxConf/actions/clickActions';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            lastName: '',
            email: '',
            age: 0,
            gender: '',
            username: '',
            password: '',
            error: false
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.onRegister = this.onRegister.bind(this);
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
            email: e.target.value
          })
    }
    handleChangeGender(e){
        this.setState({
            gender: e.target.value
          })
    }
    onRegister(e) {
        e.preventDefault();
        this.setState({
            showUserForm: {show: false}
        });
        const user = {
            name: this.state.name,
            image: "",
            username: this.state.username,
            email: this.state.email,
            lastName: this.state.lastName,
            password: this.state.password,
            gender: this.state.gender,
            age: parseInt(this.state.age)
        };
        http.post(`/User/Register`, { ...user })
        .then(res => {
            this.setState({
                name: '',
                lastName: '',
                email: '',
                age: 0,
                gender: '',
                username: '',
                password: '',
                error: false
            })
            this.props.showHideUserForm(this.state.show);
        })
        .catch(err => {
            this.setState({
                error: true
            });
        });
    }

    render() {
        return (
            <div>
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
                        <div className="py-2">
                            <i className="fa fa-id-card icon pr-2"></i>
                            <select className="fa-select">
                                <option value={this.state.gender = 'Male'}>Male</option>
                                <option value={this.state.gender = 'Female'}>Female</option>
                            </select>
                        </div>
                    </div>
                    <div className={this.state.error ? 'error-message py-2': 'd-none'}> Temporary error message - To be changed when error messages are sent in JSON form </div>
                    <button 
                        type="submit" 
                        className="submit-button px-5 py-2"
                        onClick ={this.onRegister}> 
                        REGISTER 
                    </button>
                </div>

        )
    }
}

Register.propTypes = {
    showHideUserForm: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    showHideUserForm: state.showHideUserForm,
    showUserForm: state.showUserForm
});
export default connect(mapStateToProps, { showHideUserForm })(Register);