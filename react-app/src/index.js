import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {setup, signIn} from './soundcloud/soundcloud';

setup();
signIn();


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
