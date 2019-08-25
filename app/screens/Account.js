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

const styles = EStyleSheet.create({
  // Header
  header: {
    padding: 30,
    height: 110,
  },
  firstName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.mediumGrey,
  },
  BtnEditProfile: {
    backgroundColor: colors.primaryWhite,
    padding: 0,
    margin: 0,
    justifyContent: 'flex-start',
  },
});

class Account extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
    };
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
    navigation.navigate('Profile');
  }

  handleShowProducerProfile() {
    const { navigation } = this.props;
    navigation.navigate('ProducerProfile');
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
              <Text style={styles.firstName}>Bonjour,</Text>
              <ButtonStd
                title="Editer mon profil"
                onPress={() => this.handlePressEditProfile()}
                buttonStyle={styles.BtnEditProfile}
                fontSize={15}
                color={colors.primaryGrey}
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
                source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
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

export default connect()(Account);
