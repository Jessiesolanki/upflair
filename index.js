import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { isEmulator } from 'react-native-device-info';
import { initNotifications } from './Src/Utils/NotificationController';

AppRegistry.registerComponent(appName, () => App);


isEmulator().then(emulator => {
    if (emulator && Platform.OS == 'ios') return
    initNotifications()
})
