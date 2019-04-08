/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, ScrollView, SectionList, Text, View,
} from 'react-native';
import style from './descriptionStyle';
import colors from '../../config/colors';
import ButtonStd from '../Buttons/ButtonStd';
import styles from '../../screens/Authentication/styles';

const RecipeDescriptionItem = ({
  recipe, onPress,
}) => (
  <ScrollView style={{ backgroundColor: colors.primaryWhite, marginBottom: 1 }}>
    <Image
      source={{ uri: recipe.image_url ? recipe.image_url : 'https://pngimage.net/wp-content/uploads/2018/06/not-found-png-3.png' }}
      style={style.imageStyle}
    />
    <View style={styles.buttonContainer}>
      <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
        <ButtonStd
          title="Importer la liste de course"
          onPress={onPress}
          buttonStyle={styles.btnSendForm}
          borderRadius={30}
          fontSize={20}
          color={colors.primaryWhite}
        />
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
        <ButtonStd
          title="Ajouter à un carnet"
          onPress={onPress}
          buttonStyle={styles.btnSendForm}
          borderRadius={30}
          fontSize={20}
          color={colors.primaryWhite}
        />
      </View>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <View style={style.infoContainer}>
        <Text style={style.indicator}>
          Temps:
        </Text>
        <Text style={style.information}>
          {recipe.cooking_time + recipe.preparation_time}
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
      <View style={style.infoContainerLast}>
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
};

export default RecipeDescriptionItem;
