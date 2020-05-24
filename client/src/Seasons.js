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
        <section class="jumbotron text-center">
          <div class="container">
            <h1>Virtual Walker</h1>
            <p class="lead text-muted">A simple and fun way to connect with outdoors during this quarantine.</p>
          </div>
        </section>
        <div className="row">
          { this.state.data.map(season => <SeasonTab key={season._id} data={season}/>) }
        </div>
      </div>
    )
  }
}
