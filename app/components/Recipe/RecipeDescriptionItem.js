/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image, ScrollView, SectionList, Text, View, Modal,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import connect from 'react-redux/es/connect/connect';
import style from './descriptionStyle';
import colors from '../../config/colors';
import ButtonStd from '../Buttons/ButtonStd';
import RecipeAdviceItem from '../RecipeAdviceItem/RecipeAdviceItem';
import {
  changeListModalVisible,
  hideCreateRecipeAdviceForm,
  showCreateRecipeAdviceForm,
} from '../../actions/recipe';
import RecipeAdviceFormModal from '../RecipeAdviceFormModal/RecipeAdviceFormModal';
import ExistingListModal from './ExistingListModal/ExistingListModal';

class RecipeDescriptionItem extends Component {
  setModalVisible(visible) {
    const { dispatch } = this.props;
    dispatch(changeListModalVisible(visible));
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
      recipe, onPress, navigation, displayRecipeAdviceModal, visible,
    } = this.props;

    return (
      <ScrollView style={{ backgroundColor: colors.primaryWhite, marginBottom: 40 }}>
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
          visible={visible}
          transparent={false}
          onRequestClose={() => {
            this.setModalVisible(!visible);
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
        <View style={style.buttonContainer}>
          <ButtonStd
            title="Importer la liste de course"
            onPress={onPress}
            buttonStyle={style.btnSendForm}
            fontSize={15}
            color={colors.primaryWhite}
          />
        </View>
        <View style={style.buttonContainer}>
          <ButtonStd
            title="Ajouter à une liste de course existante"
            onPress={() => {
              this.setModalVisible(!visible);
            }}
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
            { title: 'Ingrédients', data: recipe.ingredients.map(ing => (`-${ing.quantity == null ? '' : `${ing.quantity} `} ${ing.ingredient.name}`)) },
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
            />
          ))
        }
        <View style={style.advicesContainer}>
          <Text style={style.adviceContainerTitle}>Tous les avis</Text>
          <RecipeAdviceItem
            navigation={navigation}
            data={{
              author: {
                first_name: 'Guillaume',
                last_name: 'CAUCHOIS',
                image: 'https://facebook.github.io/react/logo-og.png',
              },
              message: {
                content: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
                date: '10/05/2016',
              },
            }}
          />
          <RecipeAdviceItem
            navigation={navigation}
            data={{
              author: {
                first_name: 'Guillaume',
                last_name: 'CAUCHOIS',
                image: 'https://facebook.github.io/react/logo-og.png',
              },
              message: {
                content: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
                date: '10/05/2016',
              },
            }}
          />
          <RecipeAdviceItem
            navigation={navigation}
            data={{
              author: {
                first_name: 'Guillaume',
                last_name: 'CAUCHOIS',
                image: 'https://facebook.github.io/react/logo-og.png',
              },
              message: {
                content: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
                date: '10/05/2016',
              },
            }}
          />
          <ButtonStd
            onPress={() => this.handlePressAddAdvice()}
            title="Laisser un avis"
            buttonStyle={style.btnLeaveAdvice}
            color={colors.primaryWhite}
            fontSize={20}
          />
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
  navigation: PropTypes.object.isRequired,
  displayRecipeAdviceModal: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

RecipeDescriptionItem.defaultProps = {
  visible: false,
};

function mapStateToProps(state) {
  return {
    displayRecipeAdviceModal: state.recipe.displayRecipeAdviceModal,
    visible: state.recipe.listModalVisible,

  };
}

export default connect(mapStateToProps)(RecipeDescriptionItem);
