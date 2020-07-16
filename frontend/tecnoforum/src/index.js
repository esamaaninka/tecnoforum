import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import rootReducer from './reducers/';

// composeEnhancers is here for Redux devTools. Install extension in your browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/serviceWorker.js')
//     .then(function () {
//       console.log('Service worker registered!');
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }
