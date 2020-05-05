import React, {useContext} from 'react'
import {View, ActivityIndicator} from 'react-native'

import AuthContext from './contexts/auth'
import AuthRoute from './auth.routes'
import AppRoute from './app.routes'

export default function Routes(){
  const {signed, loading} = useContext(AuthContext)

  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

  return signed ?  <AppRoute /> :  <AuthRoute />
}