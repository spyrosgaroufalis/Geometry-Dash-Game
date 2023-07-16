import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground } from 'react-native';
import backG from '../assets/618cff3e20616-large.jpg';
import { Animated } from 'react-native';

const Stack = createStackNavigator();

const Homescreen = ({ navigation }) => {
 
  const handleAye = () => {
    // authenticate user and navigate to Root screen if successful
      // add authentication logic here
      if (navigation) {
        navigation.navigate('gamescreen');
      }
  };

  const handleOptions = () => {
    //option list
  }

  return (
    <ImageBackground source={backG} style={styles.backgroundImage}>
      <View style={styles.progressBar}>
        
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome to Geometry Dash !</Text>
        </View>
        <View style={styles.content}>
          
            <>
              <View style={styles.spinnerContainer}>
                <Text style={styles.spinnerText}>Are you ready?</Text>
               
              </View>
              
              <TouchableOpacity style={styles.button} onPress={handleAye}>
                <Text style={styles.buttonText}>Aye Aye </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleOptions}>
                <Text style={styles.buttonText}>Options</Text>
              </TouchableOpacity>
            </>
         
        
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  
  header: {
    height: 80,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    backgroundColor: '#4e92bf',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    minWidth: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    minWidth: 200,
    backgroundColor: 'white',
  },
 
  spinnerText: {
    fontSize: 18,
    color: 'white',
  },
  
});

export default Homescreen;  