import React from 'react';
import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
import {ITEM_ID_TO_COMPONENT, ITEM_ID_TO_URL, MENU_ITEM_ID} from './Config/MENU_ITEM';
// 所有页面的 View 在此处导入
import {Function as LoginFunction, View as Login} from './Pages/Login';
import {View as SignUp} from './Pages/SignUp';
import {View as ForgetPassword} from './Pages/ForgetPassword';
import {View as Root} from './Pages/Root';

const {requireLogin} = LoginFunction;

const Routes = () => (
    <Router history={browserHistory}>
        <Route path='/'>
            <IndexRedirect to={'/admin'} />
            <Route path={'/login'} component={Login} />
            <Route path={'/signUp'} component={SignUp} />
            <Route path={'/forgetPassword'} component={ForgetPassword} />
        </Route>
        <Route path='/admin' component={Root} onEnter={requireLogin}>
            <IndexRedirect to={ITEM_ID_TO_URL[MENU_ITEM_ID.OVERVIEW]} />
            {
                ITEM_ID_TO_URL.map((url, id) => <Route path={url}
                                                       component={ITEM_ID_TO_COMPONENT[id]}
                                                       onEnter={requireLogin}
                                                       key={id} />)
            }
        </Route>
    </Router>
);

export default Routes;
