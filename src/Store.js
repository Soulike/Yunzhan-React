import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
// import 所有 Reducer
import {Reducer as LoginReducer} from './Pages/Login';

// Store 中的初始值，根据开发需要进行改变
const initValues = {
    Login: {
        hasLoggedIn: false
    }
};

// 所有中间件放在此处
const middleWares = [thunk];

const storeEnhancers = compose(
    applyMiddleware(...middleWares)
);

// 所有 Reducer 放在此处
const Reducer = combineReducers({
    Login: LoginReducer
});

export default createStore(Reducer, initValues, storeEnhancers);
