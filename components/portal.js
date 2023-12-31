import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, Vibration, Image } from 'react-native';
import port from '../assets/portal.png'

const { width, height } = Dimensions.get('window');
const portalSpeed = 4;


export default class Portal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      isAnimationStarted: false,
      isCollision: false,
    };
  }

  componentDidMount() {
   // this.animationStarted = false; // Initialize the flag
    const { portal } = this.props;
    const { startTime } = portal;
    const delay = startTime - Date.now// Calculate the delay based on the start time
// without - date.now the appearence seems to listen to the position writen on the gamescreen component
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
    const { appearanceTime } = portal; // Replace appearanceTime with startTime

    this.animationTimer = setTimeout(() => {
      this.setState({ isAnimationStarted: true });
      this.animate();
    }, appearanceTime); // Use startTime instead of appearanceTime
  };

  stopAnimation = () => {
    clearTimeout(this.animationTimer);
  };

  animate = () => {
    const { portal, player, platforms, spikes } = this.props;
    const { isPortalCollision } = this.state;
    const { isCollision } = this.state;

   

    if (isPortalCollision) {
      this.setState({ isPortalCollision: true });
    }

    // Check for collision with platforms
    platforms.forEach((platform) => {
      if (
        player.position.y + player.height >= platform.position.y &&
        player.position.y <= platform.position.y + platform.height &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
      ) {
        this.setState({ isCollision: true });
        this.props.stopAnimations();
      }
    });

    // Check for collision with spikes
    spikes.forEach((spike) => {
      if (
        player.position.y + player.height >= spike.position.y &&
        player.position.y <= spike.position.y + spike.height &&
        player.position.x + player.width >= spike.position.x &&
        player.position.x <= spike.position.x + spike.width
      ) {
        this.setState({ isCollision: true });
        this.props.stopAnimations();
      }
    });

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

    

    requestAnimationFrame(this.animate);
  };

  render() {
    const { portal } = this.props;
    const { isAnimationStarted } = this.state;

    return (
      <View style={styles.container}>
        {isAnimationStarted && (
          <Image
            source={port}
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