import Twitter from 'twit';
import { merge, isEmpty, concat } from 'ramda';

function accumulate(get, options, followers, cb) {
  console.log('accumulate');
  get(options, (err, { users, next_cursor_str: cursor } = res) => {
    console.log('get');
    if (err) return cb(err);
    if (cursor === '0') {
      return cb(null, followers);
    }
    return accumulate(get, merge({ cursor }, options), concat(followers, users), cb);
  });
}

export default function getTwitterFollowers(tokens, username, cb) {
  console.log('getTwitterFollowers');
  const client = new Twitter(tokens);
  const get = client.get.bind(client, 'followers/list');
  const options = { screen_name: username, count: 200 };
  return accumulate(get, options, [], cb);
};
