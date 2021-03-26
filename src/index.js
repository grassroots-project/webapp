import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const config = {
  apiKey: "AIzaSyDrB5oSgmAB-OcHZwzvuXNX-F8Lmn0zS8U",
  authDomain: "fund-project-8a61a.firebaseapp.com",
  databaseURL: "https://fund-project-8a61a.firebaseio.com",
  projectId: "fund-project-8a61a",
  storageBucket: "fund-project-8a61a.appspot.com",
  messagingSenderId: "1022545583669"
};
// Initialize Firebase
firebase.initializeApp(config);

ReactDOM.render((
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
