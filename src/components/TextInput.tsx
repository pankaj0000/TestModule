import {Icon, IconElement, Input, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {TTextInput} from '../types/components/textinput.types';

export default function TextInput(props: TTextInput) {
  const {value, onChange, secureText, placeholder, label, style, caption} =
    props;
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (props): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = (): React.ReactElement => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>{caption}</Text>
      </View>
    );
  };

  return (
    <Input
      value={value}
      label={label}
      placeholder={placeholder}
      accessoryRight={secureText ? renderIcon : <></>}
      secureTextEntry={secureText ? secureTextEntry : false}
      caption={caption ? renderCaption : <></>}
      onChangeText={onChange}
      style={[styles.container, style]}
    />
  );
}

const AlertIcon = (props): IconElement => (
  <Icon {...props} name="alert-circle-outline" />
);
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'red',
  },
});
