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
import EntityPreviewItem from '../../components/EntityPreviewItem/EntityPreviewItem';

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
    marginBottom: 10,
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
          <EntityPreviewItem
            image="https://facebook.github.io/react/logo-og.png"
            onPress={() => this.handlePressPointOfSale()}
            text="Biocoop Paris II"
          />
          <EntityPreviewItem
            image="data:image/png;base64,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"
            onPress={() => this.handlePressPointOfSale()}
            text="Biocoop Paris II"
          />
          <EntityPreviewItem
            image="https://facebook.github.io/react/logo-og.png"
            onPress={() => this.handlePressPointOfSale()}
            text="Biocoop Paris II"
          />
          <EntityPreviewItem
            image="https://facebook.github.io/react/logo-og.png"
            onPress={() => this.handlePressPointOfSale()}
            text="Biocoop Paris II"
          />
          <EntityPreviewItem
            image="https://facebook.github.io/react/logo-og.png"
            onPress={() => this.handlePressPointOfSale()}
            text="Biocoop Paris II"
          />
        </ScrollView>
        <ScrollView horizontal style={styles.pointOfSalesContainer} />
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
