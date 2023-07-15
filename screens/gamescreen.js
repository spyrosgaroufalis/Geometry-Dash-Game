import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View , Alert, Vibration} from 'react-native';
import Player from '../components/player';
import backG from '../assets/618cff3e20616-large.jpg';
import Platform from '../components/platform';
import Spike from '../components/spikes';

const { width, height } = Dimensions.get('window');
const gravity = 1.5;

export default function GameScreen() {
  const [player] = useState({
    position: { x: 100, y: 100 },
    velocity: { x: 0, y: 0 },
    width: 30,
    height: 30,
  });

  const [platforms, setPlatforms] = useState([
    {
      position: { x: width - width / 2, y: height - 20 },
      width: width / 2,
      height: 20,
      startTime: 0,
    },
    {
      position: { x: width, y: height - 50 },
      width: width / 3,
      height: 20,
      startTime: 5000,
    },
  ]);

  const [spikes, setSpikes] = useState([
    {
      position: { x: width - width / 3, y: height - 50 },
      width: 100,
      height: 100,
      startTime: 0,
    },
    {
      position: { x: width + width / 2, y: height - 25 },
      width: 10,
      height: 10,
      startTime: 5000,
    },
  ]);

  

  const stopAnimations = () => {
    setPlatforms([]);
    setSpikes([]);
    Vibration.vibrate();
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground source={backG} style={styles.backgroundImage}>
        <Player player={player} platforms={platforms} />
        {platforms.map((platform, index) => (
          <Platform key={index} player={player} platform={platform} stopAnimations={stopAnimations} />
        ))}
        {spikes.map((spike, index) => (
          <Spike key={index} player={player} spike={spike} stopAnimations={stopAnimations} />
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

