import React, {Component} from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';

import {
  ScrollableTabView,
  DefaultTabBar,
} from 'react-native-scrollable-tabview';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';

const images = [img1, img2, img3];

export default class OverlayExample extends Component {
  render() {
    return (
      <ScrollableTabView
        style={styles.container}
        renderTabBar={() => (
          <DefaultTabBar backgroundColor="rgba(255, 255, 255, 0.7)" />
        )}
        tabBarPosition="overlayTop">
        <ScrollView tabLabel="iOS">
          {images.map((image) => (
            <Image source={image} style={styles.icon} />
          ))}
        </ScrollView>
        <ScrollView tabLabel="Android">
          {images.map((image) => (
            <Image source={image} style={styles.icon} />
          ))}
        </ScrollView>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
