import React,{useEffect, useState} from 'react';
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Text, Image, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'
import {useAuth} from '../../contexts/auth'

import logoImg from '../../assets/logo.png'
import styles from './style'

export default function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const {signOut, user} = useAuth()
  const navigation = useNavigation()

  function navigateToDetail(incident){
    navigation.navigate('Details', { incident })
  }

  async function loadIncidents(){
    if (loading) {
      return ;
    }

    if (total > 0 && incidents.length === total) {
      return ;
    }

    setLoading(true)
    const response = await api.get('/incidents?page='+page)
    setIncidents([...incidents, ...response.data.data])
    setTotal(response.data.total)
    setPage(page+1)
    setLoading(false)
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  return (
      <View style={styles.container}>

        <View style={styles.header}>

          <Image source={logoImg}/>

          <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}>{total} casos</Text>
          </Text>
          <TouchableOpacity onPress={signOut}>
            <Text style={{color:"#e02041"}}>Sair</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.authText}>Developed by <Text style={styles.authTextBold}>Luis Rodrigues</Text></Text>

        <Text style={styles.title}>Bem Vindo, {user?.name}!</Text>
        <Text style={styles.description}>Escolha um dos casos abaixos e salve o dia</Text>

        <FlatList 
          style={styles.incidentList}
          data={incidents}
          keyExtractor={incident => String(incident.id)}
          showsVerticalScrollIndicator={false}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.1}
          renderItem={({item: incident})=> (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{incident.name}</Text>

              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{incident.title}</Text>

              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value)}
              </Text>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigateToDetail(incident)}
              >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#E02041" />
              </TouchableOpacity>
            </View>
          )}
        />

      </View>
    );
}
