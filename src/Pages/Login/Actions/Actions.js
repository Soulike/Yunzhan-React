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

function loginSucceed()
{
    return {
        type: ActionTypes.LOGIN_SUCCEED
    };
}

function loginFailed()
{
    return {
        type: ActionTypes.LOGIN_FAILED
    };
}
