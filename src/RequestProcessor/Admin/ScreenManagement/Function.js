import Functions from '../../../Function';
import {adminPrefix} from '../Functions';

const {removePrependSlashes} = Functions;

export function screenManagementPrefix(url)
{
    url = removePrependSlashes(url);
    return adminPrefix(`/screenManagement/${url}`);
}
