import {Alert, PermissionStatus, Platform} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  checkMultiple,
  openSettings,
  request,
  requestMultiple,
} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import {BundleStrings} from '../constants/BundleString';

const permissions =
  Number(DeviceInfo.getSystemVersion()) <= 12
    ? [
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]
    : [PERMISSIONS.ANDROID.READ_MEDIA_IMAGES];

const checkPermission = (result: any) =>
  Number(DeviceInfo.getSystemVersion()) <= 12
    ? result['android.permission.READ_EXTERNAL_STORAGE'] == 'granted' &&
      result['android.permission.WRITE_EXTERNAL_STORAGE'] == 'granted'
    : result['android.permission.READ_MEDIA_IMAGES'] == 'granted';

const isIos = Platform.OS === 'ios';

export function checkGalleryPermission(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const permissionCheck = isIos
        ? [PERMISSIONS.IOS.MEDIA_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY]
        : permissions;
      console.log('Permission check', permissionCheck);
      checkMultiple(permissionCheck)
        .then(async response => {
          const permissionStatus = isIos
            ? response['ios.permission.MEDIA_LIBRARY'] &&
              response['ios.permission.PHOTO_LIBRARY']
            : checkPermission(response);
          console.log('Permission', response);
          if (permissionStatus) {
            return resolve(true);
          } else {
            const permissionResponse = await requestPermission(permissionCheck);
            const permissionStatus = isIos
              ? permissionResponse['ios.permission.MEDIA_LIBRARY'] &&
                permissionResponse['ios.permission.PHOTO_LIBRARY']
              : checkPermission(permissionResponse);
            if (permissionStatus) {
              return resolve(true);
            } else {
              for (let key in permissionResponse) {
                if (permissionResponse[key] === RESULTS.BLOCKED) {
                  return AlertBlockPermission('Gallery');
                }
              }
              return resolve(false);
            }
          }
        })
        .catch(err => {
          return reject(err);
        });
    } catch (error) {
      return reject(error);
    }
  });
}

function requestPermission(permissions: any): Promise<PermissionStatus> {
  const permissionRequest = Array.isArray(permissions)
    ? requestMultiple
    : request;
  return new Promise((resolve, reject) => {
    return permissionRequest(permissions)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

export function checkStoragePerimission() {
  const permissionCheck = [
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ];
  return new Promise((resolve, reject) => {
    checkMultiple(permissionCheck).then(async response => {
      if (
        response['android.permission.READ_EXTERNAL_STORAGE'] == 'granted' &&
        response['android.permission.WRITE_EXTERNAL_STORAGE'] == 'granted'
      ) {
        return resolve(true);
      } else {
        const permissionResponse = await requestPermission(permissionCheck);
        if (permissionResponse) {
          return resolve(true);
        } else {
          for (let key in permissionResponse) {
            if (permissionResponse[key] === RESULTS.BLOCKED) {
              return AlertBlockPermission('Gallery');
            }
          }
        }
      }
    });
  });
}

function AlertBlockPermission(permissionName: string) {
  Alert.alert(
    BundleStrings.permissionError.blockTitle,
    `${BundleStrings.permissionError.blockDescription} ${permissionName}`,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('On Press cancel'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => openSettings(),
      },
    ],
  );
}

export async function getNotificationPermission() {
  check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(async response => {
    if (response !== RESULTS.GRANTED) {
      await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    }
  });
}
