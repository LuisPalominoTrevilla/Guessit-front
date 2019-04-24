import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-notifications/lib/notifications.css';
import { Provider } from 'react-redux';
import './App.scss';
import Menu from './components/Menu/Menu';
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';

import ViewWrapper from './components/ViewWrapper';

import store from 'reduxConf/store';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <Menu/>
            <Header/>
            <ViewWrapper/>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
