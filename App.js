// App.js
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Player from './components/player';
import backG from './assets/618cff3e20616-large.jpg'
import Platform from './components/platform';

const { width, height } = Dimensions.get('window');
const gravity = 1.5;

export default function App() {
  const [player] = useState({
    position: { x: 100, y: 100 },
    velocity: { x: 0, y: 0 },
    width: 30,
    height: 30,
  });

  const [platform]= useState( {
    position: { x: width - width / 2, y: height - 20 },
    width: width / 2,
    height: 20,
  });

 

  return (
    <View styles= {styles.container}>
    <ImageBackground source={backG} style={styles.backgroundImage}>
      <Player player={player} platform={platform}/>
      <Platform player={player} platform={platform}/>
      
    </ImageBackground>
    <Image source={backG} styles={styles.backG}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  backG:{
    width : 100,
    height: 100,
   
  },
  backgroundImage: {
    height: 300,
    position: 'relative',
    bottom: 0,
    width: width,
    height: height,
  },
});


//MULTIPLE JUMPS 
  /*
  jump = () => {
  const { player } = this.state;
  const { velocity } = player;

  velocity.y = -20;
  this.setState({ player: { ...player, velocity } });
};
*/