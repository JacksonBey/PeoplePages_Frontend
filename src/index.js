import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/manageUsersAndPosts.js';
import { BrowserRouter} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ 
    }) : compose;


const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const store = createStore(rootReducer, enhancer);




ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App store={store}/>
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);


