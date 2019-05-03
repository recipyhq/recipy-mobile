import EStyleSheet from 'react-native-extended-stylesheet';
import React, { Component } from 'react';
import { View } from 'react-native';

const styles = EStyleSheet.create({
  oval: {
    position: 'relative',
    top: 0,
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'column',
    height: 300,
    borderRadius: 999,
    transform: [
      { scaleX: 1.5 },
    ],
    zIndex: 1,
  },
  ovalContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 50,
    overflow: 'hidden',
  },
  textContainer: { // ADD BG ?
    display: 'flex',
    flexDirection: 'column',
    zIndex: 2,
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

class OvalSquare extends Component {
  getBgColor() {
    const { props } = this;
    return props.bgColor;
  }

  getColor() {
    const { props } = this;
    return props.color;
  }

  getChildren() {
    const { props } = this;
    return props.children;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.ovalContainer, { backgroundColor: this.getBgColor() }]}>
          <View style={[styles.oval, { backgroundColor: this.getColor() }]} />
        </View>
        <View style={[styles.textContainer, { backgroundColor: this.getColor() }]}>
          {this.getChildren()}
        </View>
      </View>
    );
  }
}

export default OvalSquare;
