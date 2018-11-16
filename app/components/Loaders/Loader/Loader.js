import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import colors from '../../../config/colors';

const Loader = ({ isLoading }) => (
  <Modal
    transparent
    visible={isLoading}
    onRequestClose={() => {}}
  >
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator
          size="small"
          color={colors.primaryOrange}
        />
      </View>
    </View>
  </Modal>
);

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
