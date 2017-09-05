
import * as Firebase from 'firebase';

const ELASTIC_INDEX = 'motohub';

/* eslint-disable no-underscore-dangle */
export default class FlashlightSearch {
  constructor() {
    const svc = this;
    const database = Firebase.database();

    svc.mapping = {};

    svc.search = (type, qquery, from = -1, size = -1) => {
      const query = qquery;
      query.index = ELASTIC_INDEX;
      query.type = type;

      if (from >= 0 && size >= 0) {
        query.from = from;
        query.size = size;
      }

      const ref = database.ref().child('search');
      const key = ref.child('request').push(query).key;

      // console.log('search', key, query);

      return new Promise((resolve, reject) => {
        const func = (snap) => {
          if (!snap.exists()) {
            return;
          }

          const dat = snap.val().hits;

          snap.ref.off('value', func);
          snap.ref.remove();

          if (!dat) {
            // $log.error('FlashlightSearch dat is null');
            const val = snap.val();
            // $log.error(val.error);
            reject(val.error);

            return;
          }
          // flatten dat.hits and remove Elasticsearch metadata
          const flattenedHits = [];
          if (dat.hits) {
            for (let i = 0; i < dat.hits.length; i += 1) {
              const hit = dat.hits[i];
              const flattenedHit = hit._source;
              flattenedHit.$id = hit._id;
              flattenedHits.push(flattenedHit);
            }
          }

          dat.hits = flattenedHits;

          resolve(dat);
        };

        ref.child(`response/${key}`).on('value', func);
      });
    };

    svc.searchSimple = (type, simpleQuery, from, size) => {
      const queryObj = {
        q: simpleQuery,
      };

      return svc.search(type, queryObj, from, size);
    };
  }
}
