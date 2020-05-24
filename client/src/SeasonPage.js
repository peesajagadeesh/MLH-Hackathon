import React, { Component } from 'react'

export default class SeasonPage extends Component {

  render() {
    console.log(this.props)
    return <div>
    { this.props.id }
    </div>;
  }
}
