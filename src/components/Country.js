import React from 'react';
import { Link } from 'react-router-dom';
import './Country.css'

export default function Country({
  country: { name, code }
}) {
  return (
    <div className="card card-body mb-3 country-card">
      <div className="row country-padding">
        <div className="col-md-9">
          <h2>
            <span
              className="card-name-style"
            >
              {name}
            </span>
          </h2>
        </div>
        <div className="col-md-3">
          <span className="btn btn-secondary">
          <Link to={`/country/${code}`} className="link-style">
            About
          </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
