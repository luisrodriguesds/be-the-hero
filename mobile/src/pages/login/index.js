import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants'
import Input from '../../components/Input'
import logoImg from '../../assets/logo.png'
import {useAuth} from '../../contexts/auth'
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'

// import { Container } from './styles';

const login = () => {

  const [error, setError] = useState({
    error:false,
    field:'',
    message:''
  })

  const formRef = useRef(null)
  const navigation = useNavigation()

  const {signIn} = useAuth()

  function navigateToRegister(){
    navigation.navigate('Register')
  }

  async function handleSingIn(data, { reset }){
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um email válido')
          .required('Campo obrigatório'),
        password: Yup.string().required('Campo Obrigatório')
      })
      await schema.validate(data, {
        abortEarly: false
      })

      const response = await signIn(data.email, data.password)
      if (response.error) {
        setError({
          error:true,
          field:response.field,
          message:response.message
        })
      }
      setError({error:false})
      formRef.current.setErrors({})

    } catch (error) {
      if(error instanceof Yup.ValidationError){
        console.log(error)
        const errorMessages = {}
        error.inner.forEach(erro => {
          errorMessages[erro.path] = erro.message
        })
        formRef.current.setErrors(errorMessages)
      }
    }

    
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image source={logoImg}/>
        <View style={styles.inputs}>
          {error.error && Alert.alert(`${error.field}`, `${error.message}`)}
          <Form ref={formRef} onSubmit={handleSingIn}>
            <Input 
              label="Email"
              name="email" 
              placeholder="Digite seu email ..."
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Input 
              label="Password" 
              name="password" 
              placeholder="Digite seu password ..." 
              secureTextEntry={true}
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.login} onPress={() => formRef.current.submitForm()} >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </Form>

          <TouchableOpacity 
            style={styles.link} 
            onPress={() => navigateToRegister()}

            >
            <Text style={styles.linkText}>Faça seu cadastro!</Text>
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.wrapDev}>
        <Text style={styles.textDev}>Developed by <Text style={{fontWeight:'bold'}}>Luis Rodrigues</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:24,
    paddingTop: Constants.statusBarHeight+20
  },
  body:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputs:{
    width: '100%',
    marginVertical:40 
  },
  login:{
    backgroundColor: '#e02041',
    borderRadius: 8,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },
  loginText:{
    color:"#fff",
    fontSize: 15,
    fontWeight: 'bold'
  },
  link:{
    alignItems:'center',
    marginTop: 30,
  },
  linkText:{
    color:'#e02041',
    fontWeight: 'bold'
  },
  wrapDev:{
    justifyContent:'center',
    alignSelf: 'stretch',
    flexDirection:'row',
    marginVertical:10
  },
  textDev:{
    color:"#737380",
    alignSelf:'stretch'
  }
})

export default login;