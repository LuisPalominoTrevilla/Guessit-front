import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import './App.scss';
import Menu from './components/Menu/Menu';
import Header from './components/Header/Header';
import { BrowserRouter, Route } from 'react-router-dom';

import SimpleForm from './components/SimpleForm';
import SimpleText from './components/SimpleText';
import GuessIt from './components/GuessIt';
import GStats from './components/GStats';
import Images from './components/Images';
import Profile from './components/Profile';

import store from 'reduxConf/store';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <Menu/>
            <Header/>
            <Route exact path='/' component={GuessIt} />
            <Route path='/g-stats' component={GStats} />
            <Route path='/images' component={Images} />
            <Route path='/profile' component={Profile} />
            <SimpleText />
            <SimpleForm />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
