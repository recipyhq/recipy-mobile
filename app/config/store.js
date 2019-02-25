import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const middleWare = [sagaMiddleware, thunk];

if (process.env.NODE_ENV === 'development') {
  middleWare.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleWare));
sagaMiddleware.run(rootSaga);

export default store;
