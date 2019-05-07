import React, { Component, Fragment } from 'react';
import './Profile.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Profile extends Component {
    render () {
        return (
            <div className='profile-contain'> 
            <div className='profile-title'>
                {this.props.user.user.name} 
            </div>
            <div className='profile-image'>
                <img src={this.props.user.user.image}/>
            </div>
            
            </div>
            
        )
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, null)(Profile);