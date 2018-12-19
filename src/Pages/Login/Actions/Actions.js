import * as ActionTypes from './ActionTypes';
import {browserHistory} from 'react-router';
import {postAsync} from '../../../Static/Functions';
import {View as Alert} from '../../../Components/Alert';
import {accountRequestPrefix} from '../../../Static/AccountShare/AccountShare';
import {STATUS_CODE} from '../../../Static/Constants';

export function login(email, password)
{
    return async (dispatch) =>
    {
        postAsync(accountRequestPrefix('/login'), {
            email,
            password
        })
            .then(res =>
            {
                const {code} = res;
                if (code === STATUS_CODE.SUCCESS)
                {
                    dispatch(loginSucceed());
                    browserHistory.push('/');
                }
                else
                {
                    dispatch(loginFailed());

                    if (code === STATUS_CODE.REJECTION)
                    {
                        Alert.show('密码错误', false);
                    }
                    else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
                    {
                        Alert.show('用户不存在', false);
                    }
                    else if (code === STATUS_CODE.WRONG_PARAMETER)
                    {
                        Alert.show('参数无效', false);
                    }
                    else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
                    {
                        Alert.show('服务器错误', false);
                    }
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

export function loginStateValid()
{
    return {
        type: ActionTypes.LOGIN_STATE_VALID
    };
}

export function loginStateInvalid()
{
    return {
        type: ActionTypes.LOGIN_STATE_INVALID
    };
}
