import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer' 

import styles from './style'
import logoImg from '../../assets/logo.png'

export default function Detail() {

    const navigation = useNavigation()
    const route = useRoute();
    const incident = route.params.incident
    const message = `Olá, ${incident.name}! Estou entrnado em contato pois gostaria de ajudar no caso: ${incident.title}`
    function navigateBack(){
        navigation.goBack()
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body:message
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=+${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Image source={logoImg}/>

                <TouchableOpacity
                    onPress={navigateBack}
                >
                    <Feather name="arrow-left" size={28} color="#E82041"></Feather>
                </TouchableOpacity>

            </View>
            <Text style={styles.authText}>Developed by <Text style={styles.authTextBold}>Luis Rodrigues</Text></Text>

            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{incident.name} de {incident.city} - {incident.uf}</Text>

              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{incident.title}</Text>

              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value)}
              </Text>
            </View>

            <View style={styles.incident}>
                <Text style={styles.heroTitle}>Savle o dia!</Text>
                <Text style={styles.heroTitle}>Seja o Heroi desse caso</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}
