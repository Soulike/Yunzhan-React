import Functions from '../../../Function';
import {adminPrefix} from '../Functions';

const {removePrependSlashes} = Functions;

export function advertisementPrefix(url)
{
    url = removePrependSlashes(url);
    return adminPrefix(`/advertisementManagement/${url}`);
}
