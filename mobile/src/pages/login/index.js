import React from 'react';
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'

import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import {useAuth} from '../../contexts/auth'

import { useNavigation } from '@react-navigation/native'

// import { Container } from './styles';

const login = () => {
  const navigation = useNavigation()

  const {signed, user, signIn} = useAuth()
  console.log(signed, user)

  function navigateToRegister(incident){
    navigation.navigate('Register', { incident })
  }

  async function handleSingIn(){
    await signIn()
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image source={logoImg}/>
        <View style={styles.inputs}>
          
          <Text style={styles.inputText}>Email</Text>
          <TextInput style={styles.input} placeholder="Digite seu email ..." />
        
          <Text style={styles.inputText}>Senha</Text>
          <TextInput style={styles.input} placeholder="Digite sua senha ..." secureTextEntry={true} />

          <TouchableOpacity style={styles.login} onPress={handleSingIn} >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

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
  inputText:{
    fontSize:16,
    fontWeight: 'bold',
    color:"#000",
    marginBottom:5
  },
  input:{
    height:48,
    backgroundColor:'#f9f9f9',
    borderRadius:8,
    paddingVertical:8,
    paddingHorizontal:10,
    borderColor:'#eee',
    borderWidth:1,
    marginBottom:20
  },
  login:{
    backgroundColor: '#e02041',
    borderRadius: 8,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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