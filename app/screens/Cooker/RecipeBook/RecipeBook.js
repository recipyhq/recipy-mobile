/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import colors from '../../../config/colors';
import RecipeBookItem from '../../../components/Recipe/RecipeBook/RecipeBookItem';
import { getAllRecipeBook, getRecipeBook } from '../../../api/recipebook';
import Loader from '../../../components/Loaders/Loader/Loader';
import { showRecipeBook } from '../../../actions/recipebook';
import style from '../../../components/Style/style';

class RecipeBook extends Component {
  componentDidMount() {
    this.handleGetAllRecipeBook();
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handleGetAllRecipeBook() {
    const { dispatch } = this.props;
    getAllRecipeBook(dispatch);
  }

  handlePressNext(book) {
    const { dispatch, navigation } = this.props;
    const promiseGetRecipeBook = id => new Promise((resolve, reject) => {
      getRecipeBook(dispatch, id, resolve, reject);
    });
    promiseGetRecipeBook(book.id).then(() => {
      const { currentRecipeBook } = this.props;
      dispatch(showRecipeBook(navigation, currentRecipeBook));
    });
  }

  render() {
    const { resultBookList } = this.props;
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
        style={{
          backgroundColor: colors.primaryWhite,
        }}
      >
        <Loader isLoading={this.isLoading} />
        <View style={style.view}>
          {
          resultBookList.map(book => (
            <RecipeBookItem
              key={book.id.toString()}
              recipe={book}
              onPress={() => (
                this.handlePressNext(book))
              }
            />
          ))
        }
        </View>
      </ScrollView>
    );
  }
}

RecipeBook.defaultProps = {
  isLoading: true,
  resultBookList: [],
  currentRecipeBook: null,
};


function mapStateToProps(state) {
  return {
    resultBookList: state.recipebook.resultBookList,
    isLoading: state.user.isLoading,
    currentRecipeBook: state.recipebook.currentRecipeBook,
  };
}

RecipeBook.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  resultBookList: PropTypes.array,
  // eslint-disable-next-line react/forbid-prop-types
  currentRecipeBook: PropTypes.object,
};
export default connect(mapStateToProps)(RecipeBook);
