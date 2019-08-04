import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ListItem } from 'react-native-elements';
import ContainerView from '../components/ContainerView/ContainerView';
import colors from '../config/colors';
import ButtonStd from '../components/Buttons/ButtonStd';
import { SignOutUser } from '../actions/user';
import { getCurrentUser } from '../api/user';
import { userDefaultProfileImage } from '../config/user';

const styles = EStyleSheet.create({
  // Header
  header: {
    padding: 30,
    height: 170,
    backgroundColor: colors.primaryOrange,
  },
  firstName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.mediumGrey,
  },
  BtnEditProfile: {
    backgroundColor: colors.primaryOrange,
    padding: 0,
    margin: 0,
    justifyContent: 'flex-start',
  },
});

class Account extends Component {
  componentWillMount() {
    this.fetchCurrentUser();
  }

  static get defaultProps() {
    return {
      currentUser: null,
    };
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      currentUser: PropTypes.shape({
        email: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        url: PropTypes.string,
      }),
    };
  }

  get UserFirstName() {
    const { currentUser } = this.props;
    if (currentUser) return currentUser.firstname;
    return null;
  }

  get UserProfileImage() {
    const { currentUser } = this.props;
    if (currentUser) return currentUser.url;
    return userDefaultProfileImage;
  }

  fetchCurrentUser() {
    const { dispatch } = this.props;
    getCurrentUser(dispatch);
  }

  handleShowPublicProfile() {
    const { navigation } = this.props;
    navigation.navigate('Profile');
  }

  handlePressSignOut() {
    const { navigation, dispatch } = this.props;
    dispatch(SignOutUser(navigation));
  }

  handlePressEditProfile() {
    const { navigation } = this.props;
    navigation.navigate('ProfileEdit');
  }

  handleShowProducerProfile() {
    const { navigation } = this.props;
    navigation.navigate('ProducerProfile');
  }

  handlePressMyRecipes() {
    const { navigation } = this.props;
    navigation.navigate('MyRecipes');
  }

  handlePressRecipeBook() {
    const { navigation } = this.props;
    navigation.navigate('RecipeBook');
  }

  handlePressShoppingList() {
    const { navigation } = this.props;
    navigation.navigate('AllShoppingList');
  }

  render() {
    const SettingsItem = [
      {
        title: 'Mon profil',
        subtitle: 'Visualiser mon profil public',
        icon: 'id-card',
        onPress: () => this.handleShowPublicProfile(),
      },
      {
        title: 'Espace producteur',
        subtitle: 'Accéder à mon espace producteur',
        icon: 'bell',
        onPress: () => this.handleShowProducerProfile(),
      },
      {
        title: 'Mes recettes',
        subtitle: 'Accéder à mes recettes',
        icon: 'book',
        onPress: () => this.handlePressMyRecipes(),
      },
      {
        title: 'Mes carnets de recettes',
        subtitle: 'Accéder à l\'ensemble de vos recettes enregistrée par thème',
        icon: 'book',
        onPress: () => this.handlePressRecipeBook(),
      },
      {
        title: 'Mes listes de courses',
        subtitle: 'Prévoyez à l\'avance vos prochaines courses',
        icon: 'list-alt',
        onPress: () => this.handlePressShoppingList(),
      },
      {
        title: 'Déconnexion',
        subtitle: 'Vous souhaitez vous déconnecter ?',
        icon: 'sign-out',
        onPress: () => this.handlePressSignOut(),
      },
    ];
    return (
      <ContainerView>
        <View style={styles.header}>
          <View style={{ flex: 5, flexDirection: 'row' }}>
            <View style={{ flex: 3 }}>
              <Text style={styles.firstName}>
Bonjour
                { this.UserFirstName }
,
              </Text>
              <ButtonStd
                title="Editer mon profil"
                onPress={() => this.handlePressEditProfile()}
                buttonStyle={styles.BtnEditProfile}
                leftIcon={{
                  name: 'cog',
                  color: colors.primaryGrey,
                  size: 15,
                  type: 'font-awesome',
                }}
              />
            </View>
            <View style={{ flex: 2, alignItems: 'center' }}>
              <Image
                source={{ uri: this.UserProfileImage }}
                style={{ width: 80, height: 80 }}
                borderRadius={100}
              />
            </View>
          </View>
        </View>
        <View>
          {
            SettingsItem.map(item => (
              <ListItem
                key={item.title}
                leftIcon={{
                  name: item.icon,
                  color: colors.primaryGrey,
                  size: 15,
                  type: 'font-awesome',
                }}
                title={`${item.title}`}
                subtitle={(
                  <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>{item.subtitle}</Text>
                  </View>
                )}
                containerStyle={{}}
                onPress={(item.onPress) ? item.onPress : null}
              />
            ))
          }
        </View>
      </ContainerView>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.user.isLoading,
    currentUser: state.user.currentUser,
  };
}

export default connect(mapStateToProps)(Account);
