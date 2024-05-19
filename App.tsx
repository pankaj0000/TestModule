import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import UserProvider from './src/Context/UserProvider';

export default function App() {
  return (
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <UserProvider>
          <RootNavigator />
        </UserProvider>
      </ApplicationProvider>
    </NavigationContainer>
  );
}
