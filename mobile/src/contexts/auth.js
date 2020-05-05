import React,{createContext, useState, useEffect, useContext} from 'react'
import {AsyncStorage} from 'react-native'
import * as auth from '../services/auth'
import api from '../services/api'

const AuthContext = createContext({signed:true})

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function loadStorage(){
      const storeUser = await AsyncStorage.getItem('@Auth:user')
      const storeToken = await AsyncStorage.getItem('@Auth:token')
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (storeToken && storeUser) {
        api.defaults.headers.authorization = `Bearer ${storeToken}`
        setUser(JSON.parse(storeUser))
      }
      setLoading(false)
    }
    loadStorage()
  }, [])

  async function signIn(){
    const response = await auth.signIn()
    setUser(response.user)

    api.defaults.headers.authorization = `Bearer ${response.token}`
    await AsyncStorage.setItem('@Auth:user', JSON.stringify(response.user))
    await AsyncStorage.setItem('@Auth:token', response.token)
  }

  function signOut(){
    AsyncStorage.clear().then(() => {
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider value={{signed:!!user, user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

export function useAuth(){
  const context = useContext(AuthContext)
  return context
}