/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  getBackgroundNotification,
  getFcmToken,
} from './src/services/notification.service';

getBackgroundNotification();
getFcmToken();

AppRegistry.registerComponent(appName, () => App);
