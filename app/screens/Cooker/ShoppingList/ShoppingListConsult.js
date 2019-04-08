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
import styles from '../../Authentication/styles';
import Loader from '../../../components/Loaders/Loader/Loader';


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
        <View style={{ backgroundColor: colors.primaryWhite }}>
          <ShoppingListItemConsult list={list} dispatch={dispatch} />
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
            <ButtonStd
              title="Supprimer"
              onPress={() => {
                this.handleDeleteShoppingList(currentShoppingList.id);
              }}
              buttonStyle={styles.btnSendForm}
              borderRadius={30}
              fontSize={20}
              color={colors.primaryWhite}
            />
          </View>
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
