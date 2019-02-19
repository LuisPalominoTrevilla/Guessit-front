import React, { Component } from 'react';
import './Menu.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

var currentLocation = window.location.pathname; 
class Menu extends Component {
    render() {
        return (
            <div className={this.props.showMenu.show ? 'show-menu' : 'hide-menu'}>
                <div className ='sidebar'  >
                    <ul className="navbar-nav">
                        <li className ={currentLocation == '/' ? 'nav-item py-1 active' : 'nav-item py-1'}>
                            <a className ="nav-link d-flex mx-2" href="/"> 
                                <i className="fa fa-check icon-mobile mx-2"></i>
                                <div className ="menu-labels" >GuessIt!</div>
                            </a>
                        </li>
                        <li className ={currentLocation == '/g-stats' ? 'nav-item py-1 active' : 'nav-item py-1'}>
                            <a className ="nav-link d-flex mx-2" href="/g-stats"> 
                                <i className="fa fa-bar-chart icon-mobile mx-2"></i>
                                <div className ="menu-labels">Global Statistics</div>
                            </a>
                        </li>
                        <li className={currentLocation == '/images' ? 'nav-item py-1 active' : 'nav-item py-1'}>
                            <a className="nav-link d-flex mx-2" href="/images"> 
                                <i className="fa fa-picture-o icon-mobile mx-2"></i>
                                <div className="menu-labels">Your Images</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

Menu.propTypes = {
    showMenu : PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    showMenu: state.showMenu
});
export default connect(mapStateToProps, null)(Menu);