import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SimpleText extends Component {
  render() {
    return (
        <p>
            {this.props.text}
        </p>
    );
  }
}

SimpleText.PropTypes = {
    text: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    text: state.text.message
});

export default connect(mapStateToProps, null)(SimpleText);