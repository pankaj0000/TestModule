import Toast from 'react-native-simple-toast';
import {Colors} from '../constants/Colors';

export function ToastMessage(message: string) {
  if (!message) return;
  Toast.show(message, Toast.LONG);
}
