import React, {Component} from 'react'
import ReactNative from 'react-native'
import PropTypes from 'prop-types'

const {
  ViewPropTypes,
  Dimensions,
  View,
  Animated,
  ScrollView,
  StyleSheet,
  InteractionManager,
  Platform,
  RefreshControl
} = ReactNative

// import TimerMixin from 'react-timer-mixin'
import SceneComponent from './SceneComponent'
import DefaultTabBar from './DefaultTabBar'
import ScrollableTabBar from './ScrollableTabBar'

/**
 * pullToRefresh: function used to trigger pull to refresh action.
 *                Function muns have a callback response in order to stop pull to refresh action.
 * refreshControlStyle: style of RefreshControl
 */

class ScrollableTabView extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
    this._handleLayout = this._handleLayout.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.renderTabBar = this.renderTabBar.bind(this)
    this.updateSceneKeys = this.updateSceneKeys.bind(this)
    this.newSceneKeys = this.newSceneKeys.bind(this)
    this._shouldRenderSceneKey = this._shouldRenderSceneKey.bind(this)
    this._keyExists = this._keyExists.bind(this)
    this._makeSceneKey = this._makeSceneKey.bind(this)
    this.renderScrollableContent = this.renderScrollableContent.bind(this)
    this._composeScenes = this._composeScenes.bind(this)
    this._onMomentumScrollBeginAndEnd = this._onMomentumScrollBeginAndEnd.bind(this)
    this._updateSelectedPage = this._updateSelectedPage.bind(this)
    this.renderCollapsableBar = this.renderCollapsableBar.bind(this)
  }

  // mixins = [TimerMixin]

  /* getDefaultProps() {
     return {
       tabBarPosition: 'top',
       initialPage: 0,
       page: -1,
       onChangeTab: () => {
       },
       onScroll: () => {
       },
       contentProps: {},
       scrollWithoutAnimation: false,
       locked: false,
       prerenderingSiblingsNumber: 0
     }
   }*/

  getInitialState() {
    const width = Dimensions.get('window').width
    return {
      currentPage: this.props.initialPage,
      scrollX: new Animated.Value(this.props.initialPage * width),
      scrollValue: new Animated.Value(this.props.initialPage),
      containerWidth: width,
      sceneKeys: this.newSceneKeys({currentPage: this.props.initialPage}),
      refreshing: false
    }
  }

  _onRefresh = () => {
    //if there is not pullToRefresh function do nothing
    if (!this.props.pullToRefresh)
      return

    this.setState({refreshing: true})
    this.props.pullToRefresh(response => {
      this.setState({refreshing: false})
    })
  }

  componentDidMount() {
    setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        if (Platform.OS === 'android') {
          this.goToPage(this.props.initialPage, false)
        }
      })
    }, 0)

    this.state.scrollX.addListener(({value}) => {
      const scrollValue = value / this.state.containerWidth
      this.state.scrollValue.setValue(scrollValue)
      this.props.onScroll(scrollValue)
    })
  }

  componentWillReceiveProps(props) {
    if (props.children !== this.props.children) {
      this.updateSceneKeys({page: this.state.currentPage, children: props.children})
    }

    if (props.page >= 0 && props.page !== this.state.currentPage) {
      this.goToPage(props.page)
    }
  }

  goToPage(pageNumber, animated = !this.props.scrollWithoutAnimation) {
    const offset = pageNumber * this.state.containerWidth
    if (this.scrollView && this.scrollView._component && this.scrollView._component.scrollTo) {
      this.scrollView._component.scrollTo({x: offset, y: 0, animated})
    }

    const currentPage = this.state.currentPage
    this.updateSceneKeys({
      page: pageNumber,
      callback: this._onChangeTab.bind(this, currentPage, pageNumber)
    })
  }

  renderTabBar(props) {
    if (this.props.renderTabBar === false) {
      return null
    } else if (this.props.renderTabBar) {
      return React.cloneElement(this.props.renderTabBar(props), props)
    } else {
      return <DefaultTabBar {...props} />
    }
  }

  updateSceneKeys({
                    page, children = this.props.children, callback = () => {
    }
                  }) {
    let newKeys = this.newSceneKeys({previousKeys: this.state.sceneKeys, currentPage: page, children})
    this.setState({currentPage: page, sceneKeys: newKeys}, callback)
  }

  newSceneKeys({previousKeys = [], currentPage = 0, children = this.props.children}) {
    let newKeys = []
    this._children(children).forEach((child, idx) => {
      let key = this._makeSceneKey(child, idx)
      if (this._keyExists(previousKeys, key) ||
        this._shouldRenderSceneKey(idx, currentPage)) {
        newKeys.push(key)
      }
    })
    return newKeys
  }

  _shouldRenderSceneKey(idx, currentPageKey) {
    let numOfSibling = this.props.prerenderingSiblingsNumber
    return (idx < (currentPageKey + numOfSibling + 1) &&
      idx > (currentPageKey - numOfSibling - 1))
  }

  _keyExists(sceneKeys, key) {
    return sceneKeys.find((sceneKey) => key === sceneKey)
  }

  _makeSceneKey(child, idx) {
    return child.props.tabLabel + '_' + idx
  }

  renderScrollableContent() {
    //in case of the collapsible scroll view the pull to refresh animation  will be applied on the container
    //on the other case the refresh animations will be applied here.
    const isContainerScrollView = !!this.props.collapsableBar

    const scenes = this._composeScenes()
    return <Animated.ScrollView

      refreshControl={!isContainerScrollView && this.props.pullToRefresh && typeof this.props.pullToRefresh === 'function' &&
      <RefreshControl style={this.props.refreshControlStyle || {}}
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}/> || undefined}
      showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator}
      horizontal
      pagingEnabled
      automaticallyAdjustContentInsets={false}
      contentOffset={{x: this.props.initialPage * this.state.containerWidth}}
      ref={scrollView => this.scrollView = scrollView}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: this.state.scrollX}}}], {useNativeDriver: true})}
      onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
      onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
      scrollEventThrottle={16}
      scrollsToTop={false}
      scrollEnabled={!this.props.locked}
      directionalLockEnabled
      alwaysBounceVertical={false}
      keyboardDismissMode="on-drag"
      {...this.props.contentProps}
    >
      {scenes}
    </Animated.ScrollView>
  }

  _composeScenes() {
    return this._children().map((child, idx) => {
      let key = this._makeSceneKey(child, idx)
      let element

      if (!!this.props.collapsableBar) {
        element = this.state.currentPage === idx ? child : null
      } else {
        element = this._keyExists(this.state.sceneKeys, key) ? child : <View tabLabel={child.props.tabLabel}/>
      }

      return <SceneComponent
        key={child.key}
        shouldUpdated={!!this.props.collapsableBar || this._shouldRenderSceneKey(idx, this.state.currentPage)}
        style={{width: this.state.containerWidth}}
      >
        {element}
      </SceneComponent>
    })
  }

  _onMomentumScrollBeginAndEnd(e) {
    const offsetX = e.nativeEvent.contentOffset.x
    const page = Math.round(offsetX / this.state.containerWidth)
    if (this.state.currentPage !== page) {
      this._updateSelectedPage(page)
    }
  }

  _updateSelectedPage(nextPage) {
    let localNextPage = nextPage
    if (typeof localNextPage === 'object') {
      localNextPage = nextPage.nativeEvent.position
    }

    const currentPage = this.state.currentPage
    this.updateSceneKeys({
      page: localNextPage,
      callback: this._onChangeTab.bind(this, currentPage, localNextPage)
    })
  }

  _onChangeTab(prevPage, currentPage) {
    this.props.onChangeTab({
      i: currentPage,
      ref: this._children()[currentPage],
      from: prevPage
    })

    if (this.contentScrollDistance >= this.collapsableBarHeight) {
      this.contentView.scrollTo({x: 0, y: this.collapsableBarHeight, animated: false})
    }
  }

  _handleLayout(e) {
    const {width} = e.nativeEvent.layout
    if (Math.round(width) !== Math.round(this.state.containerWidth)) {
      this.setState({containerWidth: width})
      requestAnimationFrame(() => {
        this.goToPage(this.state.currentPage)
      })
    }
  }

  _children(children = this.props.children) {
    return React.Children.map(children, (child) => child)
  }

  renderCollapsableBar() {
    if (!this.props.collapsableBar) {
      return null
    }

    return React.cloneElement(this.props.collapsableBar, {
      onLayout: event => {
        this.collapsableBarHeight = event.nativeEvent.layout.height
      }
    })
  }

  render() {
    let overlayTabs = (this.props.tabBarPosition === 'overlayTop' || this.props.tabBarPosition === 'overlayBottom')
    let tabBarProps = {
      goToPage: this.goToPage,
      tabs: this._children().map((child) => child.props.tabLabel),
      activeTab: this.state.currentPage,
      scrollX: this.state.scrollX,
      scrollValue: this.state.scrollValue,
      containerWidth: this.state.containerWidth
    }

    if (this.props.tabBarBackgroundColor) {
      tabBarProps.backgroundColor = this.props.tabBarBackgroundColor
    }
    if (this.props.tabBarActiveTextColor) {
      tabBarProps.activeTextColor = this.props.tabBarActiveTextColor
    }
    if (this.props.tabBarInactiveTextColor) {
      tabBarProps.inactiveTextColor = this.props.tabBarInactiveTextColor
    }
    if (this.props.tabBarTextStyle) {
      tabBarProps.textStyle = this.props.tabBarTextStyle
    }
    if (this.props.tabBarUnderlineStyle) {
      tabBarProps.underlineStyle = this.props.tabBarUnderlineStyle
    }
    if (overlayTabs) {
      tabBarProps.style = {
        position: 'absolute',
        left: 0,
        right: 0,
        [this.props.tabBarPosition === 'overlayTop' ? 'top' : 'bottom']: 0
      }
    }
    const ContainerView = this.props.collapsableBar ? ScrollView : View
    const isScrollView = this.props.collapsableBar ? true : false

    return (<ContainerView

        refreshControl={isScrollView && this.props.pullToRefresh && typeof this.props.pullToRefresh === 'function' &&
        <RefreshControl style={this.props.refreshControlStyle || {}}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}/> || undefined}
        showsVerticalScrollIndicator={isScrollView && this.props.showsVerticalScrollIndicator}
        showsHorizontalScrollIndicator={isScrollView && this.props.showsHorizontalScrollIndicator}
        style={[styles.container, this.props.style]}
        onLayout={this._handleLayout} //()=>
        ref={contentView => this.contentView = contentView}
        onMomentumScrollEnd={event => {
          this.contentScrollDistance = event.nativeEvent.contentOffset.y
        }}
        stickyHeaderIndices={this.props.collapsableBar ? [1] : []}>
        <View style={[{flex: 1}, this.props.contentStyle || {}]}>
          {this.renderCollapsableBar()}
          {this.props.tabBarPosition === 'top' && this.renderTabBar(tabBarProps)}
          {this.renderScrollableContent()}
          {(this.props.tabBarPosition === 'bottom' || overlayTabs) && this.renderTabBar(tabBarProps)}
        </View>
      </ContainerView>
    )
  }
}

ScrollableTabView.defaultProps = {
  tabBarPosition: 'top',
  initialPage: 0,
  page: -1,
  onChangeTab: () => {
  },
  onScroll: () => {
  },
  contentProps: {},
  scrollWithoutAnimation: false,
  locked: false,
  prerenderingSiblingsNumber: 0
}

ScrollableTabView.propTypes = {
  tabBarPosition: PropTypes.oneOf(['top', 'bottom', 'overlayTop', 'overlayBottom']),
  initialPage: PropTypes.number,
  page: PropTypes.number,
  onChangeTab: PropTypes.func,
  onScroll: PropTypes.func,
  renderTabBar: PropTypes.any,
  style: ViewPropTypes.style,
  contentProps: PropTypes.object,
  scrollWithoutAnimation: PropTypes.bool,
  locked: PropTypes.bool,
  prerenderingSiblingsNumber: PropTypes.number,
  collapsableBar: PropTypes.node
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollableContentAndroid: {
    flex: 1
  }
})

module.exports = {
  DefaultTabBar,
  ScrollableTabBar,
  ScrollableTabView
}
