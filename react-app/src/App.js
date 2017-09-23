import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {MuiThemeProvider} from 'material-ui';
import logo from './logo.svg';
import './App.css';
import store from './redux/store';
import PlaylistGenerator from "./components/PlaylistGenerator/PlaylistGenerator";

class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <MuiThemeProvider>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h2>Welcome to React</h2>
              <PlaylistGenerator targetUrl={"https://www.reddit.com/r/songaweek/comments/4asd0x/submissions_week_12_theme_foreign_language/"}/>
            </div>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
