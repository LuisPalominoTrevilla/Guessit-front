import React, { Component } from 'react';
import './LogIn.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LogIn extends Component {
    render() {
        return (
            <div className={this.props.showLogIn.show ? 'login-container px-3 pt-4 pb-5 show-log-in' : 'login-container px-3 pt-4 pb-5 hide-log-in'}>
                <div className="arrow-up"/>
                    <div class = "login-nav">
                        <ul className="navbar-nav d-flex flex-row">
                            <li>
                                <a href="/"> 
                                    <div className ="login-labels px-3 ml-2 mr-2">Log In </div>
                                </a>
                            </li>
                            <li>
                                <a href="/"> 
                                    <div className ="login-labels px-3 mr-2 ml-w unselected">Register </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                <div class="mt-4 mb-4 d-flex flex-column">
                    <div class="py-2">
                        <i class="fa fa-user icon pr-2"></i>
                        <input class="input-form" id="username"/>
                    </div>
                    <div class="py-2">
                        <i class="fa fa-key icon pr-2"></i>
                        <input class="input-form" id="username"/>
                    </div>
                </div>
                <button type="button" class="submit-button px-5 py-2"> SUBMIT </button>
            </div>

        )
    }
}

LogIn.propTypes = {
    showLogIn : PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    showLogIn: state.showLogIn
});
export default connect(mapStateToProps, null)(LogIn);