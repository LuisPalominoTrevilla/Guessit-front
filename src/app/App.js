import React, { Component } from 'react';
import logo from 'assets/icons/logo.svg';
import { Provider } from 'react-redux';
import './App.scss';

import SimpleForm from './components/SimpleForm';
import SimpleText from './components/SimpleText';

import store from 'reduxConf/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
          </header>
          <SimpleText />
          <SimpleForm />
        </div>
      </Provider>
    );
  }
}

export default App;
