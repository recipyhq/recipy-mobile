import React from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableWithoutFeedback, Text,
} from 'react-native';
import { Card } from 'react-native-elements';
import colors from '../../config/colors';

const PlanningView = ({ onPress, dayPlan, planKey }) => (
  <View>
    {
    Object.values(planKey).map(key => (
      <TouchableWithoutFeedback onPress={onPress(dayPlan[key].id)}>
        <View>
          <Card
            image={{ uri: dayPlan[key].image_url ? dayPlan[key].image_url : 'https://pngimage.net/wp-content/uploads/2018/06/not-found-png-3.png' }}
          >
            <View style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <Text style={{ fontWeight: 'bold', color: colors.primaryOrange, fontSize: 20 }}>
                {`${dayPlan[key].title}`}
              </Text>
            </View>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    ))
    }
  </View>
);

PlanningView.propTypes = {
  onPress: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dayPlan: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  planKey: PropTypes.object.isRequired,
};

export default PlanningView;
