import * as ActionTypes from './ActionTypes';
import RequestProcessors from '../../../RequestProcessor';
import {setOnline} from '../Functions';
import {browserHistory} from 'react-router';

export function login(email, password)
{
    return async dispatch =>
    {
        const requestIsSuccessful = await RequestProcessors.sendPostLoginRequestAsync(email, password);
        if (requestIsSuccessful)
        {
            dispatch(loginSucceed());
            setOnline();
            browserHistory.push('/');
        }
        else
        {
            dispatch(loginFailed());
        }
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
