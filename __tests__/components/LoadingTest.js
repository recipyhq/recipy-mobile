import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import Loader from '../../app/components/Loaders/Loader/Loader';

it('renders correctly', () => {
  const tree = renderer.create(
    <Loader isLoading />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
