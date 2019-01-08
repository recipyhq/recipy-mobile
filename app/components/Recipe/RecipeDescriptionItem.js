/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, ScrollView, SectionList, Text, View,
} from 'react-native';
import style from './descriptionStyle';
import colors from '../../config/colors';

const RecipeDescriptionItem = ({
  recipe,
}) => (
  <ScrollView style={{ backgroundColor: colors.primaryWhite, marginBottom: 1 }}>
    <Text style={style.pageTitle}>
      {recipe.title}
    </Text>
    <Image
      source={{ uri: recipe.image_url }}
      style={style.imageStyle}
    />
    <View style={{ flexDirection: 'row' }}>
      <View style={style.infoContainer}>
        <Text style={style.indicator}>
          Temps:
        </Text>
        <Text style={style.information}>
          {recipe.time}
          {' '}
           min
        </Text>
      </View>
      <View style={style.infoContainer}>
        <Text style={style.indicator}>
          Difficulté:
        </Text>
        <Text style={style.information}>
          {recipe.difficulty}
          {'/10'}
        </Text>
      </View>
      <View style={style.infoContainer}>
        <Text style={style.indicator}>
          Quantité:
        </Text>
        <Text style={style.information}>
          {'Pour '}
          {recipe.person}
        </Text>
      </View>
    </View>
    <Text style={style.sectionTitle}>
      Description
    </Text>
    <Text style={style.sectionText}>
      {recipe.description}
    </Text>
    <SectionList
      sections={[
        { title: 'Ingrédients', data: recipe.recipe_ingredients.map(qua => qua.quantity) + recipe.ingredients.map(ing => ing.name) },
        { title: 'Matériel', data: recipe.utensils.map(title => `- ${title.title}`) },
      ]}
      renderItem={({ item }) => <Text style={style.sectionText}>{item}</Text>}
      renderSectionHeader={
        ({ section }) => <Text style={style.sectionTitle}>{section.title}</Text>
      }
      keyExtractor={(item, index) => index}
    />
    <Text style={style.sectionTitle}>
      Préparation
    </Text>
    <SectionList
      sections={[
        { title: 'Etape 1:', data: [recipe.step] },
      ]}
      keyExtractor={(item, index) => <Text style={style.sectionText}>{index}</Text>}
      renderItem={({ item }) => <Text style={style.sectionText}>{item}</Text>}
      renderSectionHeader={
        ({ section }) => <Text style={style.sectionStep}>{section.title}</Text>
      }
    />
  </ScrollView>

);


RecipeDescriptionItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  recipe: PropTypes.object.isRequired,
};

export default RecipeDescriptionItem;
