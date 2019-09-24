import EStyleSheet from 'react-native-extended-stylesheet';
import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';

const styles = EStyleSheet.create({
  oval: {
    position: 'relative',
    top: 0,
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'column',
    height: 400,
    borderRadius: 999,
    transform: [
      { scaleX: 2 },
    ],
  },
  ovalContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 25,
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

class OvalSquare extends Component {
  static get propTypes() {
    return {
      bgColor: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
      style: PropTypes.array,
    };
  }

  getBgColor() {
    const { props } = this;
    return props.bgColor;
  }

  getColor() {
    const { props } = this;
    return props.color;
  }

  getStyle() {
    const { props } = this;
    return props.style;
  }

  render() {
    return (
      <View style={[styles.container, this.getStyle()]}>
        <View style={[styles.ovalContainer, { backgroundColor: this.getBgColor() }]}>
          <View style={[styles.oval, { backgroundColor: this.getColor() }]} />
        </View>
      </View>
    );
  }
}

export default OvalSquare;
