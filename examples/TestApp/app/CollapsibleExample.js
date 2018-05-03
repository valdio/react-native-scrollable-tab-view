import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

const FirstRoute = () => <View style={[styles.container, {}]}>
  <Text>shkfeAAAAAAAAAAAAAAAAAAAAAAAAgffsd</Text>
  <Text>shkfeAAAAAAAAAAAAAAAAAAAAAAAAgffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>shkfegffsd</Text>
  <Text>ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ</Text>
</View>
const SecondRoute = () => <View style={[styles.container, {backgroundColor: '#673ab7'}]}/>
const ThirdRoute = () => <View style={[styles.container, {backgroundColor: '#31b714'}]}/>
const FourthRoute = () => <View style={[styles.container, {backgroundColor: '#b7230b'}]}/>

import {ScrollableTabView, DefaultTabBar} from 'react-native-scrollable-tab-view'

export default class CollapsibleExample extends Component {
  render() {
    const collapsableComponent = (
      <View style={{height: 300, backgroundColor: 'yellow', width: '100%'}}>
      </View>
    )

    return <ScrollableTabView collapsableBar={collapsableComponent}
                              tabBarBackgroundColor="white"
                              renderTabBar={() => <DefaultTabBar/>}
    >
      <View tabLabel='iOS' style={{backgroundColor: 'blue'}}>
        <FirstRoute/>
      </View>
      <View tabLabel='Android' style={{backgroundColor: 'blue'}}>
        <FirstRoute/>
        <FirstRoute/>
      </View>
    </ScrollableTabView>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }

})
