/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image, ScrollView, SectionList, Text, View, Modal,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import connect from 'react-redux/es/connect/connect';
import Moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/fr-ca';
import 'moment/locale/fr-ch';
import style from './descriptionStyle';
import colors from '../../config/colors';
import ButtonStd from '../Buttons/ButtonStd';
import RecipeAdviceItem from '../RecipeAdviceItem/RecipeAdviceItem';
import {
  changeBookModalVisible,
  changeListModalVisible,
  hideCreateRecipeAdviceForm,
  showCreateRecipeAdviceForm,
} from '../../actions/recipe';
import RecipeAdviceFormModal from '../RecipeAdviceFormModal/RecipeAdviceFormModal';
import ExistingListModal from './ExistingListModal/ExistingListModal';
import ExistingBookModal from './ExistingBookModal/ExistingBookModal';

class RecipeDescriptionItem extends Component {
  setModalVisible(visible) {
    const { dispatch } = this.props;
    dispatch(changeListModalVisible(visible));
  }

  setBookVisible(visible) {
    const { dispatch } = this.props;
    dispatch(changeBookModalVisible(visible));
  }

  handlePressAddAdvice() {
    const { dispatch } = this.props;
    dispatch(showCreateRecipeAdviceForm());
  }

  handleRequestCloseModalRecipeAdvice() {
    const { dispatch } = this.props;
    dispatch(hideCreateRecipeAdviceForm());
  }

  render() {
    const {
      recipe, onPress, onSearch, navigation, displayRecipeAdviceModal,
      currentUser, bookVisible, listVisible, dropDownInfo,
    } = this.props;

    Moment.locale('fr');

    return (
      <ScrollView keyboardShouldPersistTaps="always" style={{ backgroundColor: colors.primaryWhite }}>
        <Modal
          animationType="slide"
          visible={displayRecipeAdviceModal}
          onRequestClose={() => this.handleRequestCloseModalRecipeAdvice()}
          transparent
        >
          <RecipeAdviceFormModal />
        </Modal>
        <Modal
          animationType="slide"
          visible={bookVisible}
          transparent={false}
          onRequestClose={() => {
            this.setBookVisible(!bookVisible);
          }}
        >
          <ExistingBookModal
            currentRecipe={recipe}
            dropDownInfo={dropDownInfo}
            navigation={navigation}
          />
        </Modal>
        <Modal
          animationType="slide"
          visible={listVisible}
          transparent={false}
          onRequestClose={() => {
            this.setModalVisible(!listVisible);
          }}
        >
          <ExistingListModal currentRecipe={recipe} navigation={navigation} />
        </Modal>
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
        {
          currentUser && (
          <View style={style.buttonContainer}>
            <ButtonStd
              title="Créer un liste de course à partir de la recette"
              onPress={onPress}
              buttonStyle={style.btnSendForm}
              fontSize={15}
              color={colors.primaryWhite}
            />
            <ButtonStd
              title="Ajouter à une liste de course existante"
              onPress={() => {
                this.setModalVisible(!listVisible);
                onSearch();
              }}
              buttonStyle={style.btnSendForm}
              fontSize={15}
              color={colors.primaryWhite}
            />
            <ButtonStd
              title="Ajouter à un carnet recette"
              onPress={() => {
                this.setBookVisible(!bookVisible);
                onSearch();
              }}
              buttonStyle={style.btnSendForm}
              fontSize={15}
              color={colors.primaryWhite}
            />
          </View>
          )
          }

        <Text style={style.sectionTitle}>
          Description
        </Text>
        <Text style={style.sectionText}>
          {recipe.description}
        </Text>
        <SectionList
          sections={[
            {
              title: 'Ingrédients',
              data: recipe.ingredients.map(ing => (
                ing.quantity == null ? (
                  <Text>
                    {'-'}
                    {ing.ingredient.name}
                    {' '}
                    <Text style={{ color: colors.primaryRed, fontWeight: 'bold' }}>
                      {' ( '}
                      {ing.allergen.map(all => (
                        <Text>
                          {all.name.replace(/_/g, ' ')}
                          {' '}
                        </Text>
                      ))}
                      {')'}
                    </Text>
                  </Text>
                )
                  : (
                    <Text>
                      {'-'}
                      {ing.quantity[0]}
                      {' '}
                      {ing.quantity[1].toLowerCase()}
                      {' de '}
                      {ing.ingredient.name}
                      {''}
                      <Text style={{ color: colors.primaryRed, fontWeight: 'bold' }}>
                        {' ( '}
                        {ing.allergen.map(all => (
                          <Text>
                            {all.name.replace(/_/g, ' ')}
                            {' '}
                          </Text>
                        ))}
                        {')'}
                      </Text>
                    </Text>
                  )
              )),
            },
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
              keyExtractor={() => index}
              sections={[
                { title: `Etape ${index + 1}`, data: [step] },
              ]}
              renderItem={({ item }) => <Text style={style.sectionText}>{item}</Text>}
              renderSectionHeader={
                ({ section }) => <Text style={style.sectionStep}>{section.title}</Text>
              }
            />
          ))
        }
        <View style={style.advicesContainer}>
          <Text style={style.adviceContainerTitle}>Tous les avis</Text>
          {
            recipe.scores.length === 0 && currentUser && (
              <View>
                <Text style={style.noAdviceText}>
                  Aucun avis pour le moment, aidez la communauté dès maintenant !
                </Text>
              </View>
            )
          }
          {
            recipe.scores.length === 0 && !currentUser && (
              <View>
                <Text style={style.noAdviceText}>
                  Aucun avis pour le moment
                  connectez-vous pour partager votre avis sur cette recette !
                </Text>
              </View>
            )
          }
          {
            recipe.scores.map(advice => (
              <RecipeAdviceItem
                key={advice.value.toString()}
                navigation={navigation}
                data={{
                  author: {
                    first_name: '',
                    image: advice.user.avatar,
                  },
                  message: {
                    content: advice.content,
                    date: Moment(advice.updatedAt).format('DD/MM/YYYY'),
                  },
                }}
              />
            ))
          }
          {
            currentUser && (
            <View>
              <ButtonStd
                onPress={() => this.handlePressAddAdvice()}
                title="Laisser un avis"
                buttonStyle={style.btnLeaveAdvice}
                color={colors.primaryWhite}
                fontSize={20}
              />
            </View>
            )
          }
        </View>
      </ScrollView>
    );
  }
}

RecipeDescriptionItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  recipe: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  onPress: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  onSearch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  displayRecipeAdviceModal: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}),
  listVisible: PropTypes.bool,
  bookVisible: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  dropDownInfo: PropTypes.array.isRequired,
};

RecipeDescriptionItem.defaultProps = {
  currentUser: null,
  listVisible: false,
  bookVisible: false,

};

function mapStateToProps(state) {
  return {
    displayRecipeAdviceModal: state.recipe.displayRecipeAdviceModal,
    listVisible: state.recipe.listModalVisible,
    bookVisible: state.recipe.bookModalVisible,
    currentUser: state.user.currentUser,
  };
}

export default connect(mapStateToProps)(RecipeDescriptionItem);
