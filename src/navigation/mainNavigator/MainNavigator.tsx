import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {TMainStack} from '../../types/navigation/stack.types';
import ProfileInfo from '../../screens/main/ProfileInfo';
import {getForegroundNotification} from '../../services/notification.service';

const MainStack = createNativeStackNavigator<TMainStack>();

export default function MainNavigator() {
  useEffect(() => {
    getForegroundNotification();
  }, []);
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name={'profileInfo'} component={ProfileInfo} />
    </MainStack.Navigator>
  );
}
