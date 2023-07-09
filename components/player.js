import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Animated, ImageBackground, Vibration } from 'react-native';
import Platform from './platform';


// Loipon , player.height = to katwtero meros , player.width= to deksiotero meros 
const { width, height } = Dimensions.get('window');
const gravity = 1.5;

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isJumping: false,
      isCollision: false, // New state to track collision
      canJump: true, // New state to track if the cube can jump
     
    };

    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    const { platform } = this.props;
    const { player } = this.props;
    const { isJumping, isCollision } = this.state;
    const { velocity } = player;
  
    player.position.y += velocity.y;
  
    if (player.position.y + player.height + velocity.y <= height) {
      velocity.y += gravity;
    } else {
      velocity.y = 0;
      player.position.y = height - player.height;
      this.setState({ canJump: true }); // Reset canJump when player lands on the ground
    }
  
    // Check for collision
    if (
      player.position.y + player.height >= platform.position.y &&
      player.position.y <= platform.position.y + platform.height &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      this.setState({ isCollision: true });
    } else {
      this.setState({ isCollision: false });
    }
  
    this.setState({ player });
  
    if (isJumping && !isCollision && this.state.canJump) {
      this.jump();
    }
  
    // Mounting
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
      this.setState({ canJump: true }); // Reset canJump when player lands on the platform
    }
  
    requestAnimationFrame(this.animate);
  };
  

  handleTouchStart = () => {
    this.setState({ isJumping: true });
  };

  handleTouchEnd = () => {
    this.setState({ isJumping: false });
  };

  jump = () => {
    const { player, platform } = this.props;
    const { velocity } = player;
    const { canJump } = this.state;
  
    if (
      (player.position.y >= height - player.height) ||
      !(player.position.y + player.height >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width)
    ) {
      if (canJump) {
        velocity.y = -20;
        this.setState({ player: { ...player, velocity }, canJump: false });
      }
    }
  };

  render() {
    const { player } = this.props;
    const { isCollision } = this.state; // Get isCollision from state
    const animatedStyle = {
      transform: [{ translateY: this.animation }],
    };

    return (
      <TouchableOpacity
        style={styles.canvas}
        onPressIn={this.handleTouchStart}
        onPressOut={this.handleTouchEnd}
        activeOpacity={1}
      >
        <Animated.View
          style={[
            styles.player,
            animatedStyle,
            { left: player.position.x, top: player.position.y },
            { width: player.width, height: player.height },
            isCollision && styles.collisionPlayer, // Apply collision style if there is a collision
          ]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
  player: {
    position: 'absolute',
    backgroundColor: 'red',
  },
  collisionPlayer: {
    backgroundColor: 'gray', // Change the color to indicate collision
  },
});
