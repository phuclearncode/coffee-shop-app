// index.js
import React from 'react';
import { AppRegistry } from 'react-native';
import AppNavigator from './_layout'; // Đảm bảo nhập đúng AppNavigator
import { name as appName } from '../app.json';

const App = () => {
  return <AppNavigator />;
};

AppRegistry.registerComponent(appName, () => App);
