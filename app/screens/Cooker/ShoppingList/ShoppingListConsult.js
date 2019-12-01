import React, { Component } from 'react';
import {
  View, ScrollView, Text,
} from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import colors from '../../../config/colors';
import ShoppingListItemConsult from '../../../components/ShoppingList/ShoppingListItemConsult';
import { deleteShoppingList } from '../../../api/recipe';
import ButtonStd from '../../../components/Buttons/ButtonStd';
import Loader from '../../../components/Loaders/Loader/Loader';
import style from '../../../components/Recipe/descriptionStyle';
import styles from '../../Account/Authentication/styles';

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
    const dTag = {
      meat: 'Viandes',
      fish: 'Poissons',
      veggie: 'Légumes',
      fruit: 'Fruits',
      drink: 'Boissons',
      cereal: 'Céréales',
      grocery: 'Epicerie',
      dairy: 'Produits laitiers',
      egg: 'Oeufs',
      dry: 'Produits secs',
      herb: 'Herbes',
      crustacean: 'Crustacés',
      baking: 'Boulangerie',
      fresh: 'Rayon frais',
      alcohol: 'Alcools',
      freezer: 'Surgelé',
      legumes: 'Légumineuses',
    };
    const list = navigation.getParam('item', 'NO-ID');
    const shelf_tag = [];
    list.ingredients.filter(ingredient => shelf_tag.push(ingredient.ingredient.shelf_tag));
    const shelf_tag_unique = [...new Set(shelf_tag)];
    shelf_tag_unique.sort();
    list.ingredients.sort((a, b) => {
      if (a.ingredient.name.toLowerCase() < b.ingredient.name.toLowerCase()) return -1;
      if (a.ingredient.name.toLowerCase() > b.ingredient.name.toLowerCase()) return 1;
      return 0;
    });
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
        <Text style={style.pageTitleList}>
          { list.name }
        </Text>
        <View style={styles.container}>
          {shelf_tag_unique.map(tag => (
            <View style={{ backgroundColor: colors.primaryWhite, paddingTop: 5 }} key={tag}>
              <ShoppingListItemConsult
                list={list.ingredients.filter(ingredient => ingredient.ingredient.shelf_tag === tag)}
                dispatch={dispatch}
                navigation={navigation}
                tag={dTag[tag]}
                baseList={list}
              />
            </View>
          ))}
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
