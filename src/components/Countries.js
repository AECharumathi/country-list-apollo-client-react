import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Country from './Country';


const CONTINENT_QUERY = gql`
  query CountriesQuery {
    continent(code: "AS") {
      name
      code
      countries{
        name
        code
      }
    }
  }
`;

export class Countries extends Component {

  render() {
    return (
      <Fragment>
        <h1 className="display-4 my-3 head-style">Asian Countries</h1>
        <Query query={CONTINENT_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            console.log("countries "+data)
            return (
             
              <Fragment>
                 <div className="flex-display">
                {data.continent.countries.map(country => (
                  <Country key={country.code} country={country} />
                ))}
                </div>
              </Fragment>
              
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Countries;
