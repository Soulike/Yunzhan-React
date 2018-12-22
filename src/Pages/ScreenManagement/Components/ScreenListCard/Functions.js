import * as Actions from './Actions/Actions';
import Store from '../../../../Store';

export function refreshScreenList()
{
    Store.dispatch(Actions.getScreenList());
}