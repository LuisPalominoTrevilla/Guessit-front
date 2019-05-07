import React, { Component } from 'react';
import './Profile.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Profile extends Component {
    render () {
        return (
            <div className='profile-contain'> 
            <div className='profile-title'>
                {this.props.user.user.name}, {this.props.user.user.lastName}
            </div>
            <div className='contain-image'>
                <div className='profile-image'>
                    <img alt='' src={this.props.user.user.image ? this.props.user.user.image: 'https://www.allafricanhits.com/wp-content/uploads/2017/11/user-default-avatar.png'}/>
                </div>
            </div>
            <div className='editable-profile'>
                <div> Username: {this.props.user.user.username}</div>
                <div> Email: {this.props.user.user.email}</div>
                <div> Gender: {this.props.user.user.gender}</div>
            </div>
            <i class="fas fa-pencil-alt"></i>
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