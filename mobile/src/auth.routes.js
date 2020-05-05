import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Login from './pages/login'
import Register from './pages/register'

const AuthStack = createStackNavigator()
const AuthRoute = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>  
  );
}

export default AuthRoute;