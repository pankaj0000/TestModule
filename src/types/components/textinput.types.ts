import {StyleProp, ViewStyle} from 'react-native';

export type TTextInput = {
  value: string;
  onChange(text: string): void;
  placeholder?: string;
  secureText?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
  caption?: string;
};
