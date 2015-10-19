import Twitter from 'twit';
import { merge, isEmpty, concat, last } from 'ramda';

function accumulate(get, options, followers, cb) {
  get(options, (err, { users, next_cursor_str: cursor } = res) => {
    if (err) return cb(err);
    var accumulatedFollowers = concat(followers, users);
    if (cursor === '0') {
      return cb(null, accumulatedFollowers);
    }
    return accumulate(get, merge(options, { cursor }), accumulatedFollowers, cb);
  });
}

export default function getTwitterFollowers(tokens, username, cb) {
  const client = new Twitter(tokens);
  const get = client.get.bind(client, 'followers/list');
  const options = { screen_name: username, count: 200 };
  return accumulate(get, options, [], cb);
};
