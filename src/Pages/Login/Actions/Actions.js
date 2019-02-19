import * as ActionTypes from './ActionTypes';
import RequestProcessors from '../../../RequestProcessor';

export function login(email, password)
{
    return async (dispatch) =>
    {
        return RequestProcessors.sendPostLoginRequestAsync(dispatch, loginSucceed, loginFailed, email, password);
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
