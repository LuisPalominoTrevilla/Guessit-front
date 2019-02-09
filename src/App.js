import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

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

    this.props.createText(this.state.text);
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'HOLA MUNDO!'
    }
    this.changeText = this.changeText.bind(this);
  }

  changeText(text) {
    this.setState({
      text
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
        <p>
          {this.state.text}
        </p>
        <SimpleForm createText={this.changeText}/>
      </div>
    );
  }
}

export default App;
