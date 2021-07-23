import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

const COUNTRY_QUERY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      emoji
      phone
      continent {
        name
      }
      currency
      languages {
        code
        name
      }
      states {
        name
      }
    }
  }
`;

export class Country extends Component {
  render() {
    let { code } = this.props.match.params;
    // code = parseInt(code);
    return (
      <Fragment>
        <Query query={COUNTRY_QUERY} variables={{ code }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            const {
              name,
              native,
              capital,
              emoji,
              phone,
              continent,
              currency,
              languages,
              states,
            } = data.country;

            return (
              <div>
                <h1 className="display-4 my-3">
                  <span className="head-style">{name}</span>
                </h1>
                <h3 className="mb-3 ">About</h3>
                <table id="country">
                  <tr>
                    <th>Capital</th>
                    <td>{capital}</td>
                  </tr>
                  <tr>
                    <th>Continent</th>
                    <td>{continent.name}</td>
                  </tr>
                  <tr>
                    <th> Native</th>
                    <td>{native}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{phone}</td>
                  </tr>
                  <tr>
                    <th>Emoji</th>
                    <td> {emoji}</td>
                  </tr>
                  <tr>
                    <th>Currency</th>
                    <td>{currency}</td>
                  </tr>
                  <tr>
                    <th>Languages Spoken</th>
                    {languages.length > 0 ? (
                      languages.map((lang) => (
                        <tr>
                        <td>{lang.name}</td>
                        </tr>
                      ))
                    ) : (
                      <td>-</td>
                    )}{" "}
                  </tr>
                  <tr>
                    <th>States</th>
                    {states.length > 0 ? (
                      states.map((state) => (
                        <tr>
                        <td>{state.name}</td>
                        </tr>
                      ))
                    ) : (
                      <td>-</td>
                    )}
                  </tr>
                </table>

                <hr />
                <Link to="/" className="btn btn-secondary">
                  Back
                </Link>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Country;
