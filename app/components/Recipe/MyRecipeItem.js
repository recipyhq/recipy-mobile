import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Text, TouchableHighlight, View,
} from 'react-native';
import style from './style';

const MyRecipeItem = ({
  src, onPress, title, view, like, ...props
}) => (
  <View style={style.container} onPress={onPress} {...props}>
    <TouchableHighlight onPress={onPress}>
      <Image
        style={style.imageStyle}
        source={{ uri: src }}
      />
    </TouchableHighlight>
    <Text style={style.recipeTitle}>
      {title}
    </Text>
    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
      <Text style={style.attribute}>
        Vues:
        {' '}
        {view}
      </Text>
      <Text style={style.attribute}>
        Like:
        {' '}
        {like}
      </Text>
    </View>
  </View>
);

MyRecipeItem.propTypes = {
  src: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  like: PropTypes.string.isRequired,
};

export default MyRecipeItem;
