import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
//wrap app with Provider
import store from './ducks/store'
class App extends Component {
  render() {
    return (

      <Provider store={store}>
        <HashRouter>
          <div className="App">
            {routes}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;

//start getting in the habit of putting HashRouter in app.js for testing through a specific program that we will learn about. It is very good if you 