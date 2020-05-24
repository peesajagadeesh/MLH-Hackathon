import React, { Component } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

export default class SeasonPage extends Component {

  state = {
    data: {},
    mute: false,
  }

  componentDidMount = () => {
    axios.get(`/api/${this.props.id}`).then((resp) => {
      console.log(resp);
      this.setState({
        data: resp.data
      })
    });
  }

  render() {
    const Vid = this.state.data.Vid;
    if (!Vid) {
      return null;
    }
    const playerVars = {
      controls: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 1,
      loop: 1,
      start: 30,
      playlist: Vid,
      mute: this.state.mute ? 1 : 0
    }
    const opts = {
      allow: "autoplay; fullscreen",
      frameBorder: "0",
      playerVars
    }
    console.log(Vid);
    return (<div>
    <div className="video-background">
      <div className="video-foreground">
        <YouTube videoId={ Vid } opts={opts} />
      </div>
    </div>
    <div id="vidtop-content">
      <div className="vid-info">
        <h1>{this.state.data.Place}</h1>
        {/* <button type="button" className="btn btn-sm btn-outline-secondary">Mute</button> */}
      </div>
    </div>
    </div>);
  }
}
