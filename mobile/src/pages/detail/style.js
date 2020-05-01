import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:24,
    paddingTop: Constants.statusBarHeight+20
  },
  header:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText:{
    fontSize: 15,
    color: '#737380',
  },
  headerTextBold:{
    fontWeight:'bold'
  },
  authText:{
    fontSize:10,
    color: '#737380'
  },
  authTextBold:{
    fontWeight: 'bold'
  },
  title:{
    fontSize: 30,
    marginBottom: 16,
    marginTop: 30,
    color: '#13131a',
    fontWeight:'bold'
  },
  description:{
    fontSize:16,
    lineHeight:24,
    color: '#737380'
  },
  incidentList:{
    marginTop: 32
  },
  incident:{
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
    marginTop: 20
  },
  incidentProperty:{
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold'
  },
  incidentValue:{
    marginTop: 5,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380'
  },

  heroTitle:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#13131a',
    lineHeight:30
  },

  heroDescription:{
    fontSize:15,
    color:'#737380',
    marginTop: 16
  },

  actions:{
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  action:{
    backgroundColor: '#e02041',
    borderRadius: 8,
    height: 50,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText:{
    color:'#FFF',
    fontSize: 15,
    fontWeight: 'bold'
  }

})