// Platform.js
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { View, StyleSheet, Vibration } from 'react-native';

const { width, height } = Dimensions.get('window');
const platformSpeed = 2;
const platformResetDelay = 2000;

export default class Platform extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
      isCollision: false,
    };
  }

  componentDidMount() {
    this.animate();
  }

  stopAnimation = () => {
    cancelAnimationFrame(this.animationFrame);
  };

  animate = () => {
    const { platform } = this.props;
    const { isCollision } = this.state;
    const { player } = this.props;

    if (isCollision) {
      Vibration.vibrate();
      return;
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
      }, platformResetDelay);
    }

    requestAnimationFrame(this.animate);
  };

  render() {
    const { platform } = this.props;

    return (
      <View
        style={[
          styles.platform,
          { left: platform.position.x, top: platform.position.y },
          { width: platform.width, height: platform.height },
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  platform: {
    position: 'absolute',
    backgroundColor: 'blue',
  },
});
