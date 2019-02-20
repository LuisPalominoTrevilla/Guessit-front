import React, { Component } from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showHideMenu, showHideLogIn } from 'reduxConf/actions/clickActions';
import LogIn from '../LogIn/LogIn';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: true,
            showLogIn: true
        }
    }
    onClick() {
        this.setState({
            showMenu: !this.state.showMenu
        });

        this.props.showHideMenu(this.state.showMenu);
        
    }
    onClickLogIn() {
        this.setState({
            showLogIn: !this.state.showLogIn
        });

        this.props.showHideLogIn(this.state.showLogIn);
    }

    render() {
        return (
            <div class="navbar d-flex">
                <div className={this.state.showMenu ? 'no-header-menu' : 'header-menu-tablet'}></div>
                <i className={this.state.showMenu ? 'fa fa-bars icon-header menu-bar' : 'fa fa-bars icon-header menu-bar icon-above'} onClick={(e) => this.onClick()} value= {this.state.showMenu} ></i>
                <div class="tittle px-3">GuessIt!</div>
                <i class="fa fa-user-circle-o icon-header mr-3" onClick={(e) => this.onClickLogIn()}></i>
                <LogIn/>
            </div>

        )
    }
}

Header.propTypes = {
    showHideMenu: PropTypes.func.isRequired,
    showHideLogIn: PropTypes.func.isRequired
}

export default connect(null, {showHideMenu, showHideLogIn })(Header);