import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants'

import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'

// import { Container } from './styles';

const register = () => {
  const [state, setState] = useState({
    name:'',
    email:'',
    whatsapp:'',
    city:'',
    uf:'',
  })

  const navigation = useNavigation()

  function navigateToLogin(incident){
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image source={logoImg}/>
        <View style={styles.inputs}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Faça seu cadastro!</Text>

            <Text style={styles.inputText}>Nome</Text>
            <TextInput style={styles.input} placeholder="Digite seu nome ou nome da ONG ..." />

            <Text style={styles.inputText}>Email</Text>
            <TextInput style={styles.input} placeholder="Digite seu email ..." />

            <Text style={styles.inputText}>Whatsapp</Text>
            <TextInput style={styles.input} placeholder="Digite seu Whatsapp ..." />

            <Text style={styles.inputText}>Cidade</Text>
            <TextInput style={styles.input} placeholder="Digite sua cidade ..." />

            <Text style={styles.inputText}>Estado</Text>
            <TextInput style={styles.input} placeholder="Digite sua cidade ..." />
          
            <Text style={styles.inputText}>Senha</Text>
            <TextInput style={styles.input} placeholder="Digite sua senha ..." secureTextEntry={true} />

            <Text style={styles.inputText}>Confirmar Senha</Text>
            <TextInput style={styles.input} placeholder="Digite sua senha ..." secureTextEntry={true} />

            <TouchableOpacity style={styles.login} >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.link} onPress={navigateToLogin} >
              <Text style={styles.linkText}>Faça seu Login!</Text>
            </TouchableOpacity>

          </ScrollView>

          
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
    alignItems:'center'
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
  },
  title:{
    fontSize: 22,
    marginBottom: 16,
    marginTop: 10,
    color: '#13131a',
    fontWeight:'bold'
  }
})

export default register;