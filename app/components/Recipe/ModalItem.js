/* eslint-disable no-unused-vars,react/forbid-prop-types,react/require-default-props,react/no-unused-prop-types,react/no-unused-prop-types,react/destructuring-assignment,no-undef,max-len */
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

class ModalItem extends Component {
  static get defaultProps() {
    return {
    };
  }

  static get propTypes() {
    return {
      dropDownInfo: PropTypes.array.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      currentRecipe: PropTypes.object.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      user: PropTypes.object.isRequired,
    };
  }

  state = {
    modalVisible: false,
    text: '',
    item: null,
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handleAddToRecipeBook() {
    const {
      dispatch, navigation, dropDownInfo, currentRecipe, user
    } = this.props;
    if (this.state.item == null) this.state.item = dropDownInfo.find(x => x.name.toLowerCase() === this.state.text.toLowerCase());
    addRecipeToRecipeBook(dispatch, this.state.item.name, user, currentRecipe.id, this.state.item.id);
  }

  handleTextChange(text) {
    this.state.text = text;
    this.state.item = null;
  }

  handleItemChange(item) {
    this.state.item = item;
  }

  render() {
    const { dropDownInfo } = this.props;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
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
                    this.setModalVisible(!this.state.modalVisible);
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
  };
}

export default connect(mapStateToProps)(withNavigation(ModalItem));
