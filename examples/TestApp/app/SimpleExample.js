import React, {Component} from 'react'
import {Text, View} from 'react-native'

import {ScrollableTabView, DefaultTabBar} from 'react-native-scrollable-tabview'

export default class SimpleExample extends Component {
  render() {
    return (
      <ScrollableTabView
        style={{marginTop: 20}}
        renderTabBar={() => <DefaultTabBar/>}
      >
        <Text tabLabel='Tab #1'>My</Text>
        <Text tabLabel='Tab #2'>favorite</Text>
        <Text tabLabel='Tab #3'>project</Text>
      </ScrollableTabView>
    )
  }
}
