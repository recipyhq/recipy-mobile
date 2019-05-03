import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Text,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PropTypes } from 'prop-types';
import ContainerView from '../../components/ContainerView/ContainerView';
import colors from '../../config/colors';
import OvalSquare from '../../components/Shapes/OvalSquare';

const styles = EStyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.primaryOrange,
  },
  producerName: {
    color: colors.primaryWhite,
    fontWeight: 'bold',
    fontSize: 30,
  },
  producerPicture: {
    width: 150,
    height: 150,
  },
  shortDescription: {
    color: colors.primaryWhite,
    fontSize: 20,
  },
});

class Profile extends Component {
  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      isLoading: PropTypes.bool.isRequired,
    };
  }

  render() {
    return (
      <ContainerView>
        <View style={styles.ovalShape}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
              style={styles.producerPicture}
              borderRadius={100}
            />
            <Text style={styles.producerName}>
              Biocoop
            </Text>
          </View>
          <OvalSquare color={colors.primaryGrey} bgColor={colors.primaryOrange}>
            <Text style={styles.shortDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Maecenas sed ipsum lorem. Mauris mauris dolor, eleifend sed est quis, euismod.
            </Text>
          </OvalSquare>
        </View>
      </ContainerView>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.recipe.isLoading,
  };
}

export default connect(mapStateToProps)(Profile);
