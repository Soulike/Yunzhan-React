import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === ActionTypes.LOGIN_SUCCEED)
    {
        return {
            ...state,
            hasLoggedIn: true
        };
    }
    else if (type === ActionTypes.LOGIN_FAILED)
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
