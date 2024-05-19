import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {TAuthStack} from '../../types/navigation/stack.types';
import Login from '../../screens/auth/Login';
import Signup from '../../screens/auth/Signup';

const AuthStack = createNativeStackNavigator<TAuthStack>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={'login'} component={Login} />
      <AuthStack.Screen name={'signup'} component={Signup} />
    </AuthStack.Navigator>
  );
}
