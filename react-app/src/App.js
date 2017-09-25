import React, {Component} from 'react';
import Flexbox from 'flexbox-react';
import {Provider} from 'react-redux';
import {MuiThemeProvider} from 'material-ui';
import snoo from './snoo.png';
import './App.css';
import store from './redux/store';
import ThreadFetcher from "./components/ThreadFetcher/ThreadFetcher";
import SubmissionThreads from "./components/SubmissionThreads";

class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <MuiThemeProvider>
          <div className="App">
            <div className="App-header">
              <Flexbox flexDirection='row'>
                <img src={snoo} className="App-logo" alt="logo"/>
                <h2 onClick={() => window.open('https://www.reddit.com/r/songaweek/')} className='App-title'>The Song A Week Challenge</h2>
              </Flexbox>
            </div>
            <ThreadFetcher/>
            <SubmissionThreads/>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
