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
import * as SecureStore from 'expo-secure-store';
import ContainerView from '../../components/ContainerView/ContainerView';
import colors from '../../config/colors';
import OvalSquare from '../../components/Shapes/OvalSquare';
import EntityPreviewItem from '../../components/EntityPreviewItem/EntityPreviewItem';
import { followProducer, getCurrentUser, getUserProfile } from '../../api/user';
import { userDefaultProfileImage } from '../../config/constants';
import { getPointOfSales } from '../../api/point_of_sale';
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
  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('producerId', null);
    this.fetchData(id);
  }

  get producer() {
    const { producer } = this.props;
    return producer;
  }

  get producerPointsOfSale() {
    const { producerPointsOfSale } = this.props;
    return producerPointsOfSale;
  }

  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  static get defaultProps() {
    return {
      producer: null,
      producerPointsOfSale: [],
    };
  }

  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      isLoading: PropTypes.bool.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      producer: PropTypes.shape({
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        url: PropTypes.string,
        bio: PropTypes.string,
      }),

      producerPointsOfSale: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      })),

      currentUser: PropTypes.shape(PropTypes.shape({
        id: PropTypes.string.isRequired,
        followed_users: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired,
        })),
      })),
      dispatch: PropTypes.func.isRequired,
    };
  }

  get producerProfileImage() {
    return (this.producer && this.producer.url) ? this.producer.url : userDefaultProfileImage;
  }

  get producerName() {
    return (this.producer) ? `${this.producer.first_name} ${this.producer.last_name}` : null;
  }

  get producerDescription() {
    return (this.producer) ? this.producer.bio : null;
  }

  get pointsOfSaleWithCoordinates() {
    return this.producerPointsOfSale.filter(elem => elem.latitude && elem.longitude);
  }

  async fetchData(id) {
    let userId = id;
    const { dispatch } = this.props;
    if (id === undefined || id === null) userId = await SecureStore.getItemAsync('userId');
    getCurrentUser(dispatch);
    getUserProfile(dispatch, userId);
    getPointOfSales(dispatch, userId);
  }

  handlePressPointOfSale(id) {
    const { navigation } = this.props;
    navigation.navigate('PointOfSaleView', {
      id,
    });
  }

  render() {
    return (
      <ContainerView>
        <View>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={{ uri: this.producerProfileImage }}
                style={styles.producerPicture}
                borderRadius={100}
              />
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.producerName}>
                {this.producerName}
              </Text>
            </View>
          </View>
          <OvalSquare
            color={colors.primaryGrey}
            bgColor={colors.primaryOrange}
          />
          <Text style={styles.shortDescription}>
            {this.producerDescription}
          </Text>
          {
            this.props.currentUser.followed_users.filter(user => this.producer.id === user.id).length > 0 & (
              <ButtonStd
                title="Suivre ce producteur"
                onPress={() => {
                  const { dispatch } = this.props;
                  followProducer(dispatch, this.producer.id);
                }}
              />
            )
          }
        </View>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>
            Les points de ventes proches de chez moi
          </Text>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 48.8534,
              longitude: 2.3488,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            scrollEnabled={false}
          >
            {
              this.pointsOfSaleWithCoordinates.map(pointOfSale => (
                <Marker
                  key={pointOfSale.id}
                  title={pointOfSale.name}
                  pinColor={colors.primaryOrange}
                  coordinate={{
                    latitude: pointOfSale.latitude,
                    longitude: pointOfSale.longitude,
                  }}
                />
              ))
            }
          </MapView>
        </View>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>
            Points de vente de ce producteur
          </Text>
        </View>
        <ScrollView horizontal style={styles.pointOfSalesContainer}>
          {
            this.producerPointsOfSale.map(pointOfSale => (
              <EntityPreviewItem
                image={this.producerProfileImage}
                onPress={() => this.handlePressPointOfSale(pointOfSale.id)}
                text={pointOfSale.name}
                key={pointOfSale.id}
              />
            ))
          }
        </ScrollView>
        <ScrollView horizontal style={styles.pointOfSalesContainer} />
      </ContainerView>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.recipe.isLoading,
    producerPointsOfSale: state.pointOfSale.pointsOfSale,
    producer: state.user.currentProfileUser,
    currentUser: state.user.currentUser,
  };
}

export default connect(mapStateToProps)(Profile);
