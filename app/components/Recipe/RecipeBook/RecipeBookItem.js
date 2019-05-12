import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Text, TouchableHighlight, View,
} from 'react-native';
import style from '../../Style/style';

const RecipeBookItem = ({
  onPress, recipe, ...props
}) => (
  <TouchableHighlight onPress={onPress} style={style.touch}>

    <View style={style.container} onPress={onPress} {...props}>
      <Image
        style={style.imageStyle}
        source={{ uri: recipe.image_url ? recipe.image_url : 'https://pngimage.net/wp-content/uploads/2018/06/not-found-png-3.png' }}
      />
      <Text style={style.recipeTitle}>
        { recipe.title }
      </Text>
      <Text style={style.description}>
        { recipe.description }
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
