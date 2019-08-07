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

import {ScrollableTabView, DefaultTabBar} from 'react-native-scrollable-tabview'

export default class CollapsibleExample extends Component {
  _onRefresh = (callback) => {
    callback && setTimeout(callback({test: 'dkjdd'}, 3000))
  }

  render() {
    const collapsableComponent = (
      <View style={{height: 300, backgroundColor: 'yellow', width: '100%'}}>
      </View>
    )

    return <ScrollableTabView
      pullToRefresh={this._onRefresh}
      collapsableBar={collapsableComponent}
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
