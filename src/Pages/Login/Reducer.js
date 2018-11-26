import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === ActionTypes.LOGIN_SUCCEED || type === ActionTypes.SET_ONLINE)
    {
        return {
            ...state,
            hasLoggedIn: true
        };
    }
    else if (type === ActionTypes.LOGIN_FAILED || type === ActionTypes.SET_OFFLINE)
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
