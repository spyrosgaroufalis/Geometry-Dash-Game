import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View , Alert, Vibration} from 'react-native';
import Player from '../components/player';
import backG from '../assets/618cff3e20616-large.jpg';
import Platform from '../components/platform';
import Spike from '../components/spikes';
import Portal from '../components/portal'; 

const { width, height } = Dimensions.get('window');
const gravity = 1.5;

export default function GameScreen() {
  const ONE_SECOND_IN_MS = 1000;
  const [player] = useState({
    position: { x: 100, y: 100 },
    velocity: { x: 0, y: 0 },
    width: 30,
    height: 30,
  });

  const [platforms, setPlatforms] = useState([
    {
      position: { x: width - width / 2, y: height - 20 },
      width: width / 5,
      height: 20,
      startTime: 0,
    },
    {
      position: { x: width, y: height - 50 },
      width: width / 3,
      height: 20,
      startTime: 5000,
    },
    {
      position: { x: width, y: height - 60 },
      width: width / 5,
      height: 20,
      startTime: 7000,
    },
   
  ]);

  const [spikes, setSpikes] = useState([
    {
      position: { x: width - width / 4, y: height - 25 },
      width: 10,
      height: 10,
      startTime: 0,
    },
    {
      position: { x: width + width / 2, y: height - 25 },
      width: 10,
      height: 10,
      startTime: 7000,
    },
    
  ]);

  //not array
  const [portal, setPortal] = useState([
    
    {
      position: { x: width, y: height - 100 },
      width: 100,
      height: 100,
      //width: width / 3,
    //  height: 20, //i think from the portal.js is more important
      startTime: 5000,
    },
  ]
  );

  

  const stopAnimations = () => {
    setPlatforms([]);
    setSpikes([]);
    setPortal([]);

    Vibration.vibrate(ONE_SECOND_IN_MS);
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground source={backG} style={styles.backgroundImage}>
        <Player player={player} platforms={platforms} spikes={spikes} portal={portal} />
        {platforms.map((platform, index) => (
          <Platform key={index} player={player} platform={platform} stopAnimations={stopAnimations} />
        ))}
        {spikes.map((spike, index) => (
          <Spike key={index} player={player} spike={spike} stopAnimations={stopAnimations} />
        ))}
        
        {portal.map((portal, index) => (
  <Portal key={index} player={player} portal={portal} platforms={platforms} spikes={spikes} stopAnimations={stopAnimations}/>
        ))}
      
      </ImageBackground>
      <Image source={backG} style={styles.backG} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backG: {
    width: '100%',
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