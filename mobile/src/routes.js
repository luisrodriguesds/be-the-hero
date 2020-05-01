import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const AppStack = createStackNavigator()

import Inscidents from './pages/incidents'
import Detail from './pages/detail'

export default function Routes(){
  return (
    <NavigationContainer>
      
      <AppStack.Navigator screenOptions={{headerShown: false}}>

        <AppStack.Screen name="Incidents" component={Inscidents} />
        <AppStack.Screen name="Details" component={Detail} />

      </AppStack.Navigator>
      
    </NavigationContainer>
  )
}