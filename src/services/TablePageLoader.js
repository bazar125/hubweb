
import FlashlightSearch from '@/services/FlashlightSearch';

/* we'll need ths for later
"body": [
  "query": [
      "bool": [
          "must": [
              [ "match_phrase_prefix": [ "firstName": searchTokens[0]] ],
              [ "matchs_phrase_prefix": [ "lastName": searchTokens[1]] ]
          ]
      ]
  ]
      */

const flashlightSearch = new FlashlightSearch();
/* eslint-disable no-underscore-dangle */
export default class TablePageLoader {
  constructor(type) {
    this.type = type;

    this.load = (page) => {
      console.log(`loadPage ${page}`);
      const size = 10;
      const from = (page - 1) * size;
      const query = {
        sort: [
          { timestamp: 'desc' },
        ],
        query: {
          match_all: { boost: 1.0 },
        },
      };

      return flashlightSearch.search(this.type, query, from, size)
        .then((dat) => {
          console.log(dat);
          for (let i = 0; i < dat.hits.length; i += 1) {
            const hit = dat.hits[i];
            // TODO: Extract this part for when refactoring
            if (hit.completionStatus === 'Payment Due') {
              hit._rowVariant = 'danger';
            } else if (hit.completionStatus === 'Unconfirmed') {
              hit._rowVariant = 'alert';
            }
          }
          return {
            items: dat.hits,
            totalRows: dat.total,
          };
        });
    };
  }
}
