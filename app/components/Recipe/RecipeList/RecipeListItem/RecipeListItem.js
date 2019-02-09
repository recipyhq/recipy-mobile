import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import colors from '../../../../config/colors';
import style from './style';

const RecipeListItem = ({ recipe }) => (
  <View style={style.container}>
    <Card
      title={recipe.title}
      image={{ uri: recipe.image_url }}
    >
      <Text style={style.recipeDescription}>
        {recipe.description}
      </Text>
      <Text style={style.recipeTime}>
        {`Temps de réalisation : ${recipe.time} minutes`}
      </Text>
      <Button
        icon={{
          name: 'cutlery',
          color: colors.primaryWhite,
          size: 15,
          type: 'font-awesome',
        }}
        backgroundColor="#03A9F4"
        onPress={() => {}}
        buttonStyle={
          {
            borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
          }
        }
        title="Je veux cuisiner !"
      />
    </Card>
  </View>
);

RecipeListItem.propTypes = {
  recipe: PropTypes.shape(
    {
      title: PropTypes.string.isRequired,
      image_url: PropTypes.string,
      description: PropTypes.string,
    },
  ).isRequired,
};

export default RecipeListItem;
