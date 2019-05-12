import React, { Component } from 'react';
import {
  View, ScrollView,
} from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import colors from '../../../config/colors';
import ShoppingListItemConsult from '../../../components/ShoppingList/ShoppingListItemConsult';
import { deleteShoppingList } from '../../../api/recipe';
import ButtonStd from '../../../components/Buttons/ButtonStd';
import Loader from '../../../components/Loaders/Loader/Loader';
import style from '../../../components/Recipe/descriptionStyle';

class ShoppingListConsult extends Component {
  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handleDeleteShoppingList(id) {
    const { dispatch, navigation } = this.props;
    deleteShoppingList(dispatch, id, navigation);
  }

  render() {
    const { navigation, dispatch, currentShoppingList } = this.props;
    const list = navigation.getParam('item', 'NO-ID');
    return (
      <ScrollView style={{ backgroundColor: colors.primaryWhite }}>
        <Loader isLoading={this.isLoading} />
        <View style={style.buttonContainer}>
          <ButtonStd
            title="Supprimer"
            onPress={() => {
              this.handleDeleteShoppingList(currentShoppingList.id);
            }}
            buttonStyle={style.btnSendForm}
            fontSize={15}
            color={colors.primaryWhite}
          />
        </View>
        <View style={{ backgroundColor: colors.primaryWhite, paddingTop: 5 }}>
          <ShoppingListItemConsult list={list} dispatch={dispatch} />
        </View>
      </ScrollView>
    );
  }
}

ShoppingListConsult.defaultProps = {
  isLoading: true,
};

function mapStateToProps(state) {
  return {
    isLoading: state.user.isLoading,
    currentShoppingList: state.recipe.currentShoppingList,

  };
}

ShoppingListConsult.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentShoppingList: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
};
export default connect(mapStateToProps)(ShoppingListConsult);
