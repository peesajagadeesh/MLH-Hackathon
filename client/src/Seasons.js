import React, { Component } from 'react'
import axios from 'axios';
import SeasonTab from './SeasonTab';

export default class Seasons extends Component {
  state = {
    data: []
  }

  componentDidMount = () => {
    axios.get('/api').then((resp) => {
      // console.log(resp);
      this.setState({
        data: resp.data
      })
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          { this.state.data.map(season => <SeasonTab key={season._id} data={season}/>) }
        </div>
      </div>
    )
  }
}
