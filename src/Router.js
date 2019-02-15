import React from 'react';
import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
import {itemIdToUrl, itemIdToView, MENU_ITEM_ID} from './Pages/Root/Components/Menu/MenuItems';
// 所有页面的 View 在此处导入
import {Functions as LoginFunctions, View as Login} from './Pages/Login';
import {View as SignUp} from './Pages/SignUp';
import {View as ForgetPassword} from './Pages/ForgetPassword';
import {View as Root} from './Pages/Root';

const {requireLogin} = LoginFunctions;
//const requireLogin = null;


const Routes = () => (
    <Router history={browserHistory}>
        <Route path='/'>
            <IndexRedirect to={'/admin'} />
            <Route path={'/login'} component={Login} />
            <Route path={'/signUp'} component={SignUp} />
            <Route path={'/forgetPassword'} component={ForgetPassword} />
        </Route>
        <Route path='/admin' component={Root} onEnter={requireLogin}>
            <IndexRedirect to={itemIdToUrl[MENU_ITEM_ID.OVERVIEW]} />
            {
                itemIdToUrl.map((url, id) => <Route path={url}
                                                    component={itemIdToView[id]}
                                                    onEnter={requireLogin}
                                                    key={id} />)
            }
        </Route>
    </Router>
);

export default Routes;
