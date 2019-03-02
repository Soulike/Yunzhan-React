import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
// import 所有 Reducer
import {Reducer as LoginReducer} from './Pages/Login';
import {Reducer as RootMenuReducer} from './Pages/Root/Components/Menu';
import {Reducer as ScreenListCardReducer} from './Pages/ScreenManagement/Components/ScreenListCard';
import {Reducer as ScreenManagementResourcePackListReducer} from './Pages/ScreenManagement/Components/ScreenListCard/Components/ResourcePackList';
import {Reducer as ScreenManagementReducer} from './Pages/ScreenManagement';
import {Reducer as AdvertisementManagementReducer} from './Pages/AdvertisementManagement';
import {Reducer as TagManagementReducer} from './Pages/TagManagement';
import {Reducer as ResourceManagementReducer} from './Pages/ResourcePackManagement';

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
    },
    ScreenManagementResourcePackList: {
        selectedResourcePackId: null,
    },
    ScreenManagement: {
        basicInfo: {},
        logList: [],
        screenList: [],
        resourcePackList: [],
    },
    AdvertisementManagement: {
        basicInfo: {},
        advertisementList: [],
    },
    TagManagement: {
        basicInfo: {},
        tagList: [],
    },
    ResourcePackManagement: {
        basicInfo: {},
        resourcePackList: [],
        selectedTagIdSet: new Set(),
        selectedAdvertisementIdSet: new Set(),

        resourcePackSelectedTagIdSet: new Set(),// 特定资源包当前在编辑Modal中选中的标签ID
        resourcePackSelectedAdvertisementIdSet: new Set(),// 特定资源包当前在编辑Modal中选中的广告ID
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
    ScreenManagement: ScreenManagementReducer,
    AdvertisementManagement: AdvertisementManagementReducer,
    TagManagement: TagManagementReducer,
    ResourcePackManagement: ResourceManagementReducer,
});

export default createStore(Reducer, initValues, storeEnhancers);
