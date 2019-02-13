import React from 'react';
import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
// 所有页面的 View 在此处导入
import {Functions as LoginFunctions, View as Login} from './Pages/Login';
import {View as SignUp} from './Pages/SignUp';
import {View as ForgetPassword} from './Pages/ForgetPassword';
import {View as Root} from './Pages/Root';
import {View as Overview} from './Pages/Overview';
import {View as ScreenManagement} from './Pages/ScreenManagement';
import {View as AdvertiseManagement} from './Pages/AdvertiseManagement';
import {View as ResourceManagement} from './Pages/ResourceManagement';
import {View as TagManagement} from './Pages/TagManagement';

const {requireLogin} = LoginFunctions;
//const requireLogin = null;


const Routes = () => (
    <Router history={browserHistory}>
        <Route path='/'>
            <IndexRedirect to={'/admin'}/>
            <Route path={'/login'} component={Login}/>
            <Route path={'/signUp'} component={SignUp}/>
            <Route path={'/forgetPassword'} component={ForgetPassword}/>
        </Route>
        <Route path='/admin' component={Root} onEnter={requireLogin}>
            <IndexRedirect to={'/admin/overview'}/>
            <Route path={'/admin/overview'} component={Overview} onEnter={requireLogin}/>
            <Route path={'/admin/screenManagement'} component={ScreenManagement} onEnter={requireLogin}/>
            <Route path={'/admin/advertiseManagement'} component={AdvertiseManagement} onEnter={requireLogin}/>
            <Route path={'/admin/resourceManagement'} component={ResourceManagement} onEnter={requireLogin}/>
            <Route path={'/admin/tagManagement'} component={TagManagement} onEnter={requireLogin}/>
        </Route>
    </Router>
);

export default Routes;
