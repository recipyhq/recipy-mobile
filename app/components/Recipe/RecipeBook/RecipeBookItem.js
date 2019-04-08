import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Text, TouchableHighlight, View,
} from 'react-native';
import style from './style';

const RecipeBookItem = ({
  onPress, recipe, ...props
}) => (
  <TouchableHighlight onPress={onPress}>

    <View style={style.container} onPress={onPress} {...props}>
      <Image
        style={style.imageStyle}
        source={{ uri: 'https://pngimage.net/wp-content/uploads/2018/06/not-found-png-3.png' }}
      />
      <Text style={style.recipeBookTitle}>
        {'Carnet de recette'}
      </Text>
      <Text style={style.description}>
        {'Description du carnet'}
      </Text>
    </View>
  </TouchableHighlight>

);

RecipeBookItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  recipe: PropTypes.object.isRequired,
};

export default RecipeBookItem;
