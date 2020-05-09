import api from './api'

export async function signIn(email, password){

  try {
    const response = await api.post('/sessions', {email, password})
    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      return {...error.response.data[0], error:true} 
    }
  }
}