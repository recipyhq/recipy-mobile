import React from 'react';
import { SearchBar } from 'react-native-elements';
import ContainerView from '../../../components/ContainerView/ContainerView';

const RecipesList = () => (
  <ContainerView>
    <SearchBar
      onChangeText={() => {}}
      onClear={() => {}}
      placeholder="Gâteau bûche au citron et vodka..."
      lightTheme
      round
    />
  </ContainerView>
);

export default RecipesList;
