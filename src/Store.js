import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
// import 所有 Reducer
import {Reducer as LoginReducer} from './Pages/Login';
import {Reducer as RootMenuReducer} from './Pages/Root/Components/Menu';
import {Reducer as ScreenListCardReducer} from './Pages/ScreenManagement/Components/ScreenListCard';
import {Reducer as ScreenManagementResourcePackListReducer} from './Pages/ScreenManagement/Components/ScreenListCard/Components/ResourcePackList';

// Store 中的初始值，根据开发需要进行改变
const initValues = {
    Login: {
        hasLoggedIn: false
    },
    RootMenu: {
        currentActiveItemId: 0
    },
    ScreenListCard: {
        selectedScreenSet: new Set(),
        screenList: [
            {
                id: 1,
                uuid: 'aaaa',
                name: 'afafafeafaef',
                isRunning: true,
                resourcePackId: 1,
                resourcePackName: 'xxx'
            },
            {
                id: 2,
                uuid: 'aaaa',
                name: 'afafafeafaef',
                isRunning: true,
                resourcePackId: 1,
                resourcePackName: 'xxx'
            },
            {
                id: 3,
                uuid: 'aaaa',
                name: 'afafafeafaef',
                isRunning: true,
                resourcePackId: 1,
                resourcePackName: 'xxx'
            },
            {
                id: 4,
                uuid: 'aaaa',
                name: 'afafafeafaef',
                isRunning: false
            },
            {
                id: 5,
                uuid: 'aaaa',
                name: 'afafafeafaef',
                isRunning: false
            },
            {
                id: 6,
                uuid: 'aaaa',
                name: 'afafafeafaef',
                isRunning: false
            },
            {
                id: 7,
                uuid: 'aaaa',
                name: 'afafafeafaef',
                isRunning: false
            },
            {
                id: 8,
                uuid: 'aaaa',
                name: 'afafafeafaef',
                isRunning: false
            },
            {
                id: 9,
                uuid: 'aaaa',
                name: 'afafafeafaef',
                isRunning: false
            },
        ]
    },
    ScreenManagementResourcePackList: {
        selectedResourcePackId: null
    }
};

// 所有中间件放在此处
const middleWares = [thunk];

const storeEnhancers = compose(
    applyMiddleware(...middleWares)
);

// 所有 Reducer 放在此处
const Reducer = combineReducers({
    Login: LoginReducer,
    RootMenu: RootMenuReducer,
    ScreenListCard: ScreenListCardReducer,
    ScreenManagementResourcePackList: ScreenManagementResourcePackListReducer
});

export default createStore(Reducer, initValues, storeEnhancers);
