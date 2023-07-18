import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View , Alert, Vibration} from 'react-native';
import Player from '../components/player';
import backG from '../assets/618cff3e20616-large.jpg';
import Platform from '../components/platform';
import Spike from '../components/spikes';
import Portal from '../components/portal'; 
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/homescreen'

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
      position: { x: width + width, y: height - 40 },
      width: width / 3,
      height: 20,
      startTime: 5000,
    },
    {
      position: { x: width + width + 100 , y: height - 60 },
      width: width / 6,
      height: 20,
      startTime: 7000,
    },
    {
      position: { x: width + width - 100, y: height - 20 },
      width: width / 2,
      height: 20,
      startTime: 7000,
    },
    {
      position: { x: width+ width +width, y: height - 20 },
      width: width / 5,
      height: 20,
      startTime: 7000,
    },
    {
      position: { x: width+ width +width +120, y: height - 40 },
      width: width / 5,
      height: 20,
      startTime: 7000,
    },
    {
      position: { x: width+ width +width +240, y: height - 60 },
      width: width / 5,
      height: 20,
      startTime: 7000,
    },
    {
      position: { x: width+ width +width +360, y: height - 80 },
      width: width / 5,
      height: 20,
      startTime: 7000,
    },
    {
      position: { x: width+ width +width +480, y: height - 100 },
      width: width / 5,
      height: 20,
      startTime: 7000,
    },
   
  ]);

  const [spikes, setSpikes] = useState([
    {
      position: { x: width    , y: height - 25 },
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
    {
      position: { x: width +10+ width / 2 , y: height - 25 },
      width: 10,
      height: 10,
      startTime: 7000,
    },
    
    
  ]);

  //not array
  const [portal, setPortal] = useState([
    
    {
      position: { x:  width*3 +width/3 + 50, y: height - 200 }, // 3*width
      width: 100,
      height: 100,
      //width: width / 3,
    //  height: 20, //i think from the portal.js is more important
      startTime: 5000,
    },
  ]
  );

  const [showMessage, setShowMessage] = useState(false); // State to control the display of the message
  const navigation = useNavigation();
  const [elapsedTime, setElapsedTime] = useState(0); // State to track the elapsed time
  const [showEndMessage, setShowEndMessage] = useState(false); // State to control the display of the message
  const [isAnimationsStopped, setIsAnimationsStopped] = useState(false); // State to track if animations are stopped

  useEffect(() => {
    let interval;

    const handleTimerTick = () => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    };

    if (!showEndMessage && !isAnimationsStopped) {
      interval = setInterval(handleTimerTick, ONE_SECOND_IN_MS);
    }

    return () => {
      clearInterval(interval);
    };
  }, [showEndMessage, isAnimationsStopped]);

  useEffect(() => {
    if (elapsedTime >= 25 && !isAnimationsStopped) {
      setShowEndMessage(true); // Set the state to display the message
    }
  }, [elapsedTime, isAnimationsStopped]);






  const stopAnimations = () => {
    setPlatforms([]);
    setSpikes([]);
    setPortal([]);
   

    Vibration.vibrate(ONE_SECOND_IN_MS);

    setShowMessage(true); // Set the state to display the message
    setIsAnimationsStopped(true); // Set the state to indicate that animations are stopped
  };

  const handleGoBack = () => {
    // Handle the "Go Back" button press
  setShowMessage(false); // Hide the message
  navigation.navigate('homescreen'); // Replace 'HomeScreen' with the actual name of your home screen route
  // Additional logic as needed
};
    
   
    
  

const handlePlayAgain = () => {
  navigation.navigate('homescreen');
  navigation.navigate('gamescreen'); //LOOOOOOOOOOOOOOOOL  i dont know how to refresh the page so this is what i came up with
  setShowMessage(false); // Hide the message

 
};

  

  return (
    <View style={styles.container}>
      <ImageBackground source={backG} style={styles.backgroundImage}>
        <Player player={player} platforms={platforms} spikes={spikes} portal={portal} />
        {platforms.map((platform, index) => (
          <Platform
            key={index}
            player={player}
            platform={platform}
            stopAnimations={stopAnimations}
            isAnimationStarted={platform.isAnimationStarted} // Pass isAnimationStarted prop
          />
        ))}
        {spikes.map((spike, index) => (
          <Spike
            key={index}
            player={player}
            spike={spike}
            stopAnimations={stopAnimations}
            isAnimationStarted={spike.isAnimationStarted} // Pass isAnimationStarted prop
          />
        ))}
        {portal.map((portal, index) => (
          <Portal
            key={index}
            player={player}
            portal={portal}
            platforms={platforms}
            spikes={spikes}
            stopAnimations={stopAnimations}
            isAnimationStarted={portal.isAnimationStarted} // Pass isAnimationStarted prop
          />
        ))}
  
       
  {showMessage && ( // Conditionally render the message
          <View style={styles.messageContainer}>
            <View style={styles.blueBox}>
              <Text style={styles.messageText}>Oops, you lost!</Text>
              <View style={styles.buttonContainer}>
                <Text style={styles.button} onPress={handleGoBack}>
                  Go Back
                </Text>
                <Text style={styles.button} onPress={handlePlayAgain}>
                  Play Again
                </Text>
              </View>
            </View>
          </View>
        )}
         {showEndMessage && (
          <View style={styles.messageContainer}>
            <View style={styles.blueBox}>
              <Text style={styles.messageText}>🎉🎉🎉Congratulations! 🎉🎉🎉</Text>
              <Text style={styles.messageText}>You finished the First Level!!</Text>
              <View style={styles.buttonContainer}>
                <Text style={styles.button} onPress={handleGoBack}>
                  Go Back
                </Text>
                <Text style={styles.button} onPress={handlePlayAgain}>
                  Play Again
                </Text>
              </View>
            </View>
          </View>
        )}
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
  messageContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueBox: {
    backgroundColor: 'blue',
    width: 400,
    height: 300,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between', // Align buttons in the vertical middle
  },
  messageText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align buttons horizontally
    marginTop: 'auto', // Push the buttons to the bottom
  },
  button: {
    color: 'white',
    fontSize: 16,
  },
});