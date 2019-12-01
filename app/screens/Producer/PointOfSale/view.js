import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import {
  Image, ScrollView, Text, View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import colors from '../../../config/colors';
import ContainerView from '../../../components/ContainerView/ContainerView';
import OvalSquare from '../../../components/Shapes/OvalSquare';
import EntityPreviewItem from '../../../components/EntityPreviewItem/EntityPreviewItem';
import { getPointOfSale } from '../../../api/point_of_sale';
import 'moment/locale/fr';
import 'moment/locale/fr-ca';
import 'moment/locale/fr-ch';

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
  componentDidMount() {
    const { navigation, dispatch } = this.props;
    const id = navigation.getParam('id', null);
    getPointOfSale(dispatch, id);
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      isLoading: PropTypes.bool.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.any.isRequired,
      dispatch: PropTypes.func.isRequired,
      currentPointOfSale: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        address: PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
          entilted: PropTypes.string,
          city: PropTypes.string,
          country: PropTypes.string,
          state: PropTypes.string,
          zip: PropTypes.string,
        }),
        openning_hours: PropTypes.arrayOf(PropTypes.shape({
          close: PropTypes.string,
          day: PropTypes.string,
          id: PropTypes.number.isRequired,
          open: PropTypes.string,
        })),
        products: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string,
        })),
        user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          first_name: PropTypes.string.isRequired,
          last_name: PropTypes.string.isRequired,
          url: PropTypes.string,
        }),
      }),
    };
  }

  static get defaultProps() {
    return {
      currentPointOfSale: null,
    };
  }

  get pointOfSale() {
    const { currentPointOfSale } = this.props;
    return currentPointOfSale;
  }

  get pointOfSaleName() {
    return (this.pointOfSale && this.pointOfSale.name) ? this.pointOfSale.name : '';
  }

  get producer() {
    return (this.pointOfSale && this.pointOfSale.user) ? this.pointOfSale.user : null;
  }

  get producerName() {
    return (this.producer) ? `${this.producer.first_name} ${this.producer.last_name}` : '';
  }

  get pointOfSaleFullAddress() {
    return (this.pointOfSale && this.pointOfSale.address)
      ? `${this.pointOfSale.address.entilted} à ${this.pointOfSale.address.city} (${this.pointOfSale.address.zip}), ${this.pointOfSale.address.country}` : null;
  }

  get pointOfSaleLatitude() {
    return (
      this.pointOfSale
      && this.pointOfSale.address
      && this.pointOfSale.address.latitude
    ) ? this.pointOfSale.address.latitude : 48.8534;
  }

  get pointOfSaleLongitude() {
    return (
      this.pointOfSale
      && this.pointOfSale.address
      && this.pointOfSale.address.longitude
    ) ? this.pointOfSale.address.longitude : 2.3488;
  }

  render() {
    Moment.locale('fr');
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
                  {this.pointOfSaleName}
                </Text>
              </View>
            </View>
            <OvalSquare
              color={colors.primaryGrey}
              bgColor={colors.primaryOrange}
            />
            <View style={styles.pointOfSaleHeaderInfoContainer}>
              <View style={styles.pointOfSaleHeaderRow}>
                <Icon style={styles.headerIcon} name="user" size={30} color={colors.primaryOrange} />
                <Text style={styles.placeholder}>
                  {`${this.producerName} est propriétaire de ce point de vente`}
                </Text>
              </View>
              <View style={styles.pointOfSaleHeaderRow}>
                <Icon style={styles.headerIcon} name="map-marker" size={30} color={colors.primaryOrange} />
                <Text style={styles.location}>
                  {this.pointOfSaleFullAddress}
                </Text>
              </View>
              <View style={styles.pointOfSaleHeaderRow}>
                <Icon style={styles.headerIcon} name="clock-o" size={30} color={colors.primaryOrange} />
                <View style={styleOpeningHours.container}>
                  {
                    this.pointOfSale
                    && this.pointOfSale.openning_hours
                    && this.pointOfSale.openning_hours.map(openingHour => (
                      <View style={styleOpeningHours.entry} key={openingHour.id}>
                        <Text style={styleOpeningHours.day}>
                          {openingHour.day}
                        </Text>
                        <Text style={styleOpeningHours.time}>
                          { `de ${Moment(openingHour.open).format('HH:mm')} à ${Moment(openingHour.close).format('HH:mm')}` }
                        </Text>
                      </View>
                    ))
                  }
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>
              Produits disponibles
            </Text>
          </View>
          <ScrollView horizontal style={styles.pointOfSalesContainer}>
            {
              this.pointOfSale
              && this.pointOfSale.products
              && this.pointOfSale.products.map(product => (
                <EntityPreviewItem
                  onPress={() => {}}
                  text={product.id.toString()}
                  key={product.id}
                />
              ))
            }
          </ScrollView>
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>
              Localisation
            </Text>
          </View>
          <View style={styles.mapContainer}>
            {
              this.pointOfSaleLatitude && this.pointOfSaleLongitude && (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  region={{
                    latitude: this.pointOfSaleLatitude,
                    longitude: this.pointOfSaleLongitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }}
                  scrollEnabled={false}
                >
                  {
                    this.pointOfSale
                    && this.pointOfSale.address
                    && this.pointOfSale.address.latitude
                    && this.pointOfSale.address.longitude && (
                      <Marker
                        title={this.pointOfSaleName}
                        pinColor={colors.primaryOrange}
                        coordinate={{
                          latitude: this.pointOfSaleLatitude,
                          longitude: this.pointOfSaleLongitude,
                          latitudeDelta: 0.015,
                          longitudeDelta: 0.0121,
                        }}
                      />
                    )
                  }
                </MapView>
              )
            }
          </View>
        </ScrollView>
      </ContainerView>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.recipe.isLoading,
    currentPointOfSale: state.pointOfSale.currentPointOfSale,
  };
}

export default connect(mapStateToProps)(Profile);
