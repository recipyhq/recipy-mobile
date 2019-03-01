import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import ContainerView from '../../components/ContainerView/ContainerView';

function Profile() {
  return (
    <ContainerView>
      <Text>Bienvenue sur le profil de XXXX</Text>
    </ContainerView>
  );
}

export default connect()(Profile);
