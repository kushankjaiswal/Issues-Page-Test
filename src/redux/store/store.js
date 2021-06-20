import rootReducer from '../../redux/reducers/index';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    composeWithDevTools(
      applyMiddleware(...middleware)
    ))
);

export default store;