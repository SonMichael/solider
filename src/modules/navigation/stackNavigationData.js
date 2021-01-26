import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import MainTabNavigator from './MainTabNavigator';
import { colors, fonts } from '../../styles';
import HomeScreen from '../home/HomeViewContainer'
import SoliderDetailContainer from '../solider-detail/SoliderDetailContainer'
const ROUTE_SOLIDER_NAME = 'Soliders'
export const ROUTE_SOLIDER_DETAIL_NAME = 'Solider_Detail'
export const SCREEN_TREE = {
    [ROUTE_SOLIDER_NAME]: {
    },
    [ROUTE_SOLIDER_DETAIL_NAME]: {
    },
}
const StackNavigationData = [
  {
    name: ROUTE_SOLIDER_NAME,
    component: HomeScreen,
  },
  {
      name: ROUTE_SOLIDER_DETAIL_NAME,
      component: SoliderDetailContainer,
  }
]

export default StackNavigationData;