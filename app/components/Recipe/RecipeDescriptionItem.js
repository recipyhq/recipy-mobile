/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, ScrollView, SectionList, Text, View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import style from './descriptionStyle';
import colors from '../../config/colors';
import ButtonStd from '../Buttons/ButtonStd';

const RecipeDescriptionItem = ({
  recipe, onPress, dropDownInfo,
}) => (
  <ScrollView style={{ backgroundColor: colors.primaryWhite, marginBottom: 40 }}>
    <View style={style.titleView}>
      <Text style={style.pageTitle}>
        {recipe.title}
      </Text>
    </View>
    <Image
      source={{ uri: recipe.image_url ? recipe.image_url : 'https://pngimage.net/wp-content/uploads/2018/06/not-found-png-3.png' }}
      style={style.imageStyle}
    />
    <View style={style.infoView}>
      <View style={style.infoContainer}>
        <Text style={style.information}>
          <FontAwesome5 name="hourglass" color={colors.primaryWhite} size={12} />
          {' '}
          {recipe.preparation_time}
          {' '}
           min
        </Text>
      </View>
      <View style={style.infoContainer}>
        <Text style={style.information}>
          <FontAwesome5 name="fire" color={colors.primaryWhite} size={12} />
          {' '}
          {recipe.cooking_time}
          {' '}
          min
        </Text>
      </View>
      <View style={style.infoContainer}>
        <Text style={style.information}>
          <FontAwesome5 name="user" color={colors.primaryWhite} size={12} />
          {' '}
          {recipe.person}
          {' pers'}
        </Text>
      </View>
      <View style={style.infoContainer}>
        <Text style={style.information}>
          <FontAwesome5 name="tachometer" color={colors.primaryWhite} size={12} />
          {' '}
          {recipe.difficulty}
          {'/10'}
        </Text>
      </View>
    </View>
    <View style={style.buttonContainer}>
      <ButtonStd
        title="Importer la liste de course"
        onPress={onPress}
        buttonStyle={style.btnSendForm}
        fontSize={15}
        color={colors.primaryWhite}
      />
    </View>
    <Text style={style.sectionTitle}>
      Description
    </Text>
    <Text style={style.sectionText}>
      {recipe.description}
    </Text>
    <SectionList
      sections={[
        { title: 'Ingrédients', data: recipe.ingredients.map(ing => (`-${ing.quantity == null ? '' : ing.quantity} ${ing.ingredient.name}`)) },
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
    {
    recipe.steps.map((step, index) => (
      <SectionList
        key={index.toString()}
        keyExtractor={(item, oindex) => index}
        sections={[
          { title: `Etape ${index + 1}`, data: [step] },
        ]}
        renderItem={({ item }) => <Text style={style.sectionText}>{item}</Text>}
        renderSectionHeader={
          ({ section }) => <Text style={style.sectionStep}>{section.title}</Text>
        }
      />))
    }
  </ScrollView>

);

RecipeDescriptionItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  recipe: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  onPress: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dropDownInfo: PropTypes.array.isRequired,
};

export default RecipeDescriptionItem;
