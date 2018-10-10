import React from 'react'
import ReactNative from 'react-native'

const {TouchableOpacity} = ReactNative

export default Button = (props) => {
  return <TouchableOpacity {...props}>
    {props.children}
  </TouchableOpacity>
}

