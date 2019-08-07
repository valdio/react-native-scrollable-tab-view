import React, {Component} from 'react'
import {ScrollView, Text, View, StyleSheet} from 'react-native'
import {ScrollableTabView, ScrollableTabBar} from 'react-native-scrollable-tabview'

const tabs = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
export default class ScrollableTabsExampleMultiple extends Component {
  render() {
    return <ScrollableTabView
      style={{marginTop: 20}}
      initialPage={5}
      renderTabBar={() => <ScrollableTabBar/>}
      tabBarTextStyle={styles.tabText}
      collapsableBar={<View style={styles.collapsibleTabBar}><Text>{Math.random() * 1000}</Text></View>}>
      {tabs.map((tab, index) => buildTab('Tab', index))}
    </ScrollableTabView>
  }
}
const buildTab = (label, index) =>
  <View key={`tab_${index}`} tabLabel={`${label} ${index}`}>
    <ScrollView>
      <Text>{`${label} ${index}`}</Text>
      <Text>{`${label} ${index}`}</Text>
    </ScrollView>
  </View>


const styles = StyleSheet.create({
  tabText: {
    fontSize: 13,
    lineHeight: 17,
    textAlign: 'left',
    fontStyle: 'normal',
    color: 'red'
  },
  collapsibleTabBar: {
    backgroundColor: 'blue',
    paddingVertical: 20,
    minHeight: 80
  }

})
