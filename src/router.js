import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {faChartArea} from '@fortawesome/free-solid-svg-icons';
import Home from './routes/Home.js';
import {NavigationContainer} from '@react-navigation/native';
import Filter from './routes/Filter.js';
import {View, Image, Text} from 'react-native';
import {Detail} from './routes/Detail.js';
import EastView from './routes/EastView.js';
import WestView from './routes/WestView.js';
import NorthView from './routes/NorthView.js';
import SouthView from './routes/SouthView.js';
import IslandView from './routes/IslandView.js';
import Favorites from './routes/Favorites.js';

const Tabs = createBottomTabNavigator();
const TabsNavigator = () => (
  <Tabs.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarStyle: {height: 80},
      tabBarLabelStyle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 7,
        alignItems: 'center',
        color: '#0093e9',
      },
      tabBarIconStyle: {marginTop: 5},
    }}>
    <Tabs.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        tabBarLabel: '首頁',
        tabBarLabelStyle: {fontSize: 16, color: '#0093e9'},
        headerTitleStyle: {fontFamily: 'Roboto-Bold'},
        tabBarIcon: ({focused, color}) => (
          <FontAwesomeIcon
            icon={faHouse}
            size={25}
            color={focused ? '#0093e9' : '#787878'}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="Filter"
      component={Filter}
      options={{
        headerShown: false,
        tabBarLabel: '地區篩選',
        tabBarLabelStyle: {fontSize: 16, color: '#0093e9'},
        headerTitleStyle: {fontFamily: 'Roboto-Bold'},
        tabBarIcon: ({focused, color}) => (
          <FontAwesomeIcon
            icon={faChartArea}
            size={27}
            color={focused ? '#00A283' : '#787878'}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="Favorites"
      component={Favorites}
      options={{
        headerShown: false,
        tabBarLabel: '我的最愛',
        tabBarLabelStyle: {fontSize: 16, color: '#0093e9'},
        headerTitleStyle: {fontFamily: 'Roboto-Bold'},
        tabBarIcon: ({focused, color}) => (
          <FontAwesomeIcon
            icon={faHeart}
            size={25}
            color={focused ? '#FB37A0' : '#787878'}
          />
        ),
      }}
    />
  </Tabs.Navigator>
);

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Tabs"
    screenOptions={{
      headerStyle: {backgroundColor: '#7EDBE8'},
    }}>
    <Stack.Screen
      name="Tabs"
      component={TabsNavigator}
      options={{
        headerTitle: () => (
          //自製headerTitle
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Roboto-SemiBold',
                fontSize: 24,
                alignItems: 'center',
                textAlign: 'center',
                marginLeft: 55,
                marginTop: 4,
              }}>
              台灣文化景觀導覽
            </Text>
            <Image
              source={require('C:/Users/i16k3/Desktop/funmapapp/assets/png/travel.png')}
              style={{width: 55, height: 50, marginBottom: 8}}
              resizeMode="contain"
            />
          </View>
        ),
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="Detail"
      component={Detail}
      options={({route}) => ({
        title: route.params.data.caseName,
        headerTitleAlign: 'center',
      })}
    />
    <Stack.Screen
      name="WestView"
      component={WestView}
      options={{
        title: '中部地區',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'Roboto-Bold',
          color: '#333',
        },
      }}
    />
    <Stack.Screen
      name="EastView"
      component={EastView}
      options={{
        title: '東部地區',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'Roboto-Bold',
          color: '#333',
        },
      }}
    />
    <Stack.Screen
      name="NorthView"
      component={NorthView}
      options={{
        title: '北部地區',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'Roboto-Bold',
          color: '#333',
        },
      }}
    />
    <Stack.Screen
      name="SouthView"
      component={SouthView}
      options={{
        title: '南部地區',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'Roboto-Bold',
          color: '#333',
        },
      }}
    />
    <Stack.Screen
      name="IslandView"
      component={IslandView}
      options={{
        title: '離島地區',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'Roboto-Bold',
          color: '#333',
        },
      }}
    />
  </Stack.Navigator>
);

const Router = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Router;
