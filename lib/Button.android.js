import React from 'react'
import ReactNative from 'react-native'

const {TouchableNativeFeedback} = ReactNative

export default Button = (props) =>
  <TouchableNativeFeedback
    delayPressIn={0}
    background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
    {...props}
  >
    {props.children}
  </TouchableNativeFeedback>


