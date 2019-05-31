import React, { Component } from 'react';
import {
  Image, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { PropTypes } from 'prop-types';
import styles from './style';

class RecipeAdviceItem extends Component {
  static get propTypes() {
    return {
      // eslint-disable-next-line react/forbid-prop-types
      navigation: PropTypes.object.isRequired,
      data: PropTypes.object.isRequired,
    };
  }

  handlePressAuthorPicture() {
    const { navigation } = this.props;
    navigation.navigate('Profile');
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableWithoutFeedback onPress={() => this.handlePressAuthorPicture()}>
            <Image
              source={{ uri: data.author.image }}
              style={styles.authorImage}
              borderRadius={100}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.adviceContentContainer}>
          <Text style={styles.authorName}>{data.author.firstName}</Text>
          <Text style={styles.adviceDate}>{data.message.date}</Text>
          <Text style={styles.adviceText}>{data.message.content}</Text>
        </View>
      </View>
    );
  }
}
export default RecipeAdviceItem;
