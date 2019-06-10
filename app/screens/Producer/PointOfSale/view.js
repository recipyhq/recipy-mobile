import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import {
  Image, ScrollView, Text, View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../config/colors';
import ContainerView from '../../../components/ContainerView/ContainerView';
import OvalSquare from '../../../components/Shapes/OvalSquare';
import EntityPreviewItem from "../../../components/EntityPreviewItem/EntityPreviewItem";

const styleOpeningHours = EStyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  entry: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15,
    flex: 1,
  },
  day: {
    color: colors.primaryWhite,
    width: 100,
  },
  time: {
    color: colors.primaryWhite,
  },
});

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
  pointOfSaleHeaderInfoContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.primaryGrey,
  },
  pointOfSaleHeaderRow: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  placeholder: {
    color: colors.primaryOrange,
    marginLeft: 15,
    fontSize: 15,
  },
  location: {
    color: colors.primaryWhite,
    marginLeft: 15,
    fontSize: 15,
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
    };
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
            <View style={styles.pointOfSaleHeaderInfoContainer}>
              <View style={styles.pointOfSaleHeaderRow}>
                <Icon style={styles.headerIcon} name="user" size={30} color={colors.primaryOrange} />
                <Text style={styles.placeholder}>
                  Biocoop est propriétaire de ce point de vente
                </Text>
              </View>
              <View style={styles.pointOfSaleHeaderRow}>
                <Icon style={styles.headerIcon} name="map-marker" size={30} color={colors.primaryOrange} />
                <Text style={styles.location}>
                  180 rue de Tolbiac, 75013 Paris, France
                </Text>
              </View>
              <View style={styles.pointOfSaleHeaderRow}>
                <Icon style={styles.headerIcon} name="clock-o" size={30} color={colors.primaryOrange} />
                <View style={styleOpeningHours.container}>
                  <View style={styleOpeningHours.entry}>
                    <Text style={styleOpeningHours.day}>
                      Lundi
                    </Text>
                    <Text style={styleOpeningHours.time}>
                      09:00 12:00 | 14:00 20:00
                    </Text>
                  </View>
                  <View style={styleOpeningHours.entry}>
                    <Text style={styleOpeningHours.day}>
                      Mardi
                    </Text>
                    <Text style={styleOpeningHours.time}>
                      09:00 12:00 | 14:00 20:00
                    </Text>
                  </View>
                  <View style={styleOpeningHours.entry}>
                    <Text style={styleOpeningHours.day}>
                      Mercredi
                    </Text>
                    <Text style={styleOpeningHours.time}>
                      09:00 12:00 | 14:00 20:00
                    </Text>
                  </View>
                  <View style={styleOpeningHours.entry}>
                    <Text style={styleOpeningHours.day}>
                      Jeudi
                    </Text>
                    <Text style={styleOpeningHours.time}>
                      09:00 12:00 | 14:00 20:00
                    </Text>
                  </View>
                  <View style={styleOpeningHours.entry}>
                    <Text style={styleOpeningHours.day}>
                      Vendredi
                    </Text>
                    <Text style={styleOpeningHours.time}>
                      09:00 12:00 | 14:00 20:00
                    </Text>
                  </View>
                  <View style={styleOpeningHours.entry}>
                    <Text style={styleOpeningHours.day}>
                      Samedi
                    </Text>
                    <Text style={styleOpeningHours.time}>
                      09:00 12:00 | 14:00 20:00
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>
              Produits populaires
            </Text>
          </View>
          <ScrollView horizontal style={styles.pointOfSalesContainer}>
            <EntityPreviewItem
              image="https://cdn4.fermedesaintemarthe.com/I-Autre-23623_1200x1200-carotte-nantaise-2-ab.net.jpg"
              onPress={() => this.handlePressPointOfSale()}
              text="Carottes"
            />
            <EntityPreviewItem
              image="https://www.avogel.fr/blog/wp-content/uploads/2014/11/le-jus-de-pomme-de-terre-l-allie-de-votre-estomac-1-1580x770.jpg"
              onPress={() => this.handlePressPointOfSale()}
              text="Pommes de terre"
            />
          </ScrollView>
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>
              Localisation
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
              scrollEnabled={false}
            >
              <Marker
                title="Biocoop"
                pinColor={colors.primaryOrange}
                coordinate={{
                  latitude: 50.6319422,
                  longitude: 3.057544,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              />
            </MapView>
          </View>
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
