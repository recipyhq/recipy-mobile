import { ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  deleteShoppingList, getAllShoppingList, getShoppingList,
} from '../../../api/recipe';
import { showShoppingList } from '../../../actions/recipe';
import colors from '../../../config/colors';
import Loader from '../../../components/Loaders/Loader/Loader';
import AllShoppingListItems from '../../../components/ShoppingList/AllShoppingListItems';

class AllShoppingList extends Component {
  componentDidMount() {
    this.handleGetAllShoppingList();
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handlePressNext(shoppinglist) {
    const { dispatch, navigation } = this.props;
    const promiseGetShoppingList = id => new Promise((resolve, reject) => {
      getShoppingList(dispatch, id, resolve, reject);
    });
    promiseGetShoppingList(shoppinglist.id).then(() => {
      const { currentShoppingList } = this.props;
      dispatch(showShoppingList(navigation, currentShoppingList));
    });
  }

  handleGetAllShoppingList() {
    const { dispatch } = this.props;
    getAllShoppingList(dispatch);
  }

  handleDeleteShoppingList(id) {
    const { dispatch } = this.props;
    deleteShoppingList(dispatch, id);
  }

  render() {
    const { allShopListItems } = this.props;
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
        style={{
          backgroundColor: colors.primaryWhite,
        }}
      >
        <Loader isLoading={this.isLoading} />
        {
          allShopListItems.map(shoppinglist => (
            <AllShoppingListItems
              key={shoppinglist.id.toString()}
              shoppingList={shoppinglist}
              onPress={() => (
                this.handlePressNext(shoppinglist))
              }
              onDelete={() => (
                this.handleDeleteShoppingList(shoppinglist.id))
              }
            />
          ))
        }
      </ScrollView>
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
};

function mapStateToProps(state) {
  return {
    recipesList: state.recipe.list,
    isLoading: state.recipe.isLoading,
    allShopListItems: state.recipe.allShopListItems,
    currentShoppingList: state.recipe.currentShoppingList,
  };
}

export default connect(mapStateToProps)(AllShoppingList);
