import Overview from './Overview';
import ScreenManagement from './ScreenManagement';
import AdvertisementManagement from './AdvertisementManagement';
import TagManagement from './TagManagement';
import ResourcePackManagement from './ResourcePackManagement';

export default {
    ...Overview,
    ...ScreenManagement,
    ...AdvertisementManagement,
    ...TagManagement,
    ...ResourcePackManagement,
};
