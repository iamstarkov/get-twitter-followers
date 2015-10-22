import Twitter from 'twit';
import { merge, isEmpty, concat, last } from 'ramda';

function accumulate(get, options, followers, cb) {
  get(options, (err, { ids, next_cursor_str: cursor } = res) => {
    if (err) return cb(err);
    var accumulatedFollowers = concat(followers, ids);
    if (cursor === '0') {
      return cb(null, accumulatedFollowers);
    }
    return accumulate(get, merge(options, { cursor }), accumulatedFollowers, cb);
  });
}

export default function getTwitterFollowers(tokens, username, cb) {
  const client = new Twitter(tokens);
  const get = client.get.bind(client, 'followers/ids');
  const options = { screen_name: username, stringify_ids: true, count: 5000 };
  return accumulate(get, options, [], cb);
};
