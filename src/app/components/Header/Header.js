import React, { Component } from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showHideMenu, showHideLogIn, showHideRegister } from 'reduxConf/actions/clickActions';
import LogIn from '../LogIn/LogIn';
import Register from '../Register/Register';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: true,
            showLogIn: true,
            showRegister: true,
            isInitial: true
        }
        this.onClick = this.onClick.bind(this);
        this.onClickLogIn = this.onClickLogIn.bind(this);
        this.onClickRegister = this.onClickRegister.bind(this);
    }
    
    onClick() {
        this.setState({
            showMenu: !this.state.showMenu,
            isInitial: false
        });

        this.props.showHideMenu(this.state.showMenu);
        
    }
    onClickLogIn() {
        this.setState({
            showLogIn: !this.state.showLogIn
        });

        this.props.showHideLogIn(this.state.showLogIn);
    }
    onClickRegister() {
        this.setState({
            showRegister: !this.state.showRegister
        });

        this.props.showHideRegister(this.state.showRegister);
    }

    render() {
        return (
            <div className="navbar d-flex">
                <div className={`${this.state.showMenu ? 'no-header-menu' : 'header-menu-tablet'} ${this.state.isInitial ? '' : 'enable-sidenav-transition'}`}><div className="sidenav-header"></div></div>
                <i className={this.state.showMenu ? 'fa fa-bars icon-header menu-bar' : 'fa fa-bars icon-header menu-bar icon-above'} onClick={(e) => this.onClick()} value= {this.state.showMenu} ></i>
                <div className="tittle px-3">GuessIt!</div>
                <i  className={this.props.user.user.image ? ' d-none' : 'fa fa-user-circle-o icon-header mr-3'} onClick={(e) => this.onClickLogIn()}></i>
                <Link to='/profile' className={this.props.user.user.image ? 'image rounder-circle mr-3' : 'd-none'}>
                <img className={this.props.user.user.image ? 'image rounder-circle mr-3' : 'd-none'} alt="imágen de perfil" src={this.props.user.user.image ? this.props.user.user.image : ''}></img>
                </Link>
                <LogIn/>
                <Register/>
            </div>

        )
    }
}

Header.propTypes = {
    showHideMenu: PropTypes.func.isRequired,
    showHideLogIn: PropTypes.func.isRequired,
    showHideRegister: PropTypes.func.isRequired,
    user : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, {showHideMenu, showHideLogIn, showHideRegister })(Header);