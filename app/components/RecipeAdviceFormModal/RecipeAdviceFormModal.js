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
    };
  }

  static get defaultProps() {
    return {
      userAdvice: null,
    };
  }

  handleChangeMark(mark) {
    const { dispatch } = this.props;
    dispatch(changeUserRecipeMark(mark));
  }

  handleChangeComment(comment) {
    const { dispatch } = this.props;
    dispatch(changeUserRecipeComment(comment));
  }

  handlePressSend() {
    const { dispatch, userAdvice } = this.props;
    saveRecipeAdvice(dispatch, userAdvice);
  }

  render() {
    return (
      <View style={style.background}>
        <View style={style.container}>
          <Text style={style.modalTitle}>Laisser un avis</Text>
          <Input
            placeholder="0/10"
            inputStyle={style.input}
            onChangeText={(mark) => {
              this.handleChangeMark(mark);
            }}
          />
          <Input
            placeholder="Commentaire de la recette"
            inputStyle={style.input}
            onChangeText={(comment) => {
              this.handleChangeComment(comment);
            }}
          />
          <ButtonStd title="Enregistrer mon avis" onPress={() => {}} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userAdvice: state.userAdvice,
  };
}

export default connect(mapStateToProps)(RecipeAdviceFormModal);
