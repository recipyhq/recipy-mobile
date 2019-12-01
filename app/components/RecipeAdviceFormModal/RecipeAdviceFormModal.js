import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import style from './style';
import ButtonStd from '../Buttons/ButtonStd';
import { changeUserRecipeComment, changeUserRecipeMark } from '../../actions/recipe';
import { saveRecipeAdvice } from '../../api/recipe';

class RecipeAdviceFormModal extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      userAdvice: PropTypes.shape({
        mark: PropTypes.number,
        comment: PropTypes.string,
      }),
      currentRecipe: PropTypes.shape({
        id: PropTypes.number,
      }),
    };
  }

  static get defaultProps() {
    return {
      userAdvice: null,
      currentRecipe: null,
    };
  }

  handleChangeMark(mark) {
    const { dispatch } = this.props;
    dispatch(changeUserRecipeMark(parseInt(mark, 10)));
  }

  handleChangeComment(comment) {
    const { dispatch } = this.props;
    dispatch(changeUserRecipeComment(comment));
  }

  handlePressSend() {
    const { dispatch, currentRecipe, userAdvice } = this.props;
    saveRecipeAdvice(dispatch, currentRecipe, userAdvice);
  }

  render() {
    return (
      <View style={style.background}>
        <View style={style.container}>
          <Text style={style.modalTitle}>Laisser un avis</Text>
          <Input
            placeholder="Une note sur 5"
            inputStyle={style.input}
            onChangeText={(mark) => {
              this.handleChangeMark(mark);
            }}
            keyboardType="numeric"
          />
          <Input
            placeholder="Commentaire de la recette"
            inputStyle={style.input}
            onChangeText={(comment) => {
              this.handleChangeComment(comment);
            }}
          />
          <ButtonStd title="Enregistrer mon avis" onPress={() => { this.handlePressSend(); }} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userAdvice: state.recipe.userAdvice,
    currentRecipe: state.recipe.currentRecipe,
  };
}

export default connect(mapStateToProps)(RecipeAdviceFormModal);
