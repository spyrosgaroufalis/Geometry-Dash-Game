import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, Vibration, Image } from 'react-native';

const { width, height } = Dimensions.get('window');
const spikeSpeed = 4;
const spikeResetDelay = 2000;

export default class Spike extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollision: false,
      isAnimationStarted: false,
    };
  }


  
  componentDidMount() {
    const { spike } = this.props;
    const { startTime } = spike;
    const delay = startTime - Date.now(); // Calculate the delay based on the start time
  
    this.animationTimer = setTimeout(() => {
      this.setState({ isAnimationStarted: true });
      this.animate();
    }, delay > 0 ? delay : 0); // Set a minimum delay of 0 if the calculated delay is negative
  }

  componentWillUnmount() {
    this.stopAnimation();
    clearTimeout(this.animationTimer);
  }

  startAnimation = () => {
    if (this.state.isAnimationStarted) return;

    const { spike } = this.props;
    const { appearanceTime } = spike;

    this.animationTimer = setTimeout(() => {
      this.setState({ isAnimationStarted: true });
      this.animate();
    }, appearanceTime);
  };

  stopAnimation = () => {
    clearTimeout(this.animationTimer);
  };

  animate = () => {
    const { spike, player } = this.props;
    const { isCollision } = this.state;
  
    if (isCollision) {
      this.setState({ isCollision: true });
      this.props.stopAnimations();
      Vibration.vibrate();
    }

  
    if (!this.animationStarted) {
      const { startTime } = spike;
      const currentTime = new Date().getTime();
      if (currentTime < startTime) {
        requestAnimationFrame(this.animate);
        return;
      }
      this.animationStarted = true;
    }
  
    spike.position.x -= spikeSpeed;
  
    this.setState({ spike });
  
    // Collision detection with the player
    if (
      player.position.y + player.height >= spike.position.y &&
      player.position.y <= spike.position.y + spike.height &&
      player.position.x + player.width >= spike.position.x &&
      player.position.x <= spike.position.x + spike.width &&
      player.position.x + player.width >= spike.position.x &&
      player.position.x <= spike.position.x + spike.width &&
      player.position.y <= spike.position.y + spike.height / 2
      
    ) {
      if (!isCollision) {
        this.setState({ isCollision: true });
      }
    } else {
      this.setState({ isCollision: false });
    }
  
    // Check if the spike has gone beyond the left side of the screen
    if (spike.position.x + spike.width < 0) {
      setTimeout(() => {
        spike.position.x = width + 50;
        this.animationStarted = false; // Reset animation started flag
      }, spikeResetDelay);
    }
  
    requestAnimationFrame(this.animate);
  };
  

  render() {
    const { spike } = this.props;
    const { isAnimationStarted } = this.state;

    return (
      <View style={styles.container}>
        {isAnimationStarted && (
            
          <Image source={require('../assets/chart.png')}
            style={[
              styles.spike,
              { left: spike.position.x, top: spike.position.y },
              
            ]}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
   
  },
  spike: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 30,
    height: 30,
  },
});
