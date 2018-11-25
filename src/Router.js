import React from 'react';
import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
// 所有页面的 View 在此处导入
import {View as Login} from './Pages/Login';
import {View as SignUp} from './Pages/SignUp';
import {View as ForgetPassword} from './Pages/ForgetPassword';
import {View as Root} from './Pages/Root';

import {requireLogin} from './Pages/Login/Functions';


const Routes = () => (
    <Router history={browserHistory}>
        <Route path='/'>
            <IndexRedirect to={'/admin'}/>
            <Route path={'/login'} component={Login}/>
            <Route path={'/signUp'} component={SignUp}/>
            <Route path={'/forgetPassword'} component={ForgetPassword}/>
        </Route>
        <Route path='/admin' component={Root} onEnter={requireLogin}>

        </Route>
    </Router>
);

export default Routes;
