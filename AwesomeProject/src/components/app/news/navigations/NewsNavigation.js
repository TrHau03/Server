import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Add from '../screens/Add';
import DetailCate from '../screens/DetailCate';
import Profile from '../screens/Profile';
const Tab = createBottomTabNavigator();
const NewsNavigation = () => {

  const configTab = (route) => {
    return {
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Home') {
          if (focused) {
            return <Image source={require('../../../../media/images/icon_HomeActive.png')} />
          } else {
            return <Image source={require('../../../../media/images/icon_Home.png')} />
          }
        } else if (route.name === 'Cate') {
          if (focused) {
            return <Image style={homeStyles.plus} source={require('../../../../media/images/plus.png')} />
          } else {
            return <Image style={homeStyles.plus} source={require('../../../../media/images/plus.png')} />
          }
        }


      },
      tabBarActiveTintColor: '#1877F2',
      tabBarInactiveTintColor: '#4E4B66',
      headerShown: false,
    }
  }
  return (
    <Tab.Navigator screenOptions={({ route }) => configTab(route)}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Detail" component={Detail} options={{
        tabBarButton: () => null,
        tabBarVisible: false,
      }} />
      <Tab.Screen name="DetailCate" component={DetailCate} options={{
        tabBarButton: () => null,
        tabBarVisible: false,
      }} />
      <Tab.Screen name="Cate" component={Add} />
      <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>
  );
};
const homeStyles = StyleSheet.create({
  plus: {
    width: 20,
    height: 20,
  }
});
export default NewsNavigation;
