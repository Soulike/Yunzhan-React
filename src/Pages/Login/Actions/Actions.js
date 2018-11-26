import * as ActionTypes from './ActionTypes';
import {browserHistory} from 'react-router';
import {postAsync, requestPrefix} from '../../../Static/Functions';
import {View as Alert} from '../../../Components/Alert';

export function login(email, password)
{
    return async (dispatch) =>
    {
        postAsync(requestPrefix('/login'), {
            email,
            password
        })
            .then(res =>
            {
                const {isSuccess, msg} = res;
                if (isSuccess)
                {
                    dispatch(loginSucceed());
                    browserHistory.push('/');
                }
                else
                {
                    dispatch(loginFailed());
                    Alert.show(msg, false);
                }
            })
            .catch(e =>
            {
                Alert.show('登录失败', false);
                console.log(e);
            });
    };
}

export function loginSucceed()
{
    return {
        type: ActionTypes.LOGIN_SUCCEED
    };
}

export function loginFailed()
{
    return {
        type: ActionTypes.LOGIN_FAILED
    };
}

export function setOnline()
{
    return {
        type: ActionTypes.SET_ONLINE
    };
}

export function setOffline()
{
    return {
        type: ActionTypes.SET_OFFLINE
    };
}
