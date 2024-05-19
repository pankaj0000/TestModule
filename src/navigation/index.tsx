import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TRootStack} from '../types/navigation/stack.types';
import AuthNavigator from './authNavigator/AuthNavigator';
import MainNavigator from './mainNavigator/MainNavigator';
import {auth} from '../services/auth.service';
import {useUserInfo} from '../Context/UserProvider';
import {useNavigation} from '@react-navigation/native';
import {TRootStackProp} from '../types/navigation/stackProps.types';
import {getNotificationPermission} from '../utils/permission.utils';

const RootStack = createNativeStackNavigator<TRootStack>();

export default function RootNavigator() {
  const {setUser} = useUserInfo();

  const navigation = useNavigation<TRootStackProp['navigation']>();
  useEffect(() => {
    getNotificationPermission();
    const subscriber = auth().onAuthStateChanged(user => {
      if (user?.email) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'main',
            },
          ],
        });
      }
    });
    return subscriber;
  }, []);
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name={'auth'} component={AuthNavigator} />
      <RootStack.Screen name={'main'} component={MainNavigator} />
    </RootStack.Navigator>
  );
}
