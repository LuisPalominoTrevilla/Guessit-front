import React, { Component } from 'react';
import './Menu.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import http from 'services/http';

import { removeUser } from 'reduxConf/actions/userActions';
import { fetchAllImages } from 'reduxConf/actions/guessitActions';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state= {
            path: '/',
        }
        this.onClick = this.onClick.bind(this);
    }
    componentWillMount(){
        this.setState({
            path: this.props.location.pathname
        });
    }

    onClick() {
        this.setState({
            path: this.props.location.pathname
        });
    }

    logout() {
        http.post('/User/Logout')
            .then(res => {
                http.removeToken();
                this.props.removeUser();
                this.props.history.push('/');
                this.props.fetchAllImages();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className={`${this.props.showMenu.show ? 'show-menu' : 'hide-menu'} ${this.props.showMenu.isInitial ? '' : 'enable-sidenav-transition'}`}>
                <div className ='sidebar'  >
                    <ul className="navbar-nav">
                        <li className ={this.props.location.pathname === '/' ? 'nav-item py-1 active' : 'nav-item py-1'} >
                            <Link to="/" >
                                <div className ="nav-link d-flex mx-2 1 " tooltip="Home page" tooltip-position="right"> 
                                    <i className="fa fa-check icon-mobile mx-2" ></i>
                                    <div className ="menu-labels" >GuessIt!</div>
                                </div>
                            </Link>
                        </li>
                        <div className={this.props.user.user.username ? 'd-block': 'd-none'}>
                            <li className={this.props.location.pathname === '/images' ? 'nav-item py-1 active' : 'nav-item py-1'}>
                                <Link to="/images">
                                    <div className="nav-link d-flex mx-2 3" tooltip="Images" tooltip-position="right"> 
                                        <i className="fa fa-picture-o icon-mobile mx-2"></i>
                                        <div className="menu-labels">Your Images</div>
                                    </div>
                                </Link>
                            </li>
                        </div>
                        <div className={this.props.user.user.username ? 'd-block': 'd-none'}>
                            <li className="nav-item py-1" onClick={() => this.logout()}>
                                <div className="nav-link d-flex mx-2 3" tooltip="Log out" tooltip-position="right"> 
                                    <i className="fa fa-sign-out icon-mobile mx-2"></i>
                                    <div className="menu-labels">Logout</div>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}

Menu.propTypes = {
    showMenu: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    removeUser: PropTypes.func.isRequired,
    fetchAllImages: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    showMenu: state.showMenu,
    user: state.user
});
export default withRouter(connect(mapStateToProps, { removeUser, fetchAllImages })(Menu));