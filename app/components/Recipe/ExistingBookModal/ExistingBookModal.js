import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import SearchableDropdown from 'react-native-searchable-dropdown';
import style from '../descriptionStyle';
import ButtonStd from '../../Buttons/ButtonStd';
import colors from '../../../config/colors';
import { addRecipeToRecipeBook } from '../../../api/recipebook';
import { changeModalItem, changeModalText } from '../../../actions/recipebook';
import { changeBookModalVisible } from '../../../actions/recipe';

class ExistingBookModal extends Component {
  setBookVisible(visible) {
    const { dispatch } = this.props;
    dispatch(changeBookModalVisible(visible));
  }

  handleAddToRecipeBook() {
    const {
      dispatch, dropDownInfo, currentRecipe, user, text,
    } = this.props;
    let {
      item,
    } = this.props;
    if (item == null) item = dropDownInfo.find(x => x.name.toLowerCase() === text.toLowerCase());
    if (typeof item === 'undefined') {
      addRecipeToRecipeBook(dispatch, '', user, currentRecipe.id, '');
    } else { addRecipeToRecipeBook(dispatch, item.name, user, currentRecipe.id, item.id); }
  }

  handleTextChange(text) {
    const { dispatch } = this.props;
    dispatch(changeModalText(text));
    dispatch(changeModalItem(null));
  }

  handleItemChange(item) {
    const { dispatch } = this.props;
    dispatch(changeModalItem(item));
  }

  render() {
    const { dropDownInfo, visible, navigation } = this.props;
    if (dropDownInfo <= 0) {
      return (
        <View style={style.modalContainer}>
          <View>
            <Text style={style.pageTitleBlack}>Aucun carnet !</Text>
            <View style={style.buttonContainerWithSpace}>
              <ButtonStd
                title="Créer un carnet"
                onPress={() => {
                  this.setBookVisible(!visible);
                  navigation.navigate('RecipeBook');
                }}
                buttonStyle={style.btnSendForm}
                fontSize={15}
                color={colors.primaryWhite}
              />
            </View>
            <View style={style.buttonContainerWithSpace}>
              <ButtonStd
                title="Fermer"
                onPress={() => {
                  this.setBookVisible(!visible);
                }}
                buttonStyle={style.btnSendForm}
                fontSize={15}
                color={colors.primaryWhite}
              />
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={style.modalContainer}>
        <View>
          <Text style={style.pageTitleBlack}>Choisissez un carnet</Text>
          <SearchableDropdown
            onTextChange={text => this.handleTextChange(text)}
            onItemSelect={item => this.handleItemChange(item)}
            containerStyle={{ paddingTop: 5, paddingBottom: 5 }}
            textInputStyle={{
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={dropDownInfo}
            placeholder="Carnet"
            resetValue={false}
            underlineColorAndroid="transparent"
          />
          <View style={style.buttonContainerWithSpace}>
            <ButtonStd
              title="Sauvegarder"
              onPress={() => {
                this.handleAddToRecipeBook();
              }}
              buttonStyle={style.btnSendForm}
              fontSize={15}
              color={colors.primaryWhite}
            />
          </View>
          <View style={style.buttonContainerWithSpace}>
            <ButtonStd
              title="Fermer"
              onPress={() => {
                this.setBookVisible(!visible);
              }}
              buttonStyle={style.btnSendForm}
              fontSize={15}
              color={colors.primaryWhite}
            />
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    visible: state.recipe.bookModalVisible,
    text: state.recipebook.modalText,
    item: state.recipebook.modalItem,
    search: state.recipebook.search,
  };
}

ExistingBookModal.defaultProps = {
  text: '',
  item: null,
  visible: false,
};

ExistingBookModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dropDownInfo: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentRecipe: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  text: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  visible: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(ExistingBookModal);
