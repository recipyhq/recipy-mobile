import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import ContainerView from '../../components/ContainerView/ContainerView';

const Home = () => (
  <ContainerView>
    <Text>
      Explorer les recettes...
    </Text>
  </ContainerView>
);

export default connect()(Home);
