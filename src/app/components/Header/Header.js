import React, { Component } from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showHideMenu, showHideUserForm } from 'reduxConf/actions/clickActions';
import UserForm from '../UserForm/UserForm';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: true,
            isInitial: true,
            formBeenClicked: false
        }
        this.onClick = this.onClickMenu.bind(this);
        this.onClickUserForm = this.onClickUserForm.bind(this);
    }
    
    onClickMenu() {
        this.setState({
            showMenu: !this.state.showMenu,
            isInitial: false
        });

        this.props.showHideMenu(this.state.showMenu);
        
    }
    
    onClickUserForm() {

            if(!this.props.showUserForm.show && !this.state.formBeenClicked) {
                this.props.showHideUserForm(!this.props.showUserForm.show);
                //this.setState({
                  //  formBeenClicked: true
                //})
            }
    }

    render() {
        return (
            <div className="navbar d-flex">
                <div className={`${this.state.showMenu ? 'no-header-menu' : 'header-menu-tablet'} ${this.state.isInitial ? '' : 'enable-sidenav-transition'}`}><div className="sidenav-header"></div></div>
                <i className={this.state.showMenu ? 'fa fa-bars icon-header menu-bar' : 'fa fa-bars icon-header menu-bar icon-above'} onClick={(e) => this.onClickMenu()} value= {this.state.showMenu} ></i>
                <div className="tittle px-3">GuessIt!</div>
                <i  className={this.props.user.user.image ? ' d-none' : 'fa fa-user-circle-o icon-header mr-3'} onClick={(e) => this.onClickUserForm()}></i>
                <Link to='/profile' className={this.props.user.user.image ? 'image rounder-circle mr-3' : 'd-none'}>
                <img className={this.props.user.user.image ? 'image rounder-circle mr-3' : 'd-none'} alt="imágen de perfil" src={this.props.user.user.image ? this.props.user.user.image : ''}></img>
                </Link>
                <UserForm/>
            </div>

        )
    }
}

Header.propTypes = {
    showHideMenu: PropTypes.func.isRequired,
    showHideUserForm: PropTypes.func.isRequired,
    user : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    showUserForm: state.showUserForm
});

export default connect(mapStateToProps, {showHideMenu, showHideUserForm})(Header);