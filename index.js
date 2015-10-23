import Twitter from 'twit';
import { merge, flatten, concat, splitEvery, join, map, compose } from 'ramda';

function usersLookupPromise(tokens, ids) {
  return new Promise((resolve, reject) => {
    const client = new Twitter(tokens);
    const options = { user_id: join(',', ids), include_entities: false };
    const handler = (err, res) => {
      console.log(!err ? 'resolve' : 'reject');
      !err ? resolve(res) : reject(err)
    };
    client.post('users/lookup', options, handler);
  });
}

function ids2userObjects(tokens, ids, cb) {
  const userLookupPromises = compose(map(usersLookupPromise.bind(null, tokens)), splitEvery(100));
  const handler = (...userObjects) => cb(null, flatten(userObjects));
  // cb(new Error('YOLO'))
  return Promise.all(userLookupPromises(ids))
    .then(handler, err => {
      console.log(err);
      return cb(err);
    }).catch(err => {
      console.log(err);
      return cb(err);
    });
}

function accumulate(get, options, followersIds, tokens, cb) {
  get(options, (err, { ids, next_cursor_str: cursor } = res) => {
    if (err) return cb(err);
    var accumulatedFollowersIds = concat(followersIds, ids);
    if (cursor === '0') {
      return ids2userObjects(tokens, accumulatedFollowersIds, cb);
    }
    return accumulate(get, merge(options, { cursor }), accumulatedFollowersIds, tokens, cb);
  });
}

export default function getTwitterFollowers(tokens, username, cb) {
  const client = new Twitter(tokens);
  const get = client.get.bind(client, 'followers/ids');
  const options = { screen_name: username, stringify_ids: true, count: 5000 };
  return accumulate(get, options, [], tokens, cb);
};
