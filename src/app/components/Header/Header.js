import React, { Component } from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showHideMenu, showHideLogIn } from 'reduxConf/actions/clickActions';
import LogIn from '../LogIn/LogIn';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: true,
            showLogIn: true
        }
        this.onClick = this.onClick.bind(this);
        this.onClickLogIn = this.onClickLogIn.bind(this);
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
            <div className="navbar d-flex">
                <div className={this.state.showMenu ? 'no-header-menu' : 'header-menu-tablet'}><div className="sidenav-header"></div></div>
                <i className={this.state.showMenu ? 'fa fa-bars icon-header menu-bar' : 'fa fa-bars icon-header menu-bar icon-above'} onClick={(e) => this.onClick()} value= {this.state.showMenu} ></i>
                <div className="tittle px-3">GuessIt!</div>
                <i  className={this.props.user.user.image ? ' d-none' : 'fa fa-user-circle-o icon-header mr-3'} onClick={(e) => this.onClickLogIn()}></i>
                <Link to='/profile' className={this.props.user.user.image ? 'image rounder-circle mr-3' : 'd-none'}>
                <img className={this.props.user.user.image ? 'image rounder-circle mr-3' : 'd-none'} alt="imágen de perfil" src={this.props.user.user.image ? this.props.user.user.image : ''}></img>
                </Link>
                <LogIn/>
            </div>

        )
    }
}

Header.propTypes = {
    showHideMenu: PropTypes.func.isRequired,
    showHideLogIn: PropTypes.func.isRequired,
    user : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, {showHideMenu, showHideLogIn })(Header);