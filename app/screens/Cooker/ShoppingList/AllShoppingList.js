import {
  FlatList, ScrollView, TouchableHighlight, View,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  deleteShoppingList, getAllShoppingList, getShoppingList, searchForIngredient,
} from '../../../api/recipe';
import { changeSearchQuery, showShoppingList } from '../../../actions/recipe';
import colors from '../../../config/colors';
import Loader from '../../../components/Loaders/Loader/Loader';
import AllShoppingListItems from '../../../components/ShoppingList/AllShoppingListItems';
import style from '../../../components/Style/style';
import ButtonStd from '../../../components/Buttons/ButtonStd';
import styles from '../../Account/Authentication/styles';

class AllShoppingList extends Component {
  componentDidMount() {
    this.handleGetAllShoppingList();
    this.handleChangeSearchQuery('');
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handleChangeSearchQuery(text) {
    const { dispatch } = this.props;
    dispatch(changeSearchQuery(text));
  }

  handlePressSearchButton(search) {
    const { dispatch } = this.props;
    searchForIngredient(dispatch, search);
  }

  handlePressNext(shoppinglist) {
    const { dispatch, navigation, user } = this.props;
    const promiseGetShoppingList = id => new Promise((resolve, reject) => {
      getShoppingList(dispatch, id, resolve, reject, user);
    });
    promiseGetShoppingList(shoppinglist.id).then(() => {
      const { currentShoppingList } = this.props;
      dispatch(showShoppingList(navigation, currentShoppingList));
    });
  }

  handleGetAllShoppingList() {
    const { dispatch, user } = this.props;
    getAllShoppingList(dispatch, user);
  }

  handleDeleteShoppingList(id) {
    const { dispatch } = this.props;
    deleteShoppingList(dispatch, id);
  }

  handleNewShoppingList() {
    const { navigation } = this.props;
    navigation.navigate('ShoppingList', { item: null });
  }

  render() {
    const { allShopListItems } = this.props;
    return (
      <View>
        <View style={style.buttonContainer}>
          <ButtonStd
            title="Créer une liste de course"
            onPress={() => {
              this.handleNewShoppingList();
            }}
            buttonStyle={style.btnSendForm}
            fontSize={15}
            color={colors.primaryWhite}
          />
        </View>
        <ScrollView>
          <Loader isLoading={this.isLoading} />
          <View style={styles.container}>
            <FlatList
              data={allShopListItems}
              renderItem={({ item, index }) => (
                <TouchableHighlight onPress={() => (
                  this.handlePressNext(item))
                  }
                >
                  <View style={{
                    paddingTop: 6,
                    paddingBottom: 6,
                    flexDirection: 'row',
                    borderRadius: 1,
                    borderBottomWidth: 0.2,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: index % 2 === 0 ? colors.primaryWhite : colors.lightGrey,
                  }}
                  >
                    <AllShoppingListItems
                      key={item.id.toString()}
                      shoppingList={item}
                      onDelete={() => (
                        this.handleDeleteShoppingList(item.id))
                    }
                    />
                  </View>
                </TouchableHighlight>

              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

AllShoppingList.defaultProps = {
  isLoading: true,
  currentShoppingList: null,
};

AllShoppingList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  allShopListItems: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentShoppingList: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    recipesList: state.recipe.list,
    isLoading: state.recipe.isLoading,
    allShopListItems: state.recipe.allShopListItems,
    currentShoppingList: state.recipe.currentShoppingList,
    user: state.user,
    search: state.recipe.search,
  };
}

export default connect(mapStateToProps)(AllShoppingList);
