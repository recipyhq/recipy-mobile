import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Divider } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import ContainerView from '../../components/ContainerView/ContainerView';
import colors from '../../config/colors';
import RecipeListItem from './Recipies/RecipesList';
import { getProfileRecipes } from '../../api/recipe';

const { width } = Dimensions.get('window');

const styles = EStyleSheet.create({
  scrollViewContainer: { backgroundColor: colors.primaryWhite },
  profilePictureContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 230,
  },
  profilePictureBackground: {
    width: width * 8,
    height: width * 8,
    borderRadius: width * 8,
    backgroundColor: colors.primaryOrange,
    marginTop: (width * -8),
    alignItems: 'center',
  },
  profilePicture: {
    width: 200,
    height: 200,
    position: 'absolute',
    bottom: 0,
    borderRadius: 150,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 25,
    textAlign: 'center',
    color: colors.primaryGrey,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: colors.primaryGrey,
  },
  sectionTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.primaryGrey,
    fontWeight: 'bold',
  },
  recipesListError: {
    fontSize: 12,
    color: colors.primaryOrange,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 20,
  },
});

class Profile extends Component {
  componentWillMount() {
    this.getRecipesForUser();
  }

  getRecipesForUser() {
    const { dispatch } = this.props;
    getProfileRecipes(dispatch);
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  static get defaultProps() {
    return {
      recipeListForUser: [],
    };
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      isLoading: PropTypes.bool.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      recipeListForUser: PropTypes.array,
      profileRecipesErrorText: PropTypes.string.isRequired,
    };
  }

  render() {
    const { recipeListForUser, profileRecipesErrorText } = this.props;
    return (
      <ContainerView>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePictureBackground}>
              <Image
                style={styles.profilePicture}
                source={{ uri: 'https://scontent.fbcn1-1.fna.fbcdn.net/v/t1.0-9/27459906_1035169356624876_1812717769621987621_n.jpg?_nc_cat=110&_nc_ht=scontent.fbcn1-1.fna&oh=0604b5a65a51d76d8e2474b287eeec61&oe=5CDD2DE9' }}
              />
            </View>
          </View>
          <Text style={styles.profileName}>Guillaume.C </Text>
          <Divider style={styles.divider} />
          <Text style={styles.sectionTitle}>DERNIERES RECETTES</Text>
          {
            recipeListForUser.map(recipe => <RecipeListItem key={recipe.id} recipe={recipe} />)
          }
          <Text style={styles.recipesListError}>
            {profileRecipesErrorText}
          </Text>
        </ScrollView>
      </ContainerView>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipeListForUser: state.recipe.searchList,
    isLoading: state.recipe.isLoading,
    profileRecipesErrorText: state.recipe.profileRecipesErrorText,
  };
}

export default connect(mapStateToProps)(Profile);
