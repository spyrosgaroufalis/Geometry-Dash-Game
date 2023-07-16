import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, Vibration, Image } from 'react-native';
import port from '../assets/portal.png'

const { width, height } = Dimensions.get('window');
const portalSpeed = 4;


export default class portal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollision: false,
      isAnimationStarted: false,
    };
  }


  
  componentDidMount() {
     this.animationStarted = false; // Initialize the flag
    const { portal } = this.props;
    const { startTime } = portal;
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
  
    const { portal } = this.props;
    const { startTime } = portal; // Replace appearanceTime with startTime
  
    this.animationTimer = setTimeout(() => {
      this.setState({ isAnimationStarted: true });
      this.animate();
    }, startTime); // Use startTime instead of appearanceTime
  };

  stopAnimation = () => {
    clearTimeout(this.animationTimer);
  };

  animate = () => {
    const { portal, player } = this.props;
    const { isCollision } = this.state;
  
    if (isCollision) {
      this.setState({ isCollision: true });


     // this.props.stopAnimations();
     // Vibration.vibrate();
    }

  
    if (!this.animationStarted) {
      const { startTime } = portal;
      const currentTime = new Date().getTime();
      if (currentTime < startTime) {
        requestAnimationFrame(this.animate);
        return;
      }
      this.animationStarted = true;
    }
  
    portal.position.x -= portalSpeed;
  
    this.setState({ portal });
  
    // Collision detection with the player
    if (
      player.position.y + player.height >= portal.position.y &&
      player.position.y <= portal.position.y + portal.height &&
      player.position.x + player.width >= portal.position.x &&
      player.position.x <= portal.position.x + portal.width &&
      player.position.x + player.width >= portal.position.x &&
      player.position.x <= portal.position.x + portal.width &&
      player.position.y <= portal.position.y + portal.height / 2
      
    ) {
      if (!isCollision) {
        this.setState({ isCollision: true });
      }
    } else {
      this.setState({ isCollision: false });
    }
  

  
    requestAnimationFrame(this.animate);
  };
  

  render() {
    const { portal } = this.props;
    const { isAnimationStarted } = this.state;

    return (
      <View style={styles.container}>
        {isAnimationStarted && (
            
          <Image source={port}
            style={[
              styles.portal,
              { left: portal.position.x, top: portal.position.y },
              
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
  portal: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 100,
    height: 100,
  },
});
