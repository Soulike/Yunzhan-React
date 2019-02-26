import Functions from '../../../Function';
import {adminPrefix} from '../Functions';

const {removePrependSlashes} = Functions;

export function resourcePackManagementPrefix(url)
{
    url = removePrependSlashes(url);
    return adminPrefix(`/resourcePackManagement/${url}`);
}
