/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import {
  ScrollView, View,
  StyleSheet,
} from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Swiper from 'react-native-swiper';
import PlanningView from '../../../components/Planning/PlanningView';
import PlanningViewTmp1 from '../../../components/Planning/PlanningViewTmp1';
import PlanningViewTmp2 from '../../../components/Planning/PlanningViewTmp2';


const styles = StyleSheet.create({
  wrapper: {
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

class Planning extends Component {
  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false} showPagination={false}>
        <ScrollView>
          <PlanningView recipe={null} />
        </ScrollView>
        <View>
          <PlanningViewTmp1 recipe={null} />
        </View>
        <View>
          <PlanningViewTmp2 recipe={null} />
        </View>
      </Swiper>
    );
  }
}

Planning.defaultProps = {
  isLoading: true,
};


function mapStateToProps(state) {
  return {
    isLoading: state.planning.isLoading,
  };
}

Planning.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isLoading: PropTypes.bool,
};
export default connect(mapStateToProps)(Planning);
