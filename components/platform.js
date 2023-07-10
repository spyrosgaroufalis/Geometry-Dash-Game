import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, Vibration } from 'react-native';

const { width, height } = Dimensions.get('window');
const platformSpeed = 2;
const platformResetDelay = 2000;

export default class Platform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollision: false,
      isAnimationStarted: false,
    };
  }


  
  componentDidMount() {
    const { platform } = this.props;
    const { startTime } = platform;
    const delay = startTime - Date.now(); // Calculate the delay based on the start time
  
    this.animationTimer = setTimeout(() => {
      this.setState({ isAnimationStarted: true });
      this.animate();
    }, delay > 0 ? delay : 0); // Set a minimum delay of 0 if the calculated delay is negative
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  startAnimation = () => {
    if (this.state.isAnimationStarted) return;

    const { platform } = this.props;
    const { appearanceTime } = platform;

    this.animationTimer = setTimeout(() => {
      this.setState({ isAnimationStarted: true });
      this.animate();
    }, appearanceTime);
  };

  stopAnimation = () => {
    clearTimeout(this.animationTimer);
  };

  animate = () => {
    const { platform, player } = this.props;
    const { isCollision } = this.state;
  
    if (isCollision) {
      Vibration.vibrate();
      return;
    }
  
    if (!this.animationStarted) {
      const { startTime } = platform;
      const currentTime = new Date().getTime();
      if (currentTime < startTime) {
        requestAnimationFrame(this.animate);
        return;
      }
      this.animationStarted = true;
    }
  
    platform.position.x -= platformSpeed;
  
    this.setState({ platform });
  
    // Collision detection with the player
    if (
      player.position.y + player.height >= platform.position.y &&
      player.position.y <= platform.position.y + platform.height &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      if (!isCollision) {
        this.setState({ isCollision: true });
      }
    } else {
      this.setState({ isCollision: false });
    }
  
    // Check if the platform has gone beyond the left side of the screen
    if (platform.position.x + platform.width < 0) {
      setTimeout(() => {
        platform.position.x = width + 50;
        this.animationStarted = false; // Reset animation started flag
      }, platformResetDelay);
    }
  
    requestAnimationFrame(this.animate);
  };
  

  render() {
    const { platform } = this.props;
    const { isAnimationStarted } = this.state;

    return (
      <View style={styles.container}>
        {isAnimationStarted && (
          <View
            style={[
              styles.platform,
              { left: platform.position.x, top: platform.position.y },
              { width: platform.width, height: platform.height },
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
  platform: {
    position: 'absolute',
    backgroundColor: 'blue',
  },
});
