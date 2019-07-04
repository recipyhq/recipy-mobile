/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import colors from '../../../config/colors';
import style from '../../../components/Style/style';
import ButtonStd from '../../../components/Buttons/ButtonStd';
import PlanningView from '../../../components/Planning/PlanningView';

class Planning extends Component {
  get isLoading() {
    const { isLoading } = this.props;
    return isLoading;
  }

  render() {
    return (
      <View style={{
        backgroundColor: colors.primaryWhite,
      }}
      >
        <View style={style.buttonContainer}>
          <ButtonStd
            title="Créer un carnet de planning"
            onPress={() => {
              this.handleCreateNoteBook();
            }}
            buttonStyle={style.btnSendForm}
            fontSize={15}
            color={colors.primaryWhite}
          />
        </View>
        <View>
          <PlanningView />
        </View>
      </View>
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
