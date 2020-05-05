import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Incidents from './pages/incidents'
import Detail from './pages/detail'

const AppStack = createStackNavigator()
const AppRoute = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="Incidents" component={Incidents} />
      <AppStack.Screen name="Details" component={Detail} />
    </AppStack.Navigator>  
  );
}

export default AppRoute;