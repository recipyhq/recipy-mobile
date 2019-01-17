import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Text, Image, FlatList,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { List, ListItem } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import ContainerView from '../components/ContainerView/ContainerView';
import colors from '../config/colors';
import ButtonStd from '../components/Buttons/ButtonStd';

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

class Settings extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
    };
  }

  handlePressEditProfile() {
    const { navigation } = this.props;
    navigation.navigate('Profile');
  }

  render() {
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
          <List>
            <FlatList
              data={[
                {
                  title: 'Notifications',
                  subtitle: 'COMING SOON',
                  icon: 'bell',
                },
                {
                  title: 'Déconnexion',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
                {
                  title: 'A',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
                {
                  title: 'B',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
                {
                  title: 'C',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
                {
                  title: 'D',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
                {
                  title: 'E',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
                {
                  title: 'F',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
                {
                  title: 'G',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
                {
                  title: 'H',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
                {
                  title: 'I',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
                {
                  title: 'J',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
                {
                  title: 'K',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
                {
                  title: 'L',
                  subtitle: 'COMING SOON',
                  icon: 'sign-out',
                },
              ]}
              renderItem={({ item }) => (
                <ListItem
                  leftIcon={{
                    name: item.icon,
                    color: colors.primaryGrey,
                    size: 15,
                    type: 'font-awesome',
                  }}
                  title={`${item.title}`}
                  subtitle={item.subtitle}
                  containerStyle={{}}
                />
              )}
              keyExtractor={item => item.title}
            />
          </List>
        </View>

      </ContainerView>
    );
  }
}

export default connect()(Settings);
