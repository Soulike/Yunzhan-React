import React from 'react';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
// 所有页面的 View 在此处导入
import {View as Login} from './Pages/Login';
import {View as SignUp} from './Pages/SignUp';
import {View as ForgetPassword} from './Pages/ForgetPassword';
import {View as Root} from './Pages/Root';


const Routes = () => (
    <Router history={browserHistory}>
        <Route path='/'>
            <IndexRoute component={Login}/>
            <Route path={'/login'} component={Login}/>
            <Route path={'/signUp'} component={SignUp}/>
            <Route path={'/forgetPassword'} component={ForgetPassword}/>
        </Route>
        <Route path='/' component={Root}>
        </Route>
    </Router>
);

export default Routes;
