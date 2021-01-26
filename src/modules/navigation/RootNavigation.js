import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import StackNavigationData from './stackNavigationData';

const Stack = createStackNavigator();

export default function NavigatorView(props) {
  // if (authState.isLoggedIn || authState.hasSkippedLogin) {
  //     return <AppNavigator />;
  // }
  // return <AuthScreen />;

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
      {StackNavigationData.map((item, idx) => {
        return (
            <Stack.Screen
                key={`stack_item-${idx+1}`}
                name={item.name}
                component={item.component}
            />
        )
      })}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100 + '%',
    height: '100%',
      backgroundColor:'red'
  },
});