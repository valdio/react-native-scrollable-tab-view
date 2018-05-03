import React, {Component} from 'react'

export default class StaticContainer extends Component {

  shouldComponentUpdate(nextProps: Object): boolean {
    return !!nextProps.shouldUpdate
  }

  render(): ?ReactElement {
    const child = this.props.children
    if (child === null || child === false) {
      return null
    }
    return React.Children.only(child)
  }

}

