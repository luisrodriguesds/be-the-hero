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
      
      if (storeToken && storeUser) {
        api.defaults.headers.Authorization = `Bearer ${storeToken}`
        setUser(JSON.parse(storeUser))
      }
      setLoading(false)
    }
    loadStorage()
  }, [])

  async function signIn(email, password){
   
    const response = await auth.signIn(email, password)
    //Error -> Se vier error da requisição
    if (response.error) {
      return response;
    }

    setUser(response.user)

    api.defaults.headers.Authorization = `Bearer ${response.token}`
    // axios.defaults.headers.common['Authorization'] = 'Bearer test';

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