
## react-native-scrollable-tabview

## Add it to your project

### Install

Run  `npm install @valdio/react-native-scrollable-tabview --save`
    
OR  `yarn add @valdio/react-native-scrollable-tabview`

### Import
`import {
 ScrollableTabView,
 DefaultTabBar,
 ScrollableTabBar,
} from '@valdio/react-native-scrollable-tabview'`

## Demo
|![Screenshot](https://github.com/valdio/react-native-scrollable-tabview/blob/master/demo_images/demo-fb.gif)|![Screenshot](https://github.com/valdio/react-native-scrollable-tabview/blob/master/demo_images/scrollable_example.mov.gif)|![Screenshot](https://github.com/valdio/react-native-scrollable-tabview/blob/master/demo_images/collapsible_demo.gif)|
| ------------- | ------------- | ------------- |

## Basic usage

```javascript
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview'

export default class App extends Component {
  render() {
    return (
      <ScrollableTabView>
        <ReactPage tabLabel="React" />
        <FlowPage tabLabel="Flow" />
        <JestPage tabLabel="Jest" />
      </ScrollableTabView>
    );
  }
};
```

## Injecting a custom tab bar

Suppose we had a custom tab bar called `CustomTabBar`, we would inject
it into our `ScrollableTabView` like this:

```javascript
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview'
import CustomTabBar from './CustomTabBar';

export default class App extends Component {
  render() {
    return (
      <ScrollableTabView renderTabBar={() => <CustomTabBar someProp={'here'} />}>
        <ReactPage tabLabel="React" />
        <FlowPage tabLabel="Flow" />
        <JestPage tabLabel="Jest" />
      </ScrollableTabView>
    );
  }
});``
```
To start you can just copy [DefaultTabBar](https://github.com/skv-headless/react-native-scrollable-tab-view/blob/master/DefaultTabBar.js).

## Changing between tabs

You can change tabs programmatically. Just use `goToPage` method.

```javascript
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview'

export default class App extends Component {
  render() {
    return <ScrollableTabView
      renderTabBar={() => <DefaultTabBar />}
      ref={(tabView) => { this.tabView = tabView; }}
    >
      <Text tabLabel='Tab #1'>My</Text>
      <Text tabLabel='Tab #2'>favorite</Text>
      <Text tabLabel='Tab #3'>project</Text>
      <TouchableOpacity tabLabel='Back' onPress={() => this.tabView.goToPage(0)}>
        <Text>Lets go back!</Text>
      </TouchableOpacity>
    </ScrollableTabView>;
  }
}
```

## Examples

[Example APP](https://github.com/valdio/react-native-scrollable-tabview/tree/master/examples/TestApp).


## Props

- **`renderTabBar`** _(Function:ReactComponent)_ - accept 1 argument `props` and should return a component to use as
  the tab bar. The component has `goToPage`, `tabs`, `activeTab` and
  `ref` added to the props, and should implement `setAnimationValue` to
  be able to animate itself along with the tab content. You can manually pass the `props` to the TabBar component.
- **`tabBarPosition`** _(String)_ Defaults to `"top"`.
  - `"bottom"` to position the tab bar below content.
  - `"overlayTop"` or `"overlayBottom"` for a semitransparent tab bar that overlays content. Custom tab bars must consume a style prop on their outer element to support this feature: `style={this.props.style}`.
- **`onChangeTab`** _(Function)_ - function to call when tab changes, should accept 1 argument which is an Object containing two keys: `i`: the index of the tab that is selected, `ref`: the ref of the tab that is selected
- **`onScroll`** _(Function)_ - function to call when the pages are sliding, should accept 1 argument which is an Float number representing the page position in the slide frame.
- **`locked`** _(Bool)_ - disables horizontal dragging to scroll between tabs, default is false.
- **`initialPage`** _(Integer)_ - the index of the initially selected tab, defaults to 0 === first tab.
- **`page`** _(Integer)_ - set selected tab(can be buggy see  [#126](https://github.com/brentvatne/react-native-scrollable-tab-view/issues/126)
- **`children`** _(ReactComponents)_ - each top-level child component should have a `tabLabel` prop that can be used by the tab bar component to render out the labels. The default tab bar expects it to be a string, but you can use anything you want if you make a custom tab bar.
- **`tabBarUnderlineStyle`** _([View.propTypes.style](https://facebook.github.io/react-native/docs/view.html#style))_ - style of the default tab bar's underline.
- **`tabBarBackgroundColor`** _(String)_ - color of the default tab bar's background, defaults to `white`
- **`tabBarActiveTextColor`** _(String)_ - color of the default tab bar's text when active, defaults to `navy`
- **`tabBarInactiveTextColor`** _(String)_ - color of the default tab bar's text when inactive, defaults to `black`
- **`tabBarTextStyle`** _(Object)_ - Additional styles to the tab bar's text. Example: `{fontFamily: 'Roboto', fontSize: 15}`
- **`style`** _([View.propTypes.style](https://facebook.github.io/react-native/docs/view.html#style))_ - Container style
- **`contentStyle`** _([View.propTypes.style](https://facebook.github.io/react-native/docs/view.html#style))_ - Content style
- **`contentProps`** _(Object)_ - props that are applied to root `ScrollView`/`ViewPagerAndroid`. Note that overriding defaults set by the library may break functionality; see the source for details.
- **`scrollWithoutAnimation`** _(Bool)_ - on tab press change tab without animation.
- **`prerenderingSiblingsNumber`** _(Integer)_ - pre-render nearby # sibling, `Infinity` === render all the siblings, default to 0 === render current page.
- **`pullToRefresh`** _(Function)_ - function to perform in case of a pull to refresh action. This function required a callback to stop the refresh animation. Follow the example bellow
- **`refreshControlStyle`** _(React style Object)_ - Style object applied to the `RefreshControl` React Component. 
- **`showsVerticalScrollIndicator`** _(Bool)_ - Show scroll indicator 
- **`showsHorizontalScrollIndicator`** _(Bool)_ - Show scroll indicator 

- **`disableTabBarOnLayout`** _(Bool)_ - Used on ScrollableTabBar to disable auto Layout of tabs. Auto-Layout sometimes causes a flickering effect. To disable ==> ```<ScrollableTabBar disableTabBarOnLayout={true}/>``` 
 
### Pull to refresh example

```javascript
import React, {Component} from 'react'
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview'

export default class Test extends Component {
  
  //execute callback in order to stop the refresh animation. 
  _onRefresh = (callback) => {
    networkRequest().then(response => callback(response))    
  } 
  
   render() {
      return <ScrollableTabView
        refreshControlStyle={{backgroundColor: 'red'}}
        pullToRefresh={this._onRefresh}
      >
        <ScrollView tabLabel="one" >
          <View>
            <Text>One</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="two" >
          <View>
            <Text>Two</Text>
          </View>
        </ScrollView>
   
      </ScrollableTabView>
    }
  }
```

**MIT Licensed**
