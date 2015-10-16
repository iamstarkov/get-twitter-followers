import Twitter from 'twit';
import { merge, isEmpty, concat } from 'ramda';

function accumulate(get, options, followers, cb) {
  get(options, (err, res) => {
    if (err) return cb(err);
    if (isEmpty(res)) {
      return cb(null, followers);
    }
    const accumulatedFollowers = concat(followers, res.users);
    const nextOptions = merge(options, { cursor: res.next_cursor_str });
    return accumulate(get, nextOptions, accumulatedFollowers, cb);
  });
}

export default function getTwitterFollowers(tokens, username, cb) {
  const client = new Twitter(tokens);
  const get = client.get.bind(client, 'followers/list');
  const options = { screen_name: username, count: 200 };
  return accumulate(get, options, [], cb);
};
