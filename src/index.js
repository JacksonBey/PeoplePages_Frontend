import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/manageUsersAndPosts.js';
import { BrowserRouter} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App store={store}/>
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);


