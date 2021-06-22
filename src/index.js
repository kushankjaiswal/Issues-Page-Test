import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from '../src/redux/store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
