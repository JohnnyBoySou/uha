import analytics from '@react-native-firebase/analytics';

export default async function sendStats (event, params) {
    await analytics().logEvent(event, params);
}