import {
  Image, Text, TouchableHighlight, View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../config/colors';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: colors.primaryGrey,
    borderRadius: 10,
    marginRight: 15,
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: 200,
    height: 150,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    flex: 1,
    color: colors.primaryWhite,
    fontSize: 13,
    padding: 15,
  },
});

const EntityPreviewItem = ({ image, text, onPress }) => (
  <View style={styles.container}>
    <TouchableHighlight onPress={onPress}>
      <View>
        {
          image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
          )
        }
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  </View>
);

EntityPreviewItem.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

EntityPreviewItem.defaultProps = {
  image: null,
};

export default EntityPreviewItem;
