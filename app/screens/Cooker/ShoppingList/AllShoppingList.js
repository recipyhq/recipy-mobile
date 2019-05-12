import { ScrollView, View } from 'react-native';
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
import style from '../../../components/Style/style';
import ButtonStd from '../../../components/Buttons/ButtonStd';

class AllShoppingList extends Component {
  componentDidMount() {
    this.handleGetAllShoppingList();
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
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
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1, alignItems: 'center', justifyContent: 'center',
          }}
          style={{
            backgroundColor: colors.primaryWhite,
          }}
        >
          <Loader isLoading={this.isLoading} />
          <View style={style.view}>
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
  };
}

export default connect(mapStateToProps)(AllShoppingList);
