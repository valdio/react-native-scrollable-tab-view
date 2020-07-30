import React from 'react';
import {Platform, SafeAreaView, Text, View} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native';

import CollapsibleExample from './app/CollapsibleExample';
import OverlayExample from './app/OverlayExample';
import ScrollableTabsExample from './app/ScrollableTabsExample';
import ScrollableTabsExampleMultiple from './app/ScrollableTabsExampleMultiple';
import FBTabBar from './app/FBTabBar';
import SimpleExample from './app/SimpleExample';
import DynamicExample from './app/DynamicExample';

import {ROUTE} from './app/lib/route';

const IndexRoutes = () => (
  <View style={styles.nav}>
    {routes.map((route) => (
      <Link
        key={route.index}
        to={route.route}
        underlayColor="#f0f4f7"
        style={styles.navItem}>
        <Text>{route.title}</Text>
      </Link>
    ))}
  </View>
);

const routes = [
  {
    index: 0,
    title: 'Home',
    route: ROUTE.INDEX,
    component: <IndexRoutes />,
  },
  {
    index: 1,
    title: 'Tab Bar',
    route: ROUTE.TAB_BAR,
    component: <FBTabBar />,
  },
  {
    index: 2,
    title: 'Simple Example',
    route: ROUTE.SIMPLE_EXAMPLE,
    component: <SimpleExample />,
  },
  {
    index: 3,
    route: ROUTE.OVERLAY,
    title: 'Overlay',
    component: <OverlayExample />,
  },
  {
    index: 4,
    route: ROUTE.SCROLLABLE_TABS,
    title: 'Scrollable tabs',
    component: <ScrollableTabsExample />,
  },
  {
    index: 5,
    route: ROUTE.SCROLLABLE_TABS_MULTIPLE,
    title: 'Scrollable tabs multiple',
    component: <ScrollableTabsExampleMultiple />,
  },
  {
    index: 6,
    route: ROUTE.DYNAMIC_TABS,
    title: 'Dynamic Tabs',
    component: <DynamicExample />,
  },
  {
    index: 7,
    route: ROUTE.COLLAPSIBLE_TABS,
    title: 'CollapsibleExample',
    component: <CollapsibleExample />,
  },
];

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>{_renderRoutes()}</View>
    </SafeAreaView>
  );
}

_renderRoutes = () => (
  <NativeRouter>
    <View style={styles.container}>
      {routes.map((route) => {
        // const Component = route.component
        return (
          <Route
            key={route.index}
            exact
            path={route.route}
            component={() => route.component}
          />
        );
      })}
    </View>
  </NativeRouter>
);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  nav: {
    flexDirection: 'column',
  },
  navItem: {
    alignItems: 'center',
    padding: 30,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
};
