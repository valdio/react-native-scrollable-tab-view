import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import pin from './assets/pin.png';

function TabBar({style, tabs, goToPage}) {
  return (
    <View style={[styles.tabs, style]}>
      {tabs.map((tab, i) => {
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => goToPage(i)}
            style={styles.tab}>
            <Image source={pin} style={{height: 30, width: 30}} />
            <Text>Item {i}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});

export default TabBar;
