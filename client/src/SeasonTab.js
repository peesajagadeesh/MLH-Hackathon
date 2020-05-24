import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class SeasonTab extends Component {

  render() {
    const imgSrc = `https://img.youtube.com/vi/${this.props.data.Vid}/hqdefault.jpg`;
    return (
      <div className="col-md-4">
        <div className="card mb-4 shadow-sm">
          <svg className="bd-placeholder-img card-img-top" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail">
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#000000"></rect>
            <image href={ imgSrc } width="100%" height="200" />
          </svg>
          <div className="card-body">
            <p className="card-text">{this.props.data.Place}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <Link to={ `/ui/${this.props.data._id}` }>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Teleport</button>
                </Link>
              </div>
              <small className="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
