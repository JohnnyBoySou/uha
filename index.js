import { registerRootComponent } from "expo";
import App from "./app";
registerRootComponent(App);

/**
 * IOS config
 * 
if (Platform.OS == 'android') {
  registerRootComponent(App);
}
else if (Platform.OS === 'web') {
  global._frameTimestamp = null
}
else {
  AppRegistry.registerComponent(appName, () => App);
}
 */