import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      password:'',
    }
  }
  login = async (email,password)=>{
    if(email && password){
      try{
        const response = firebase.auth().createUserWithEmailAndPassword(email, password)
        if(response){
          this.props.navigation.navigate('WriteStory')
        }
      }
      catch (error){
        switch(error.code){
          case 'usser not found':Alert.alert("usser is not valid")
          break
          case 'invalid email':Alert.alert("enter the correct email or passward")
          break
        }
      }
    }
    else{
      Alert.alert("enter email and password")
    }
  }
  render(){
    return(
      <KeyboardAvoidingView style={{background:'#3a6381'}}>
        <View style={{alignItems:'center', background:'#3a6381'}}>
          <Text style={{fontSize:30, color:'black', marginTop:100,marginBottom:30}}>Bedtime Stories</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <TextInput
            style={styles.inputText}
            placeholder="ABC@example.com"
            keyboardType="email-adress"
            onChangeText={(text)=>{
              this.setState({
              emailId: text
              })
            }}
          />
          <TextInput
            style={styles.inputText}
            placeholder="enter password"
            secureTextEntry={true}
            onChangeText={(text)=>{
              this.setState({
              password: text
              })
            }}
          />
        </View>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={()=>{
              this.login(this.state.emailId, this.state.password)
            }}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  inputText:{
    borderWidth:1.5,
    marginTop:20,
    width:220,
    height:50,
    borderRadius:10,
    textAlign:'center',
    backgroundColor:'white',
  },
  loginButton:{
    width:220,
    height:30,
    backgroundColor:'#28455a',
    marginTop:40,
    borderRadius:7,
    borderColor:'white',
  },
  text:{
    textAlign:'center',
    padding:5,
    fontWeight:'bold',
    color:'white',
  }
})