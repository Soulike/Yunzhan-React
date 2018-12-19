import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === ActionTypes.LOGIN_SUCCEED || type === ActionTypes.LOGIN_STATE_VALID)
    {
        return {
            ...state,
            hasLoggedIn: true
        };
    }
    else if (type === ActionTypes.LOGIN_FAILED || type === ActionTypes.LOGIN_STATE_INVALID)
    {
        return {
            ...state,
            hasLoggedIn: false
        };
    }
    else
    {
        return state;
    }
}
