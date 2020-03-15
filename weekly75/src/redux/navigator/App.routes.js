import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';

// 引导页面
import WelcomePage from '../../pages/WelcomePage';
import HomePage from '../../pages/Latest';
import HistoryPage from '../../pages/History';
import SearchPage from '../../pages/Search';
import MinePage from '../../pages/Mine';

import Setting from '../../pages/Setting';
import Reader from '../../pages/Reader';
import MarkPage from '../../pages/MarkPage';
import AddPage from '../../pages/AddPage';
import WebPage from '../../pages/reader/WebPage';

const switchNavigationOptions = {
  gesturesEnabled: false,
  headerTitle: null,
};

const commonNavigationOptions = {
  tabBarVisible: false,
  headerShown: false,
};

const bottomTabOptions = (tabBarTitle, {iconName, typeName}, navTitle) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = ({tintColor, focused}) => {
    return <Icon name={iconName} type={typeName} size={25} color={tintColor} />;
  };
  const headerTitle = navTitle;
  const headerTitleStyle = {fontSize: 22, color: 'white', alignSelf: 'center'};
  // header的style
  const headerStyle = {backgroundColor: '#4ECBFC'};
  const tabBarVisible = true;
  return {
    tabBarLabel,
    tabBarIcon,
    tabBarVisible,
    headerTitle,
    headerTitleStyle,
    headerStyle,
  };
};

const AppTabNavigator = createBottomTabNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: () =>
        bottomTabOptions('最新', {
          iconName: 'book-open',
          typeName: 'feather',
        }),
    },
    HistoryPage: {
      screen: HistoryPage,
      navigationOptions: () =>
        bottomTabOptions('往期', {
          iconName: 'box',
          typeName: 'feather',
        }),
    },
    SearchPage: {
      screen: SearchPage,
      navigationOptions: () =>
        bottomTabOptions('搜索', {iconName: 'search', typeName: 'feather'}),
    },
    MinePage: {
      screen: MinePage,
      navigationOptions: () =>
        bottomTabOptions('我的', {iconName: 'user', typeName: 'feather'}),
    },
  },
  {
    initialRouteName: 'HomePage',
    tabBarOptions: {
      activeTintColor: '#FF9744',
      inactiveTintColor: 'gray',
    },
  },
);

let AppAllStack = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: commonNavigationOptions,
    },
    Setting: {
      screen: Setting,
      navigationOptions: commonNavigationOptions,
    },
    MarkPage: {
      screen: MarkPage,
      navigationOptions: commonNavigationOptions,
    },
    AddPage: {
      screen: AddPage,
      navigationOptions: commonNavigationOptions,
    },
    Reader: {
      screen: Reader,
      navigationOptions: commonNavigationOptions,
    },
    WebPage: {
      screen: WebPage,
      navigationOptions: commonNavigationOptions,
    },
  },
  {
    initialRouteName: 'TabNavigator',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      headerShown: false,
    },
  },
);

const SplashStack = createSwitchNavigator(
  {
    SplashPage: {
      screen: WelcomePage,
      navigationOptions: switchNavigationOptions,
    },
    AppPage: {
      screen: AppAllStack,
      navigationOptions: switchNavigationOptions,
    },
  },
  {
    // mode: 'card',
    headerMode: 'none',
    initialRouteName: 'SplashPage',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

// const prefix = 'weekly://';

export default SplashStack;
