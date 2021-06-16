const fetch = require('cross-fetch');
const fs = require('fs');

/*

  Updates the possible types for the Apollo InMemoryCache
  Usage: node ./scripts/fetchPossibleTypes.js <server> <api bearer token>
  Example usage: node ./scripts/fetchPossibleTypes.js https://staging.onarchipelago.com eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5UbEZSRE5FTmpFd09EYzBNMFl4UkRkRk16SXlOa1F4UWtaRVF6UXpORVE1T1RNNU5VWXpOdyJ9.eyJodHRwczovL29uYXJjaGl

*/

const args = process.argv.slice(2);

const url = args[0];
if (!url) {
  console.log('No url!');
  return;
}

const token = args[1];
if (!token) {
  console.log('No token!');
  return;
}

fetch(`${url}/api/graphql/query`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    query: `
      query IntrospectionQuery {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => {
    return result.json();
  })
  .then((result) => {
    const possibleTypes = {};

    result.data.__schema.types.forEach((supertype) => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
      }
    });

    fs.writeFile(
      'src/components/Apollo/possibleTypes.json',
      JSON.stringify(possibleTypes),
      (err) => {
        if (err) {
          console.error('Error writing possibleTypes.json', err);
        } else {
          console.log('Fragment types successfully extracted!');
        }
      },
    );
  });
