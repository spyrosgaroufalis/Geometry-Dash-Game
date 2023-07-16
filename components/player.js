import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Animated, ImageBackground, Vibration , Image} from 'react-native';



const { width, height } = Dimensions.get('window');
const gravity = 1.5;

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isJumping: false,
      isCollision: false,
      canJump: true,
      rotationValue: new Animated.Value(0),
      
      rotationOffset: 0, // New state to track the rotation offset
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
        Animated.timing(this.state.rotationValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          const rotationOffset = this.state.rotationOffset + 90; // Increase the rotation offset
          this.setState({ rotationOffset }, () => {
            // Reset the rotation value after landing animation finishes
            this.state.rotationValue.setValue(0);
          });
        });
      }
    }
  };

  render() {
    const { player } = this.props;
    const { isCollision, rotationOffset } = this.state;
    const animatedStyle = {
      transform: [
        {
          rotate: this.state.rotationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [`${rotationOffset}deg`, `${rotationOffset + 90}deg`],
          }),
        },
      ],
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
        >
          <View style={styles.eyesContainer}>
            <View style={styles.eye} />
            <View style={styles.eye} />
          </View>
          <View style={styles.mouthContainer}>
            <View style={styles.mouth} />
          </View>
        </Animated.View>
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
    backgroundColor: '#e0ba3a',
  },
  collisionPlayer: {
    backgroundColor: 'gray',
  },
  eyesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    padding: 4,
  },
  eye: {
    width: 7,
    height: 7,
    backgroundColor: 'white',
   // borderRadius: 5,
  },
  mouth: {
    width: 20,
    height: 5,
    backgroundColor: 'white',
   // marginTop: 10,
  // marginBottom: 5,
  },
  mouthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginTop: 5,
    padding: 5,
    paddingBottom: 7,
  }
});