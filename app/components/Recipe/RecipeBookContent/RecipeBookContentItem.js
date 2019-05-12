import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Text, TouchableHighlight, View, ProgressBarAndroid,
} from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import style from '../../Style/style';
import colors from '../../../config/colors';

function deleteIcon() {
  return (<FontAwesome5 name="trash" color={colors.primaryRed} size={18} />);
}

const RecipeBookContentItem = ({
  onPress, recipe, onPressDelete, ...props
}) => (
  <TouchableHighlight onPress={onPress} style={style.touch}>
    <View style={style.container} onPress={onPress} {...props}>
      <Image
        style={style.imageStyle}
        source={{ uri: recipe.image_url ? recipe.image_url : 'https://pngimage.net/wp-content/uploads/2018/06/not-found-png-3.png' }}
      />
      <Text style={style.recipeTitle}>
        {recipe.title}
      </Text>
      <Text style={style.score}>
        {'Note: '}
        {recipe.score}
        {'/10'}
      </Text>
      <Text style={style.description}>
        {recipe.description.substring(0, 40)}
        {recipe.description.length > 40 ? '...' : '' }
      </Text>
      <Text style={style.difficultyText}>
        Difficulté
      </Text>
      <ProgressBarAndroid
        style={style.difficultyBar}
        styleAttr="Horizontal"
        indeterminate={false}
        color={colors.primaryOrange}
        progress={recipe.difficulty / 10}
      />
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Text style={style.attribute}>
          Vues:
            {' '}
            {recipe.view}
          </Text>
        </View>
        <Button
          backgroundColor={colors.primaryGrey}
          buttonStyle={
          {
            height: 50,
            width: 50,
          }
        }
          title={deleteIcon()}
          onPress={onPressDelete}
        />
      </View>
    </View>
  </TouchableHighlight>

);

RecipeBookContentItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  recipe: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  onPressDelete: PropTypes.func.isRequired,
};

export default RecipeBookContentItem;
