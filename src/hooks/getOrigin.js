import { getPreferences } from '@api/user/preferences';

const getOrigin = async () => {
    const preferences = await getPreferences();
    if (preferences?.token) {
        return preferences.token;
    }
    return null;
}

export default getToken;
