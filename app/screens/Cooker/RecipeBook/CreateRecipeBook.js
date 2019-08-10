import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Input } from 'react-native-elements';
import colors from '../../../config/colors';
import ButtonStd from '../../../components/Buttons/ButtonStd';
import Loader from '../../../components/Loaders/Loader/Loader';
import style from '../../../components/Style/style';
import { changeDescription, changeTitle } from '../../../actions/recipebook';
import { createRecipeBook } from '../../../api/recipebook';

class CreateRecipeBook extends Component {
  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  handlePressButton(title, desciption) {
    const { dispatch, navigation, user } = this.props;
    createRecipeBook(dispatch, user, title, desciption, navigation);
  }

  handleChangeTitle(text) {
    const { dispatch } = this.props;
    dispatch(changeTitle(text));
  }

  handleChangeDescription(text) {
    const { dispatch } = this.props;
    dispatch(changeDescription(text));
  }

  render() {
    const { recipeBookTitleCreation, recipeBookDescriptionCreation } = this.props;
    return (
      <View style={{ backgroundColor: colors.primaryWhite, flex: 1 }}>
        <Loader isLoading={this.isLoading} />
        <Input
          label="Titre du carnet de recette"
          onChangeText={(text) => { this.handleChangeTitle(text); }}
        />
        <Input
          label="Description"
          onChangeText={(text) => { this.handleChangeDescription(text); }}
        />
        <View style={style.buttonContainer}>
          <ButtonStd
            title="Créer le carnet de recette"
            onPress={() => {
              this.handlePressButton(recipeBookTitleCreation, recipeBookDescriptionCreation);
            }}
            buttonStyle={style.btnSendForm}
            fontSize={15}
            color={colors.primaryWhite}
          />
        </View>
      </View>
    );
  }
}

CreateRecipeBook.defaultProps = {
  isLoading: false,
  recipeBookDescriptionCreation: '',
  recipeBookTitleCreation: '',
};

function mapStateToProps(state) {
  return {
    recipeBookDescriptionCreation: state.recipebook.recipeBookDescriptionCreation,
    recipeBookTitleCreation: state.recipebook.recipeBookTitleCreation,
    isLoading: state.user.isLoading,
    user: state.user,
  };
}

CreateRecipeBook.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  recipeBookDescriptionCreation: PropTypes.string,
  recipeBookTitleCreation: PropTypes.string,
  isLoading: PropTypes.bool,
};
export default connect(mapStateToProps)(CreateRecipeBook);
