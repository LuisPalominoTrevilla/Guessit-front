import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeText } from 'reduxConf/actions/textActions';

class SimpleForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        text: ''
      }
      this.onChange = this.onChange.bind(this);
    }
  
    onChange(e) {
      this.setState({
        text: e.target.value
      })
    }
  
    onSubmit(e) {
      e.preventDefault();
  
      this.props.changeText(this.state.text);
    }
  
    render() {
      return (
        <div>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <label>Texto:</label>
            <input
              type="text"
              name="title"
              onChange={(e) => {this.onChange(e)}}
              value={this.state.text}>
            </input>
            <button type="submit"> Submit</button>
          </form>
        </div>
      )
    }
  }

  SimpleForm.propTypes = {
      changeText: PropTypes.func.isRequired
  }

  export default connect(null, { changeText })(SimpleForm);