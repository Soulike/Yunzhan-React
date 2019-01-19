import Functions from '../../../Functions';
import {adminPrefix} from '../Functions';

const {removePrependSlashes} = Functions;

export function screenManagementPrefix(url)
{
    url = removePrependSlashes(url);
    return adminPrefix(`/admin/${url}`);
}
