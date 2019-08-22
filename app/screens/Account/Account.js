import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ListItem } from 'react-native-elements';
import ContainerView from '../../components/ContainerView/ContainerView';
import colors from '../../config/colors';
import ButtonStd from '../../components/Buttons/ButtonStd';
import { SignOutUser } from '../../actions/user';
import { userDefaultProfileImage } from '../../config/constants';
import Loader from '../../components/Loaders/Loader/Loader';

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
  static get defaultProps() {
    return {
      currentUser: null,
    };
  }

  static get propTypes() {
    return {
      isLoading: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      currentUser: PropTypes.shape({
        email: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        url: PropTypes.string,
        isProducer: PropTypes.boolean,
      }),
    };
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  get UserFirstName() {
    const { currentUser } = this.props;
    console.log('------------');
    console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------'); console.log('------------');
    console.log('USER FIRSTNAME : ', currentUser);
    if (currentUser && currentUser.first_name) return currentUser.first_name;
    return null;
  }

  get UserProfileImage() {
    const { currentUser } = this.props;
    return (currentUser && currentUser.url) ? currentUser.url : userDefaultProfileImage;
  }

  handlePressForgottenPassword() {
    const { navigation } = this.props;
    navigation.navigate('ForgottenPassword');
  }

  handlePressSignUp() {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  }

  handlePressSignIn() {
    const { navigation } = this.props;
    navigation.navigate('SignIn');
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

  renderWhenLoggedIn() {
    const { currentUser } = this.props;
    const SettingsItem = [];
    SettingsItem.push({
      title: 'Mon profil',
      subtitle: 'Visualiser mon profil public',
      icon: 'id-card',
      onPress: () => this.handleShowPublicProfile(),
    });
    if (currentUser.isProducer === true) {
      SettingsItem.push({
        title: 'Espace producteur',
        subtitle: 'Accéder à mon espace producteur',
        icon: 'bell',
        onPress: () => this.handleShowProducerProfile(),
      });
    }
    SettingsItem.push({
      title: 'Mes recettes',
      subtitle: 'Accéder à mes recettes',
      icon: 'book',
      onPress: () => this.handlePressMyRecipes(),
    });
    SettingsItem.push({
      title: 'Mes carnets de recettes',
      subtitle: 'Accéder à l\'ensemble de vos recettes enregistrée par thème',
      icon: 'book',
      onPress: () => this.handlePressRecipeBook(),
    });
    SettingsItem.push({
      title: 'Mes listes de courses',
      subtitle: 'Prévoyez à l\'avance vos prochaines courses',
      icon: 'list-alt',
      onPress: () => this.handlePressShoppingList(),
    });
    SettingsItem.push({
      title: 'Déconnexion',
      subtitle: 'Vous souhaitez vous déconnecter ?',
      icon: 'sign-out',
      onPress: () => this.handlePressSignOut(),
    });
    return (
      <ContainerView>
        <Loader isLoading={this.isLoading} />
        <View style={styles.header}>
          <View style={{ flex: 5, flexDirection: 'row' }}>
            <View style={{ flex: 3 }}>
              <Text style={styles.firstName}>
                {this.UserFirstName ? `Bonjour ${this.UserFirstName}` : 'Bonjour,'}
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
                style={{ width: 110, height: 110 }}
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

  renderWhenNotLoggedIn() {
    const SettingsItem = [
      {
        title: 'Pourquoi nous rejoindre',
        subtitle: 'Découvrez tous les avantages à devenir membre de Recipy',
        icon: 'question',
        onPress: () => {},
      },
      {
        title: 'Créer un compte',
        subtitle: 'Vous êtes nouveau ? C\'est par ici !',
        icon: 'id-card',
        onPress: () => this.handlePressSignUp(),
      },
      {
        title: 'Se connecter',
        subtitle: 'On se connait ?',
        icon: 'user',
        onPress: () => this.handlePressSignIn(),
      },
      {
        title: 'J\'ai oublié mon mot de passe',
        subtitle: 'Pas de panique, voyons ça ensemble',
        icon: 'exclamation',
        onPress: () => this.handlePressForgottenPassword(),
      },
    ];

    return (
      <ContainerView>
        <Loader isLoading={this.isLoading} />
        <View style={styles.header}>
          <View style={{ flex: 5, flexDirection: 'row' }}>
            <View style={{ flex: 3 }}>
              <Text style={styles.firstName}>
                {'Bonjour,'}
              </Text>
              <Text style={styles.inviteToSignUp}>
                {'Creez un compte ou connectez-vous pour reçevoir une expérience personnalisée'}
              </Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center' }}>
              <Image
                source={{ uri: this.UserProfileImage }}
                style={{ width: 110, height: 110 }}
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

  render() {
    const { currentUser } = this.props;
    return (currentUser !== null) ? this.renderWhenLoggedIn() : this.renderWhenNotLoggedIn();
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.user.isLoading,
    currentUser: state.user.currentUser,
  };
}

export default connect(mapStateToProps)(Account);
