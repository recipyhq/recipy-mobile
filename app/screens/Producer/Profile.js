import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image, ScrollView,
  Text,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PropTypes } from 'prop-types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ContainerView from '../../components/ContainerView/ContainerView';
import colors from '../../config/colors';
import OvalSquare from '../../components/Shapes/OvalSquare';
import ButtonStd from '../../components/Buttons/ButtonStd';

const styles = EStyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.primaryOrange,
    padding: 15,
    paddingBottom: -100,
  },
  headerLeft: {
    display: 'flex',
    flex: 1,
  },
  headerRight: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  producerName: {
    color: colors.primaryWhite,
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
  },
  producerPicture: {
    width: 150,
    height: 150,
  },
  ovalSquare: {
  },
  shortDescription: {
    color: colors.primaryWhite,
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.primaryGrey,
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  sectionTitle: {
    color: colors.primaryOrange,
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 15,
  },
  mapContainer: {
    flex: 1,
    height: 300,
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  map: {
    ...EStyleSheet.absoluteFillObject,
  },
  pointOfSalesContainer: {
    marginLeft: 15,
    flex: 1,
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
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
    };
  }

  handlePressPointOfSale() {
    const { navigation } = this.props;
    navigation.navigate('PointOfSaleView');
  }

  render() {
    return (
      <ContainerView>
        <ScrollView>
          <View style={styles.ovalShape}>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Image
                  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ1K_C-OZoaeFxO1Kjdj39n6w0awvDx5qtHMW2xMbS-pPqo-uM' }}
                  style={styles.producerPicture}
                  borderRadius={100}
                />
              </View>
              <View style={styles.headerRight}>
                <Text style={styles.producerName}>
                  Biocoop
                </Text>
              </View>
            </View>
            <OvalSquare
              style={styles.ovalSquare}
              color={colors.primaryGrey}
              bgColor={colors.primaryOrange}
            />
            <Text style={styles.shortDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Maecenas sed ipsum lorem. Mauris mauris dolor, eleifend sed est quis, euismod.
            </Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>
              Carte des points de vente
            </Text>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: 50.6319422,
                longitude: 3.057544,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              <Marker
                title="Biocoop 1"
                pinColor={colors.primaryOrange}
                coordinate={{
                  latitude: 50.6319422,
                  longitude: 3.057544,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              />
              <Marker
                title="Biocoop 2"
                pinColor={colors.primaryOrange}
                coordinate={{
                  latitude: 50.6311422,
                  longitude: 3.057144,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              />
              <Marker
                title="Biocoop 3"
                pinColor={colors.primaryOrange}
                coordinate={{
                  latitude: 50.6319422,
                  longitude: 3.051144,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              />
            </MapView>
          </View>
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>
              Proche de vous
            </Text>
          </View>
          <ScrollView horizontal style={styles.pointOfSalesContainer}>
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ1K_C-OZoaeFxO1Kjdj39n6w0awvDx5qtHMW2xMbS-pPqo-uM' }}
              style={styles.producerPicture}
              borderRadius={100}
            />
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ1K_C-OZoaeFxO1Kjdj39n6w0awvDx5qtHMW2xMbS-pPqo-uM' }}
              style={styles.producerPicture}
              borderRadius={100}
            />
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ1K_C-OZoaeFxO1Kjdj39n6w0awvDx5qtHMW2xMbS-pPqo-uM' }}
              style={styles.producerPicture}
              borderRadius={100}
            />
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ1K_C-OZoaeFxO1Kjdj39n6w0awvDx5qtHMW2xMbS-pPqo-uM' }}
              style={styles.producerPicture}
              borderRadius={100}
            />
          </ScrollView>
          <ButtonStd title="Point de vente" onPress={() => this.handlePressPointOfSale()} />
        </ScrollView>
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
