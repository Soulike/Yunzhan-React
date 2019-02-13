import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import NAMESPACE from './Namespace';
import thunk from 'redux-thunk';
// import 所有 Reducer
import {Reducer as LoginReducer} from './Pages/Login';
import {Reducer as RootMenuReducer} from './Pages/Root/Components/Menu';
import {Reducer as ScreenListCardReducer} from './Pages/ScreenManagement/Components/ScreenListCard';
import {Reducer as ScreenManagementResourcePackListReducer} from './Pages/ScreenManagement/Components/ScreenListCard/Components/ResourcePackList';

// Store 中的初始值，根据开发需要进行改变
const initValues = {
    Login: {
        hasLoggedIn: false,
    },
    RootMenu: {
        currentActiveItemId: 0,
    },
    ScreenListCard: {
        selectedScreenIdSet: new Set(),
        [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: [
            /*{
                [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: 1,
                [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: 'adwada',
                [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: 'dwaawdawd',
                [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.IS_RUNNING]: true,
                [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_ID]: 1,
                [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_NAME]: 'pack',
            },
            {
                [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: 2,
                [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: 'awdaad',
                [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: 'awdawdwad',
                [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.IS_RUNNING]: false,
            },*/
        ],
    },
    ScreenManagementResourcePackList: {
        selectedResourcePackId: null,
    },
};

// 所有中间件放在此处
const middleWares = [thunk];

const storeEnhancers = compose(
    applyMiddleware(...middleWares),
);

// 所有 Reducer 放在此处
const Reducer = combineReducers({
    Login: LoginReducer,
    RootMenu: RootMenuReducer,
    ScreenListCard: ScreenListCardReducer,
    ScreenManagementResourcePackList: ScreenManagementResourcePackListReducer,
});

export default createStore(Reducer, initValues, storeEnhancers);
