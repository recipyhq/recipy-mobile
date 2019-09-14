import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { showRecipe } from '../../actions/recipe';
import { getRecipe } from '../../api/recipe';

class PlanningViewTmp2 extends Component {
  static get defaultProps() {
    return {
      currentRecipe: null,
    };
  }

  static get propTypes() {
    return {
      recipe: PropTypes.shape(
        {
          title: PropTypes.string.isRequired,
          image_url: PropTypes.string,
          description: PropTypes.string,
          time: PropTypes.number,
        },
      ).isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      currentRecipe: PropTypes.object,
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
    };
  }

  handlePressShowDetails() {
    const { dispatch, navigation, recipe } = this.props;
    const promiseGetRecipe = id => new Promise((resolve, reject) => {
      getRecipe(dispatch, id, resolve, reject);
    });
    promiseGetRecipe(recipe.id).then(() => {
      const { currentRecipe } = this.props;
      dispatch(showRecipe(navigation, currentRecipe));
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.handlePressShowDetails()}>
        <View>
          <Card image={{ uri: 'https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F6111d734-09f5-4a94-abc7-c0af7fba9b94.2Ejpeg/750x562/quality/80/crop-from/center/authentique-et-delicieuse-mousse-au-chocolat.jpeg' }} />
          <Card image={{ uri: 'https://cdn-elle.ladmedia.fr/var/plain_site/storage/images/elle-a-table/recettes-de-cuisine/frites-maison-2079752/22101092-2-fre-FR/Frites-maison.jpg' }} />
          <Card image={{ uri: 'https://www.pizzalezebre.fr/wp-content/uploads/2019/01/Bolo.jpg' }} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentRecipe: state.recipe.currentRecipe,
  };
}

export default connect(mapStateToProps)(withNavigation(PlanningViewTmp2));
