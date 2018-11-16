import { ImageBackground } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const BackgroundImage = ({ image, children }) => (
  <ImageBackground
    style={{
      flex: 1,
    }}
    source={image}
  >
    {children}
  </ImageBackground>
);

BackgroundImage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.any.isRequired,
  // eslint-disable-next-line react/require-default-props,react/forbid-prop-types
  children: PropTypes.any,
};

export default BackgroundImage;
