import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

export async function getForegroundNotification() {
  messaging().onMessage(message => {
    onNotificationMessageReceived(message);
    console.log('FOreground notification', message);
  });
}

export async function getBackgroundNotification() {
  try {
    messaging().setBackgroundMessageHandler(async message => {
      onNotificationMessageReceived(message);
      console.log('getBackgroundNotification', message);
    });
  } catch (error) {
    console.log('Error in receiving back ground notification', error);
  }
}

async function onNotificationMessageReceived(data: any) {
  try {
    await notifee.displayNotification({
      body: data?.notification?.body,
      id: data?.messageId,
      title: data?.notification?.title,
      data: {data: data?.notification, TYPE: 'MESSAGE'},
      android: {
        smallIcon: 'ic_launcher',
        channelId: 'message',
        timestamp: Date.now(),
        showTimestamp: true,
        circularLargeIcon: true,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
        },
      },
    });
  } catch (error) {
    console.error('Eror', error);
  }
}

export function getFcmToken() {
  messaging()
    .getToken()
    .then(response => {
      console.log('Toekn is', response);
    })
    .catch(err => {
      console.error('Error in getting toekn', err);
    });
}
export async function createAllChannels() {
  await notifee.createChannel({
    id: 'message',
    name: 'message',
    lights: false,
    vibration: true,
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });
}
