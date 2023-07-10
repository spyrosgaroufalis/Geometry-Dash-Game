import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Animated, ImageBackground, Vibration } from 'react-native';

const { width, height } = Dimensions.get('window');
const gravity = 1.5;

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isJumping: false,
      isCollision: false,
      canJump: true,
    };

    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    const { platforms } = this.props;
    const { player } = this.props;
    const { isJumping, isCollision } = this.state;
    const { velocity } = player;

    player.position.y += velocity.y;

    if (player.position.y + player.height + velocity.y <= height) {
      velocity.y += gravity;
    } else {
      velocity.y = 0;
      player.position.y = height - player.height;
      this.setState({ canJump: true });
    }

    let isColliding = false;
    platforms.forEach((platform) => {
      if (
        player.position.y + player.height >= platform.position.y &&
        player.position.y <= platform.position.y + platform.height &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
      ) {
        isColliding = true;
      }
    });

    this.setState({ player, isCollision: isColliding });

    if (isJumping && !isCollision && this.state.canJump) {
      this.jump();
    }

    // Mounting
    platforms.forEach((platform) => {
  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >= platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x <= platform.position.x + platform.width
  ) {
    player.velocity.y = 0;
    this.setState({ canJump: true }); // Reset canJump when player lands on the platform
  }
})


    requestAnimationFrame(this.animate);
  };

  handleTouchStart = () => {
    this.setState({ isJumping: true });
  };

  handleTouchEnd = () => {
    this.setState({ isJumping: false });
  };

  jump = () => {
    const { player, platforms } = this.props;
    const { velocity } = player;
    const { canJump } = this.state;

    if (
      (player.position.y >= height - player.height) ||
      !platforms.some((platform) => {
        return (
          player.position.y + player.height >= platform.position.y &&
          player.position.x + player.width >= platform.position.x &&
          player.position.x <= platform.position.x + platform.width
        );
      })
    ) {
      if (canJump) {
        velocity.y = -20;
        this.setState({ player: { ...player, velocity }, canJump: false });
      }
    }
  };

  render() {
    const { player } = this.props;
    const { isCollision } = this.state;
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
            isCollision && styles.collisionPlayer,
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
    backgroundColor: 'gray',
  },
});