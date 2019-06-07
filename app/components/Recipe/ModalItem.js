import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import SearchableDropdown from 'react-native-searchable-dropdown';
import style from './descriptionStyle';
import ButtonStd from '../Buttons/ButtonStd';
import colors from '../../config/colors';
import { createShoppingList } from '../../api/recipe';
import { addRecipeToRecipeBook } from '../../api/recipebook';
import { changeModalItem, changeModalText, changeModalVisible } from '../../actions/recipebook';

class ModalItem extends Component {
  setModalVisible(visible) {
    const { dispatch } = this.props;
    dispatch(changeModalVisible(visible));
  }

  handleAddToRecipeBook() {
    const {
      dispatch, navigation, dropDownInfo, currentRecipe, user, text,
    } = this.props;
    let {
      item,
    } = this.props;
    if (item == null) item = dropDownInfo.find(x => x.name.toLowerCase() === text.toLowerCase());
    console.log(JSON.stringify(item));
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
    console.log(item);
  }

  render() {
    const { dropDownInfo, visible } = this.props;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={() => {
            this.setModalVisible(!visible);
          }}
        >
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
                    this.setModalVisible(!visible);
                  }}
                  buttonStyle={style.btnSendForm}
                  fontSize={15}
                  color={colors.primaryWhite}
                />
              </View>
            </View>
          </View>
        </Modal>

        <View style={style.buttonContainer}>
          <ButtonStd
            title="Ajouter à un carnet"
            onPress={() => {
              this.setModalVisible(true);
            }}
            buttonStyle={style.btnSendForm}
            fontSize={15}
            color={colors.primaryWhite}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    visible: state.recipebook.modalVisible,
    text: state.recipebook.modalText,
    item: state.recipebook.modalItem,
  };
}

ModalItem.defaultProps = {
  text: '',
  item: null,
  visible: false,
};

ModalItem.propTypes = {
  dropDownInfo: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentRecipe: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  text: PropTypes.string,
  item: PropTypes.object,
  visible: PropTypes.bool,
};

export default connect(mapStateToProps)(ModalItem);
