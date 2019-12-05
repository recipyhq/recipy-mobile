import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import SearchableDropdown from 'react-native-searchable-dropdown';
import style from '../descriptionStyle';
import ButtonStd from '../../Buttons/ButtonStd';
import colors from '../../../config/colors';
import { changeListModalItem, changeListModalText, changeListModalVisible } from '../../../actions/recipe';
import { updateShoppingList } from '../../../api/recipe';

class ExistingListModal extends Component {
  setModalVisible(visible) {
    const { dispatch } = this.props;
    dispatch(changeListModalVisible(visible));
  }

  handleAddToExistingList() {
    const {
      dispatch, allShopListItems, currentRecipe, text, navigation,
    } = this.props;
    let { item } = this.props;
    if (item == null) {
      item = allShopListItems.find(x => x.name.toLowerCase() === text.toLowerCase());
    }
    const uItem = [];
    if (item != null) {
      item.ingredients.map(ing => uItem.push(ing.ingredient.id));
      currentRecipe.ingredients.map(ing => (
        uItem.includes(ing.ingredient.id) ? null : uItem.push(ing.ingredient.id)
      ));
      updateShoppingList(dispatch, uItem, item.id.toString(), navigation, currentRecipe.id);
    }
  }

  handleTextChange(text) {
    const { dispatch } = this.props;
    dispatch(changeListModalText(text.trim()));
    dispatch(changeListModalItem(null));
  }

  handleItemChange(item) {
    const { dispatch } = this.props;
    dispatch(changeListModalItem(item));
  }


  render() {
    const { allShopListItems, visible, navigation } = this.props;
    if (allShopListItems <= 0) {
      return (
        <View style={style.modalContainer}>
          <View>
            <Text style={style.pageTitleBlack}>Aucune liste de course !</Text>
            <View style={style.buttonContainerWithSpace}>
              <ButtonStd
                title="Créer une liste de course"
                onPress={() => {
                  this.setModalVisible(!visible);
                  navigation.navigate('ShoppingList');
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
                  this.setModalVisible(!visible);
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
          <Text style={style.pageTitleBlack}>Choisissez une liste de course</Text>
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
            items={allShopListItems}
            placeholder="Liste de Course"
            resetValue={false}
            underlineColorAndroid="transparent"
          />
          <View style={style.buttonContainerWithSpace}>
            <ButtonStd
              title="Ajouter"
              onPress={() => {
                this.handleAddToExistingList();
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
                this.setModalVisible(!visible);
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
    text: state.recipe.listModalText,
    item: state.recipe.listModalItem,
    allShopListItems: state.recipe.allShopListItems,
    visible: state.recipe.listModalVisible,
  };
}

ExistingListModal.defaultProps = {
  text: '',
  item: null,
  visible: false,
};

ExistingListModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currentRecipe: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  text: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  allShopListItems: PropTypes.array.isRequired,
  visible: PropTypes.bool,
};

export default connect(mapStateToProps)(ExistingListModal);
