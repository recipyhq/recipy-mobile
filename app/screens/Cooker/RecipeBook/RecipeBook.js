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
import ButtonStd from '../../../components/Buttons/ButtonStd';

class RecipeBook extends Component {
  componentDidMount() {
    this.handleGetAllRecipeBook();
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handleGetAllRecipeBook() {
    const { dispatch, user } = this.props;
    getAllRecipeBook(dispatch, user);
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

  handleCreateNoteBook() {
    const { navigation } = this.props;
    navigation.navigate('CreateRecipeBook');
  }

  render() {
    const { resultBookList } = this.props;
    return (
      <View style={{
        backgroundColor: colors.primaryWhite,
      }}
      >
        <View style={style.buttonContainer}>
          <ButtonStd
            title="Créer un carnet de recette"
            onPress={() => {
              this.handleCreateNoteBook();
            }}
            buttonStyle={style.btnSendForm}
            fontSize={15}
            color={colors.primaryWhite}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1, alignItems: 'center', justifyContent: 'center', minHeight: '100%',
          }}
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
      </View>
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
    isLoading: state.recipebook.isLoading,
    currentRecipeBook: state.recipebook.currentRecipeBook,
    user: state.user,
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
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(RecipeBook);
